import { Breadcrumb } from '@/components/ui/breadcrumb.tsx';
import PageTitle from '@/components/ui/page-title.tsx';
import { Button } from '@/components/ui/button.tsx';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { z } from 'zod';
import { FormEvent, useEffect, useState } from 'react';
import { IProject, IProjectUnit, Money } from '@/types';
import { ProjectsService } from '@/services/projects.service.ts';
import { Input } from '@/components/ui/input.tsx';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.tsx';
import { ZodIssueBase } from 'zod/lib/ZodError';
import { Label } from '@/components/ui/label.tsx';
import ClosableAlert from '@/components/ui/closable-alert.tsx';
import { toast } from 'sonner';

const ElementSchema = z.object({
  name: z.string().min(1, { message: 'El nombre de la unidad es requerido' }),
  value: z.object({
    currency: z.string().refine(currency => ['USD', 'DOP'].includes(currency)),
    value: z.number({ message: "Ingrese un valor numérico" }).min(1, { message: 'El valor de la unidad es requerido' })
  })
});

const FormSchema = z.array(ElementSchema);

export function AddUnits() {
  const { projectId } = useParams<{ projectId: string }>();
  const { state: { unitsToAdd } } = useLocation();
  const [loading, setLoading] = useState(false)
  const [project, setProject] = useState<IProject | undefined>(undefined);
  const projectsService = new ProjectsService(projectId);
  const [error, setError] = useState(false);
  const navigate = useNavigate();


  const [formData, setFormData] = useState([{ name: '', value: { currency: 'USD', value: '' } }]);
  const [formErrors, setFormErrors] = useState<ZodIssueBase[]>([]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const validateData = FormSchema.parse(formData);
      setFormErrors([]);
      const units = validateData.map(({ name, value }) => ({ name, value } as IProjectUnit));
      projectsService.addUnits(units)
        .then(() => {
          navigate(`/construction/projects/${projectId}/details?tab=units`)
          toast.success('Unidades agregadas correctamente');
        })
        .catch(({ response }) => {
          setError(response?.data?.message)
        });
    } catch (error: ZodIssueBase) {
      setFormErrors(error.errors);
    }
  };

  useEffect(() => {
    const formD = Array.from({ length: unitsToAdd || 1 }, (_, i) => ({
      name: `Unidad ${i + 1}`,
      value: { currency: 'USD', value: '' }
    }));
    setFormData(formD);

    projectsService.getProject()
      .then((projectData) => {
        setLoading(false);
        setProject(projectData);
      })
      .catch(({ response }) => {
        setError(response?.data?.message)
        setLoading(false);
      });
  }, [])

  const handleChange = (index: number, key: string, value: string | Money) => {
    const updatedFormData = [...formData];
    updatedFormData[index][key] = value;
    setFormData(updatedFormData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="h-full flex-1 flex-col space-y-4">
        <Breadcrumb
          items={[
            { label: "Constructora", path: "/construction" },
            { label: "Proyectos", path: "/construction/projects" },
            { label: project?.name || "", path: `/construction/projects/${projectId}/details` },
            { label: "Agregar Unidades", path: `/construction/projects/${projectId}/add-units` },
          ]}
        />

        <div className="flex items-center justify-between space-y-2">
          <PageTitle title="Agregar Unidades" subtitle={project?.name}/>
          <div className="space-x-2">
            <Button
              variant="secondary"
              asChild>
              <Link to="new">
                Cancelar
              </Link>
            </Button>
            <Button
              type="submit">
              Guardar Unidades
            </Button>
          </div>
        </div>
        <div>
          {error && <ClosableAlert closable={false} color="danger">{error}</ClosableAlert>}
          <table>
            <tbody>
            {formData.map((item, index) => {
              const nameError = formErrors.find(error => error.path.join(",") === [index, 'name'].join(","));
              const valueError = formErrors.find(error => error.path.join(",") === [index, 'value', 'value'].join(","));
              return <tr key={index} className="flex items-center space-x-2 mb-3">
                <td>
                  <Label>Nombre de la unidad</Label>
                  <Input
                    type="text"
                    value={item.name}
                    placeholder="Nombre de la unidad"
                    onChange={(e) => handleChange(index, 'name', e.target.value)}
                    className="form-input w-80"
                  />
                  <p className="text-sm font-medium text-destructive min-h-5">{nameError?.message}</p>
                </td>

                <td>
                  <Label>Valor</Label>
                  <div className="flex items-center">
                    <div>
                      <Select
                        onValueChange={(e) => handleChange(index, 'value', { ...item.value, currency: e })}
                        value={item.value.currency}>
                        <SelectTrigger>
                          <SelectValue
                            placeholder="Seleccione una moneda"/>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem
                            key="USD"
                            value="USD">
                            USD
                          </SelectItem>
                          <SelectItem
                            key="DOP"
                            value="DOP">
                            DOP
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Input
                      placeholder="Valor"
                      type="number"
                      value={item.value.value}
                      onChange={(e) => handleChange(index, 'value', {
                        ...item.value,
                        value: Number.parseInt(e.target.value)
                      })}
                      className="form-input"
                    />
                  </div>
                  <p className="text-sm font-medium text-destructive min-h-5">{valueError?.message}</p>
                </td>
              </tr>
            })}
            </tbody>
          </table>
        </div>
      </div>
    </form>
  )
}

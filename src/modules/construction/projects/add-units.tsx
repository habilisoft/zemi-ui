import { Breadcrumb } from '@/components/ui/breadcrumb.tsx';
import PageTitle from '@/components/ui/page-title.tsx';
import { Button } from '@/components/ui/button.tsx';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { z, ZodIssueBase } from 'zod';
import { FormEvent, useEffect, useState } from 'react';
import {
  IDownPaymentAmount,
  IDownPaymentInformation,
  IPercentageValue,
  IProject,
  IProjectUnitRequest,
  Money
} from '@/types';
import { ProjectsService } from '@/services/projects.service.ts';
import { Input } from '@/components/ui/input.tsx';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.tsx';
import { Label } from '@/components/ui/label.tsx';
import ClosableAlert from '@/components/ui/closable-alert.tsx';
import { toast } from 'sonner';
import { ConfirmCancelButton } from '@/components/ui/confirm-cancel-button.tsx';
import { MoneyValidationSchema } from '@/lib/validations.ts';

const ElementSchema = z.object({
  name: z.string().min(1, { message: 'El nombre de la unidad es requerido' }),
  value: MoneyValidationSchema
});

const FormSchema = z.array(ElementSchema);

export function AddUnits() {
  const { projectId } = useParams<{ projectId: string }>();
  const { state: { unitsToAdd } } = useLocation();
  const [, setLoadingProject] = useState(false);
  const [savingUnits, setSavingUnits] = useState(false);
  const [project, setProject] = useState<IProject | undefined>(undefined);
  const projectsService = new ProjectsService(projectId);
  const [error, setError] = useState(false);
  const navigate = useNavigate();


  const [formData, setFormData] = useState<IProjectUnitRequest[]>([{ name: '', value: { currency: 'USD', value: 0 } }]);
  const [formErrors, setFormErrors] = useState<ZodIssueBase[]>([]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormErrors([]);
    setSavingUnits(true);
    try {
      const validateData = FormSchema.parse(formData);
      setFormErrors([]);
      console.log(project?.pricePerUnit?.downPaymentInformation);
      const units = validateData
        .map(({ name, value }) => (
          {
            name,
            value,
            downPaymentInformation: getDownPaymentInformation(project?.pricePerUnit?.downPaymentInformation)

          } as IProjectUnitRequest));
      projectsService.addUnits(units)
        .then(() => {
          navigate(`/construction/projects/${projectId}/details?tab=units`)
          toast.success('Unidades agregadas correctamente');
        })
        .catch(({ response }) => {
          setError(response?.data?.message)
        });
    } catch (error) {
      if (error instanceof z.ZodError) {
        setFormErrors(error.errors);
      }
    } finally {
      setSavingUnits(false);
    }
  };

  const getDownPaymentInformation = (downPaymentInformation: IDownPaymentInformation | undefined) => {
    if (!downPaymentInformation) return;
    const type = downPaymentInformation.amount?.percentage ? "percentage" : "amount";
    const downPaymentAmount: IDownPaymentAmount = {
      type: type,
    }
    if (type === "percentage") {
      downPaymentAmount.percentage = (downPaymentInformation?.amount?.percentage as IPercentageValue).value as number * 100;
    } else {
      downPaymentAmount.amount = downPaymentInformation?.amount?.amount as Money;
    }
    return {
      amount: downPaymentAmount,
      paymentMethod: {
        monthsToComplete: downPaymentInformation?.paymentMethod?.monthsToComplete,
        amount: downPaymentInformation?.paymentMethod?.reservationAmount,
        type: downPaymentInformation?.paymentMethod?.reservationAmount ? "reservation" : "upfront"
      }
    }
  }

  useEffect(() => {
    projectsService.getProject()
      .then((projectData) => {
        setLoadingProject(false);
        setProject(projectData);
      })
      .catch(({ response }) => {
        setError(response?.data?.message)
        setLoadingProject(false);
      });
  }, [])

  useEffect(() => {
    if (!project) return;
    const formD = Array.from({ length: unitsToAdd || 1 }, (_, i) => ({
      name: `Unidad ${i + 1}`,
      value: project?.pricePerUnit?.value || { currency: 'USD', value: 0 }
    }));
    setFormData(formD);

  }, [project]);

  const handleChange = (index: number, key: string, value: string | Money | number) => {
    const updatedData = [...formData];
    updatedData[index] = {
      ...updatedData[index],
      [key]: value
    };
    setFormData(updatedData);
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
            <ConfirmCancelButton
              disabled={savingUnits}
              alertDialogTitle="Confirmar"
              alertDialogText="¿Estás seguro de cancelar la creación de unidades?"
              alertAcceptButtonText="Si, estoy seguro"
              onCancel={() => navigate(`/construction/projects/${projectId}/details`)}
              confirmCancel/>
            <Button
              type="submit">
              Guardar Unidades
            </Button>
          </div>
        </div>
        <div>
          <div className="space-y-4 mb-4">
            {error && <ClosableAlert closable={false} color="danger">{error}</ClosableAlert>}
            <ClosableAlert closable={false} color="info">
              Las unidades tomarán la configuracion de inicial y separación del proyecto. Si desea cambiarlo, puede
              hacerlo luego editando cada unidad.
            </ClosableAlert>
          </div>
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
                        onValueChange={(e) => handleChange(index, 'value', { value: item.value.value, currency: e })}
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

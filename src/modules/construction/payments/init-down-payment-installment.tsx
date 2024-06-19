import { Breadcrumb } from '@/components/ui/breadcrumb';
import PageTitle from '@/components/ui/page-title';
import { RemoteComboBox } from '@/components/ui/remote-combobox';
import { useState } from 'react';
import { IProjectResponse, IProjectUnitResponse } from '@/types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label.tsx';
import { Button } from '@/components/ui/button.tsx';
import { useNavigate } from 'react-router-dom';

export function InitDownPaymentInstallment() {
  const [selectedProject, setSelectedProject] = useState<IProjectResponse>();
  const [selectedUnit, setSelectedUnit] = useState<IProjectUnitResponse>();
  const navigate = useNavigate();

  const handleSelect = (data: Record<string, never>) => {
    const project = {
      id: data.id,
      name: data.name,
      units: data.units,
      value: data.value,
      downPaymentInformation: data.downPaymentInformation,
      pricePerUnit: data.pricePerUnit,
    } as IProjectResponse;

    setSelectedProject(project);
  }

  const handleSelectUnit = (data: string) => {
    const unit = selectedProject?.units?.find((unit) => unit.id.toString() === data);
    setSelectedUnit(unit);
  }

  return (
    <div className="h-full flex-1 flex-col space-y-4">
      <Breadcrumb
        items={[
          { label: "Pagos", path: "" },
          { label: "Abono a inicial", path: "" },
        ]}
      />
      <div className="flex items-center justify-between space-y-2">
        <PageTitle title="Abono a inicial" subtitle="Pagos"/>
      </div>

      <div className="flex-col">
        <div>
          <Label>Seleccione el proyecto</Label>
        </div>
        <div className="w-full">
          <RemoteComboBox
            endpoint="/api/v1/projects"
            handleSelect={(data) => handleSelect(data as Record<string, never>)}
            displayProperty="name"
            selectedValue={selectedProject ? { id: selectedProject?.id, name: selectedProject?.name } : undefined}
            valueProperty="id"
            placeholder="Seleccione un projecto"/>
        </div>
      </div>

      <div className="flex-col">
        <div>
          <Label>Seleccione la unidad</Label>
        </div>
        <div className="w-full">
          <Select onValueChange={handleSelectUnit} defaultValue={undefined}>
            <SelectTrigger>
              <SelectValue placeholder="Seleccione una unidad"/>
            </SelectTrigger>
            <SelectContent>
              {selectedProject?.units?.map((option) => (
                <SelectItem key={option.id} value={option.id.toString()}>
                  {option.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Button
        disabled={!selectedUnit}
        onClick={() => navigate(`/construction/projects/${selectedProject?.id}/units/${selectedUnit?.id}/down-payment-installment`)}
      >
       Continuar
      </Button>

    </div>
  );
}

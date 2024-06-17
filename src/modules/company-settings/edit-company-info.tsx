import { Breadcrumb } from '@/components/ui/breadcrumb.tsx';
import { useCompoundStore } from '@/stores/compound-store.ts';
import { shallow } from 'zustand/shallow';
import { CompoundForm } from '@/components/ui/compound-form.tsx';
import { z } from "zod";
import { useState } from 'react';
import { CompanyService } from '@/services/company.service.ts';
import { Messages } from '@/lib/constants.tsx';
import ClosableAlert from '@/components/ui/closable-alert.tsx';
import PageTitle from '@/components/ui/page-title.tsx';
import { useNavigate } from 'react-router-dom';
import {toast} from 'sonner';


export function EditCompanyInfo() {
  const [sendingRequest, setSendingRequest] = useState(false)
  const companyService = new CompanyService();
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const {
    companyInfo,
    setCompanyInfo
  } = useCompoundStore(
    (state) => ({
      companyInfo: state.companyInfo,
      setCompanyInfo: state.setCompanyInfo
    }),
    shallow
  );

  const saveCompanyInfo = async (data: Record<string, string | string[]>  ) => {
    setSendingRequest(true)
    companyService.saveCompanyInfo(data)
      .then(() => {
        setSendingRequest(false)
        setCompanyInfo(data);
        toast.success("Datos de la empresa actualizados exitosamente");
        navigate("/company-settings")
      })
      .catch(({ response }) => {
        setError(response?.data?.message || Messages.UNEXPECTED_ERROR)
        setSendingRequest(false)
      })
  }

  return (
    <div className="h-full flex-1 flex-col space-y-4">
      <Breadcrumb
        items={[
          { label: "Empresa", path: "/company-settings" },
          { label: "Datos Generales", path: "/company-settings" },
          { label: "Editar", path: "/company-settings" },
        ]}
      />
      <div className="flex items-center justify-between space-y-2">
        <PageTitle title="Editar Empresa" subtitle="Ajustes de Empresa"/>
      </div>

      <div className="max-w-md mx-auto mt-8 space-x-4">
        {error && <ClosableAlert closable={false} color="danger">{error}</ClosableAlert>}
        <CompoundForm
          sendingRequest={sendingRequest}
          onSubmit={saveCompanyInfo}
          submitButtonText="Guardar"
          confirmCancel={companyInfo?.name !== ""}
          onCancel={companyInfo?.name ? () => navigate(-1) : undefined}
          alertDialogText="Confirmar"
          alertDialogDesc="¿Estás seguro que deseas cancelar? Los cambios no se guardarán."
          inputs={
            [
              {
                label: "Nombre de la empresa",
                name: "name",
                type: "text",
                defaultValue: companyInfo?.name || "",
                validations: z.string()
                  .min(3, "El nombre de la empresa debe tener al menos 3 caracteres")
                  .max(100, "El nombre de la empresa no puede tener más de 100 caracteres"),
              },
              {
                label: "Teléfono",
                name: "phone",
                type: "text",
                defaultValue: companyInfo?.phone || "",
                validations: z.string()
              },
              {
                label: "RNC",
                name: "document",
                type: "text",
                defaultValue: companyInfo?.document || "",
                validations: z.string()
              },
              {
                label: "Dirección",
                name: "address",
                type: "textarea",
                defaultValue: companyInfo?.address || "",
                validations: z.string()
              },
              {
                label: "Logo",
                name: "logo",
                type: "text",
                defaultValue: companyInfo?.logo || "",
                validations: z.string()
              }
            ]
          }/>
      </div>
    </div>
  );
}

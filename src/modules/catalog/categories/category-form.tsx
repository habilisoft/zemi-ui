import { CompoundForm } from '@/components/ui/compound-form.tsx';
import { z } from 'zod';
import { ICreateCategoryRequest, ReusableFormProps } from '@/types';
import { Messages } from '@/lib/constants.tsx';
import { useState } from 'react';
import { CategoryService } from '@/services/category.service.ts';
import ClosableAlert from '@/components/ui/closable-alert.tsx';

export const CategoryForm = (
  {
    handleSuccess,
    confirmCancel,
    onCancel,
  }: ReusableFormProps
) => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const categoryService = new CategoryService();

  const handleFormSubmit = (data: Record<string, string | string []>) => {
    setLoading(true);
    const request = getRequestData(data);
    categoryService.createCategory(request)
      .then((response) => {
        handleSuccess({...data, id: response.id }  as Record<string, string>);
      })
      .catch(({ response } ) => {
        setError(response?.data?.message || Messages.UNEXPECTED_ERROR);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function getRequestData(data: Record<string, string | string []>) : ICreateCategoryRequest {
    return {
      name: data.name as string,
      description: data.description as string,
    };
  }

  return (
    <>
      {error && <ClosableAlert color="danger">{error}</ClosableAlert>}
      <CompoundForm
        inputs={
          [
            {
              label: "Nombre",
              name: "name",
              autoFocus: true,
              type: "text",
              defaultValue: "",
              validations: z.string().min(2, {
                message: "Nombre debe tener como mínimo 2 caracteres.",
              }),
            },
            {
              label: "Descripción",
              name: "description",
              defaultValue: "",
              type: "textarea",
              validations: z.string().min(2, {
                message: "Descripción debe tener como mínimo 2 caracteres.",
              }),
            }
          ]
        }
        sendingRequest={loading}
        onSubmit={handleFormSubmit}
        confirmCancel={confirmCancel}
        onCancel={onCancel}
      />
    </>
  );
}

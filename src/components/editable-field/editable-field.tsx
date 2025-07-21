import { ReactNode, useState } from 'react';
import { Button } from '@/components/ui/button.tsx';
import { Pencil } from 'lucide-react';
import cn from 'classnames';
import AsyncActionButton from '@/components/ui/async-action-button.tsx';
import { AxiosError } from 'axios';
import { Messages } from '@/lib/constants.tsx';
import { toast } from 'sonner';

type EditControlProps = {
  value: string | undefined;
  disabled: boolean;
  handleChange: (value: string) => void;
  saving?: boolean;
}

type Props<T> = {
  value: T,
  render?: (value: string | undefined) => ReactNode,
  editControl: ({ value, disabled, handleChange, saving }: EditControlProps) => ReactNode
  className?: string;
  onSuccess?: (value: T) => void;
  onSave: (value: T) => Promise<void | any>;
}

export const EditableField = ({
                                value,
                                render = (value: string | undefined) => value,
                                editControl,
                                onSave,
                                onSuccess = () => {
                                },
                                className = ''
                              }: Props<string>) => {
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editedValue, setEditedValue] = useState(value);

  const handleSave = async () => {
    try {
      setSaving(true);
      await onSave(editedValue);
      setIsEditing(false);
      if (onSuccess) {
        onSuccess(editedValue);
      }
    } catch (e: AxiosError | any) {
      toast.error(e.response?.data?.message || Messages.UNEXPECTED_ERROR);
    } finally {
      setSaving(false);
    }
  }

  const handleChange = (value: string) => {
    setEditedValue(value);
  }

  if (isEditing) {
    return (
      <div className={cn("flex gap-4 items-center group rounded", className)}>
        {editControl({ value: editedValue, saving, handleChange, disabled: saving })}
        <div className="flex space-x-2">
          <AsyncActionButton
            onClick={handleSave}
            busy={saving}
            size="xs">
            Guardar
          </AsyncActionButton>
          <Button
            size="xs"
            variant="outline"
            disabled={saving}
            onClick={() => setIsEditing(false)}>
            Cancelar
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex gap-4 items-center group">
      <div className="text-sm cursor-pointer text-gray-900">{render(value)}</div>
      <Button
        className="opacity-0 group-hover:opacity-100 transition-opacity"
        size="xs"
        variant="outline"
        onClick={() => setIsEditing(true)}>
        <Pencil className="h-4 w-4 text-gray-700 mr-1"/>
        Editar
      </Button>
    </div>
  )
}

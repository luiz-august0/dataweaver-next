import StandardForm from '@/components/FormTypes/StandardForm';
import { FormButton } from '@/components/FormTypes/types/models';
import { MonacoEditor } from '@/components/MonacoEditor/MonacoEditor';
import { Report } from '@/core/reports/types/models';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

type Props = {
  open: boolean;
  handleClose: () => void;
  index: number;
  label: string;
  language: string;
  field: keyof Report;
  formTitle: string;
};

export const EditorForm = ({ open, handleClose, index, label, language, field, formTitle }: Props) => {
  const [input, setInput] = useState<string>('');
  const form = useFormContext<Report>();

  const {
    watch,
    setValue,
    formState: { errors },
    clearErrors,
  } = form;

  const onSubmit = () => {
    setValue(field, input);
    handleClose();
  };

  const buttons: FormButton[] = [
    {
      id: 'cancel',
      title: 'Cancelar',
      color: 'primary',
      onClick: handleClose,
      variant: 'outlined',
    },
    {
      id: 'submit',
      title: 'Salvar',
      isSubmit: true,
      color: 'primary',
      onClick: onSubmit,
      variant: 'contained',
    },
  ];

  useEffect(() => {
    setInput(watch(field) as string);
  }, [index]);

  return (
    <StandardForm formButtons={buttons} formTitle={formTitle} handleClose={handleClose} maxWidth={'md'} open={open}>
      <div className="mt-4 w-full">
        <MonacoEditor
          height="350px"
          label={label}
          defaultLanguage={language}
          value={input}
          error={!!errors?.[field]}
          helperText={errors?.[field]?.message}
          onChange={(value: any) => {
            setInput(value);
            clearErrors(field);
          }}
        />
      </div>
    </StandardForm>
  );
};

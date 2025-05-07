import StandardForm from '@/components/customized/FormTypes/StandardForm';
import { FormButton } from '@/components/customized/FormTypes/types/models';
import { MonacoEditor } from '@/components/customized/MonacoEditor/MonacoEditor';
import { Report } from '@/core/reports/types/models';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

type Props = {
  open: boolean;
  handleClose: () => void;
  language: string;
  field?: keyof Report;
  formTitle: string;
};

export const EditorForm = ({ open, handleClose, language, field, formTitle }: Props) => {
  const [input, setInput] = useState<string>('');
  const form = useFormContext<Report>();

  const {
    watch,
    setValue,
    formState: { errors },
    clearErrors,
  } = form;

  const onSubmit = () => {
    if (field) setValue(field, input);

    handleClose();
  };

  const buttons: FormButton[] = [
    {
      id: 'cancel',
      title: 'Cancelar',
      color: 'primary',
      onClick: handleClose,
      variant: 'outline',
    },
    {
      id: 'submit',
      title: 'Salvar',
      isSubmit: true,
      color: 'primary',
      onClick: onSubmit,
    },
  ];

  useEffect(() => {
    if (field) setInput(watch(field) as string);
  }, [field]);

  return (
    <StandardForm formButtons={buttons} formTitle={formTitle} handleClose={handleClose} open={open}>
      <div className="mt-4 w-full">
        <MonacoEditor
          height="350px"
          defaultLanguage={language}
          value={input}
          error={field && errors?.[field]?.message}
          onChange={(value: any) => {
            setInput(value);
            clearErrors(field);
          }}
        />
      </div>
    </StandardForm>
  );
};

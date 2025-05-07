import HeaderPage from '@/components/customized/HeaderPage/HeaderPage';
import Skeleton from '@/components/customized/Skeleton/Skeleton';
import { getConnection } from '@/core/connection/services/connection';
import { Connection } from '@/core/connection/types/models';
import { CustomizedButtonProps } from '@/shared/types/general';
import { useEffect, useState } from 'react';
import ConnectionForm from './form/ConnectionForm';

type InformationProps = {
  label: string;
  value: string | JSX.Element;
};

export default function ConnectionDetails() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [connection, setConnection] = useState<Connection>();

  const RenderInformation = ({ label, value }: InformationProps) => {
    return (
      <div className="items-center justify-start">
        {loading ? (
          <Skeleton className="w-80 h-6" />
        ) : (
          <>
            <h1 className="text-sm text-muted-foreground">{label}</h1>
            {typeof value == 'string' ? <h1 className="text-lg">{value}</h1> : value}
          </>
        )}
      </div>
    );
  };

  const loadConnection = async () => {
    setConnection(await getConnection());
    setLoading(false);
  };

  useEffect(() => {
    loadConnection();
  }, []);

  const buttons: CustomizedButtonProps[] = [
    {
      label: connection ? 'Editar Conexão' : 'Nova Conexão',
      startIcon: connection ? 'Edit' : 'Plus',
      color: 'primary',
      variant: connection ? 'outline' : 'default',
      disabled: loading,
      size: 'sm',
      onClick: () => setOpen(true),
    },
  ];

  return (
    <>
      <HeaderPage titlePage="Conexão de Base de Dados" buttons={buttons} />
      <div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col w-full min-h-40 bg-muted rounded-md p-4 gap-4">
            <h1 className="text-3xl font-medium">Sobre a conexão</h1>
            <div className="flex flex-col gap-4">
              {connection || loading ? (
                <>
                  <RenderInformation label="Host" value={connection?.host ?? ''} />
                  <RenderInformation label="Porta" value={connection?.port?.toString() ?? ''} />
                  <RenderInformation label="Base" value={connection?.database ?? ''} />
                  <RenderInformation label="Usuário" value={connection?.username ?? ''} />
                </>
              ) : (
                <h1 className="text-sm">
                  {"Não há cadastro de conexão com base de dados, cadastre uma clicando em 'Nova Conexão'"}
                </h1>
              )}
            </div>
          </div>
        </div>
      </div>
      {open && <ConnectionForm open={open} setOpen={setOpen} onSubmitForm={loadConnection} connection={connection} />}
    </>
  );
}

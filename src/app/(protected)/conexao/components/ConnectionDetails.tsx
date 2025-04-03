import HeaderPage from '@/components/HeaderPage/HeaderPage';
import { getConnection } from '@/core/connection/services/connection';
import { Connection } from '@/core/connection/types/models';
import { CustomizedButtonProps } from '@/shared/types/general';
import * as Icon from '@mui/icons-material';
import { Skeleton, Typography, useMediaQuery, useTheme } from '@mui/material';
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
    const { palette } = useTheme();

    return (
      <div className="items-center justify-start">
        {loading ? (
          <Skeleton variant="rounded" animation="wave" sx={{ width: 100, height: 30 }} />
        ) : (
          <>
            <Typography fontSize={14} color={palette.grey[600]}>
              {label}
            </Typography>
            {typeof value == 'string' ? <Typography fontSize={18}>{value}</Typography> : value}
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
      startIcon: connection ? <Icon.Edit /> : <Icon.Add />,
      color: 'primary',
      variant: connection ? 'outlined' : 'contained',
      disabled: loading,
      size: 'small',
      onClick: () => setOpen(true),
    },
  ];

  return (
    <>
      <HeaderPage titlePage="Conexão de Base de Dados" buttons={buttons} />
      <div className="mt-10 px-3">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col w-full min-h-40 bg-gray-100 rounded-md p-4 gap-4">
            <Typography fontSize={20}>Sobre a conexão</Typography>
            <div className="flex flex-col gap-4">
              {connection || loading ? (
                <>
                  <RenderInformation label="Host" value={connection?.host ?? ''} />
                  <RenderInformation label="Porta" value={connection?.port?.toString() ?? ''} />
                  <RenderInformation label="Base" value={connection?.database ?? ''} />
                  <RenderInformation label="Usuário" value={connection?.username ?? ''} />
                </>
              ) : (
                <Typography fontSize={14}>
                  {"Não há cadastro de conexão com base de dados, cadastre uma clicando em 'Nova Conexão'"}
                </Typography>
              )}
            </div>
          </div>
        </div>
      </div>
      {open && <ConnectionForm open={open} setOpen={setOpen} onSubmitForm={loadConnection} connection={connection} />}
    </>
  );
}

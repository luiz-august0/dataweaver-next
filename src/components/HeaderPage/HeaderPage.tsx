import { CustomizedButtonProps } from '@/shared/types/general';
import * as Icon from '@mui/icons-material';
import { Button, IconButton, InputAdornment, TextField, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { Dispatch, SetStateAction } from 'react';

type Props = {
  titlePage: string;
  search?: Dispatch<SetStateAction<string | undefined>>;
  setOpenFilter?: Dispatch<SetStateAction<boolean>>;
  setOpenForm?: () => void;
  back?: boolean;
  buttons?: CustomizedButtonProps[];
};

export default function HeaderPage({ titlePage, search, setOpenFilter, setOpenForm, back, buttons }: Props) {
  const router = useRouter();

  return (
    <div className="flex max-md:flex-col justify-between max-md:items-center items-end sticky z-40 min-h-24 bg-white rounded-es-lg rounded-ee-lg top-0 p-2">
      <div className="flex flex-row gap-4 justify-center items-center max-md:mt-10">
        {back && (
          <IconButton onClick={() => router.back()}>
            <Icon.KeyboardBackspace color="primary" />
          </IconButton>
        )}
        <Typography fontSize={32}>{titlePage}</Typography>
      </div>
      <div className="flex gap-4 max-md:mt-5">
        {search && (
          <TextField
            placeholder="Pesquisar"
            variant="outlined"
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Icon.Search />
                </InputAdornment>
              ),
            }}
            onChange={(e) => search(e.target.value)}
          />
        )}
        {setOpenFilter && (
          <Button
            color="primary"
            variant="outlined"
            size="small"
            onClick={() => setOpenFilter(true)}
            sx={{ height: '40px' }}
          >
            <Icon.FilterList color="primary" />
          </Button>
        )}
        {setOpenForm && (
          <Button
            startIcon={<Icon.Add />}
            color="primary"
            variant="contained"
            size="small"
            sx={{ height: '40px' }}
            onClick={() => setOpenForm()}
          >
            Novo
          </Button>
        )}
        {buttons?.map((button, index) => (
          <Button key={index} {...button} sx={{ height: '40px', ...button.sx }}>
            {button.label}
          </Button>
        ))}
      </div>
    </div>
  );
}

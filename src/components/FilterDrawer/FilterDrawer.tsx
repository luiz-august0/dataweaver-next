import * as Icon from '@mui/icons-material';
import { Button, Drawer, IconButton, Typography } from '@mui/material';
import { Dispatch, ReactNode } from 'react';

type Props = {
  openFilter: boolean;
  setOpenFilter: Dispatch<React.SetStateAction<boolean>>;
  disableButtons?: boolean;
  onCleanFilters?: () => void;
  onFilter?: () => void;
  children: ReactNode;
};

export default function FilterDrawer({
  openFilter,
  setOpenFilter,
  disableButtons,
  onCleanFilters,
  onFilter,
  children,
}: Props) {
  return (
    <Drawer open={openFilter} anchor="right" onClose={() => setOpenFilter(false)}>
      <div className="flex flex-col p-10 h-full justify-between min-w-80">
        <div>
          <div className="flex justify-between">
            <Typography fontSize={32}>Filtros</Typography>
            <IconButton onClick={() => setOpenFilter(false)}>
              <Icon.Close />
            </IconButton>
          </div>
          <div className="flex flex-col mt-10 gap-4">{children}</div>
        </div>
        <div className="flex justify-end gap-2">
          {!disableButtons && (
            <>
              <Button variant="outlined" color="inherit" onClick={onCleanFilters}>
                Limpar
              </Button>
              <Button variant="contained" color="primary" onClick={onFilter}>
                Filtrar
              </Button>
            </>
          )}
        </div>
      </div>
    </Drawer>
  );
}

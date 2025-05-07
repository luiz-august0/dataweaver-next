import FilterDrawer from '@/components/customized/FilterDrawer/FilterDrawer';
import { EnumDefaultStatus } from '@/shared/types/enums';
import { Label } from '@/components/ui/label';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Dispatch } from 'react';

type Props = {
  openFilter: boolean;
  setOpenFilter: Dispatch<React.SetStateAction<boolean>>;
  status: keyof typeof EnumDefaultStatus;
  setStatus: Dispatch<React.SetStateAction<keyof typeof EnumDefaultStatus>>;
};

export default function Filters({ openFilter, setOpenFilter, status, setStatus }: Props) {
  const handleStatus = (statusValue: keyof typeof EnumDefaultStatus) => {
    setStatus(statusValue);
    setOpenFilter(false);
  };

  return (
    <FilterDrawer openFilter={openFilter} setOpenFilter={setOpenFilter} disableButtons>
      <div className="space-y-2">
        <Label htmlFor="status-toggle">Situação</Label>
        <ToggleGroup
          type="single"
          id="status-toggle"
          value={status as string}
          onValueChange={(value) => handleStatus(value || status)}
          className="w-full"
        >
          <ToggleGroupItem value="true" className="w-full">
            Ativo
          </ToggleGroupItem>
          <ToggleGroupItem value="false" className="w-full">
            Inativo
          </ToggleGroupItem>
          <ToggleGroupItem value="all" className="w-full">
            Todos
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
    </FilterDrawer>
  );
}

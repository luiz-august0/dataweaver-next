import {
  AutocompleteProps,
  CircularProgress,
  Autocomplete as MUIAutocomplete,
  TextField,
} from "@mui/material";
import { Fragment, SetStateAction } from "react";

type Props = {
  getMore?: () => void;
  loading?: boolean;
  label: string;
  search: (value: SetStateAction<string | undefined>) => void;
  required?: boolean;
  error?: boolean;
  helperText?: string;
} & Omit<AutocompleteProps<any, any, any, any>, "renderInput">;

export default function Autocomplete({
  getMore,
  loading,
  label,
  search,
  required,
  error,
  helperText,
  ...rest
}: Props) {
  return (
    <MUIAutocomplete
      {...rest}
      ListboxProps={{
        style: { maxHeight: 300, overflow: "auto" },
        onScroll: (event: React.SyntheticEvent) => {
          const listboxNode = event.currentTarget;
          if (
            listboxNode.scrollTop + listboxNode.clientHeight ===
            listboxNode.scrollHeight
          ) {
            getMore?.();
          }
        },
      }}
      loading={loading}
      loadingText={"Carregando..."}
      noOptionsText="Nenhum resultado encontrado"
      renderInput={(params) => (
        <TextField
          {...params}
          error={error}
          onChange={(e) => search(e.target.value)}
          label={label}
          required={required}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <Fragment>
                {loading && <CircularProgress color="primary" size={20} />}
                {params.InputProps.endAdornment}
              </Fragment>
            ),
          }}
          helperText={helperText}
        />
      )}
    />
  );
}

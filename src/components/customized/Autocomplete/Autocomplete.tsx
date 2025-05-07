import type * as React from 'react';
import { type SetStateAction, useEffect, useRef, useState } from 'react';
import { Check, ChevronsUpDown, Loader2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { FormControl, FormDescription, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { cn } from '@/helpers/cn';

type AutocompleteOption = {
  label: string;
  value: string;
};

type AutocompleteProps = {
  options: AutocompleteOption[];
  value?: string;
  onChange: (value: string | undefined) => void;
  getMore?: () => void;
  loading?: boolean;
  label: string;
  search: (value: SetStateAction<string | undefined>) => void;
  required?: boolean;
  error?: boolean;
  errorMessage?: string;
  placeholder?: string;
  disabled?: boolean;
  multiple?: boolean;
  freeSolo?: boolean;
};

export default function Autocomplete({
  options,
  value,
  onChange,
  getMore,
  loading = false,
  label,
  search,
  required = false,
  error = false,
  errorMessage,
  placeholder = 'Selecione uma opção...',
  disabled = false,
  multiple = false,
  freeSolo = false,
}: AutocompleteProps) {
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState<string>('');
  const listRef = useRef<HTMLDivElement>(null);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    if (target.scrollHeight - target.scrollTop === target.clientHeight && getMore) {
      getMore();
    }
  };

  useEffect(() => {
    search(searchValue);
  }, [searchValue, search]);

  const selectedOption = options.find((option) => option.value === value);

  return (
    <div className="w-full">
      <FormItem className={cn(error && 'text-destructive')}>
        {label && (
          <FormLabel className={cn(required && "after:content-['*'] after:ml-0.5 after:text-destructive")}>
            {label}
          </FormLabel>
        )}
        <FormControl>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className={cn(
                  'w-full justify-between',
                  error && 'border-destructive',
                  !value && 'text-muted-foreground',
                )}
                disabled={disabled}
              >
                {value && selectedOption ? selectedOption.label : placeholder}
                {loading ? (
                  <Loader2 className="ml-2 h-4 w-4 shrink-0 animate-spin" />
                ) : (
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
              <Command>
                <CommandInput
                  placeholder="Pesquisar..."
                  value={searchValue}
                  onValueChange={(value) => {
                    setSearchValue(value);
                  }}
                />
                <CommandList ref={listRef} onScroll={handleScroll} className="max-h-[300px] overflow-auto">
                  {loading && options.length === 0 ? (
                    <div className="flex items-center justify-center py-6">
                      <Loader2 className="h-6 w-6 animate-spin text-primary" />
                    </div>
                  ) : (
                    <>
                      <CommandEmpty>Nenhum resultado encontrado</CommandEmpty>
                      <CommandGroup>
                        {options.map((option) => (
                          <CommandItem
                            key={option.value}
                            value={option.value}
                            onSelect={() => {
                              onChange(option.value === value && !multiple ? undefined : option.value);
                              if (!multiple) {
                                setOpen(false);
                              }
                            }}
                          >
                            <Check
                              className={cn('mr-2 h-4 w-4', value === option.value ? 'opacity-100' : 'opacity-0')}
                            />
                            {option.label}
                          </CommandItem>
                        ))}
                        {loading && options.length > 0 && (
                          <div className="flex items-center justify-center py-2">
                            <Loader2 className="h-4 w-4 animate-spin text-primary" />
                          </div>
                        )}
                      </CommandGroup>
                    </>
                  )}
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </FormControl>
        {errorMessage && <FormDescription className={cn(error && 'text-destructive')}>{errorMessage}</FormDescription>}
        {errorMessage && <FormMessage>{errorMessage}</FormMessage>}
      </FormItem>
    </div>
  );
}

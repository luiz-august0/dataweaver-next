
import { Eye, EyeOff } from 'lucide-react';
import { forwardRef, useState } from 'react';

import { Button } from '@/components/ui/button';
import Input, { InputProps } from '../Input/Input';

const PasswordInput = forwardRef<HTMLInputElement, Omit<InputProps, 'right'>>(({ ...props }, ref) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <Input
      type={showPassword ? 'text' : 'password'}
      ref={ref}
      right={
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
          onClick={() => setShowPassword((show) => !show)}
          onMouseDown={(e) => e.preventDefault()}
        >
          {showPassword ? (
            <EyeOff className="h-4 w-4 text-muted-foreground" />
          ) : (
            <Eye className="h-4 w-4 text-muted-foreground" />
          )}
        </Button>
      }
      {...props}
    />
  );
});

export default PasswordInput;

import type React from 'react';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import Editor, { type EditorProps, type OnMount } from '@monaco-editor/react';
import { HelpCircle } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useRef, useState } from 'react';

type MonacoEditorProps = EditorProps &
  Pick<EditorProps, 'options'> & {
    label?: string;
    error?: boolean;
    errorMessage?: string;
    required?: boolean;
    tip?: string | React.ReactNode;
  };

export function MonacoEditor({ options, error, errorMessage, label, tip, required, ...props }: MonacoEditorProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const editorRef = useRef<any>(null);
  const { resolvedTheme } = useTheme();

  const handleEditorDidMount: OnMount = (editor, monaco) => {
    editorRef.current = editor;

    editor.onDidFocusEditorText(() => {
      setIsFocused(true);
    });

    editor.onDidBlurEditorText(() => {
      setIsFocused(false);
    });

    editor.onMouseMove(() => {
      setIsHovered(true);
    });

    editor.onMouseLeave(() => {
      setIsHovered(false);
    });
  };

  const getBorderColor = () => {
    if (error || errorMessage) return 'border-destructive';
    if (isFocused || isHovered) return 'border-primary';
    return 'border-input';
  };

  return (
    <div className="flex flex-col space-y-2 w-full">
      {label && (
        <div className="flex flex-row items-center gap-4 w-full">
          <Label className="text-sm font-medium text-foreground mb-2 ml-1">
            {`${label}${required ? ' *' : ''}`}
            {tip && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-5 w-5 p-0 ml-1 inline-flex items-center justify-center"
                    >
                      <HelpCircle className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>{tip}</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </Label>
        </div>
      )}
      <div className="border border-transparent">
        <div className={`rounded-lg ${getBorderColor()} border overflow-hidden`}>
          <Editor
            {...props}
            theme={resolvedTheme == 'dark' ? 'vs-dark' : 'light'}
            loading="Carregando..."
            options={{
              guides: { indentation: false },
              ...options,
            }}
            onMount={handleEditorDidMount}
            className="[&_.monaco-editor_.view-lines_*]:font-mono [&_.monaco-editor,_.overflow-guard]:rounded-lg absolute h-full"
          />
        </div>
      </div>
      {errorMessage && <span className="text-destructive text-sm">{errorMessage}</span>}
    </div>
  );
}

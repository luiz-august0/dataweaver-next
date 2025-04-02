import Editor, { EditorProps, OnMount } from '@monaco-editor/react';
import * as Icon from '@mui/icons-material';
import { Button, FormHelperText, InputLabel, Stack, Tooltip, Typography } from '@mui/material';
import React, { useRef, useState } from 'react';

const borderColor: { [key in any]: any } = {
  error: 'rgb(180, 35, 24)',
  primary: '#202020',
  success: 'rgb(2, 122, 72)',
};

type Props = EditorProps &
  Pick<EditorProps, 'options'> & {
    label?: string;
    error?: boolean;
    helperText?: string;
    required?: boolean;
    tip?: string | React.ReactNode;
  };

export const MonacoEditor = ({ options, error, helperText, label, tip, required, ...rest }: Props) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const editorRef = useRef<any>(null);
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

  return (
    <Stack>
      <Stack
        sx={{
          flexDirection: 'row',
          gap: 4,
          width: '100%',
        }}
      >
        <InputLabel>
          <Typography
            sx={{
              fontWeight: 400,
              fontSize: '1rem',
              marginBottom: "0.7rem",
              marginLeft: "0.3rem"
            }}
          >
            {label ? label : ''}
            {required ? ' *' : ''}
            {typeof tip !== 'undefined' && tip !== '' && (
              <Tooltip title={tip} arrow>
                <Button
                  variant="text"
                  style={{
                    width: '0px',
                    minWidth: '0px',
                    height: '0px',
                    padding: '10px',
                  }}
                >
                  <Icon.Help />
                </Button>
              </Tooltip>
            )}
          </Typography>
        </InputLabel>
      </Stack>
      <Stack
        sx={{
          borderWidth: '1px',
          borderColor: 'transparent',
          borderStyle: isFocused ? 'none' : 'solid',
        }}
      >
        <Stack
          sx={{
            '& .monaco-editor .view-lines *': {
              fontFamily: 'Droid Sans Mono, monospace',
            },
            '& .monaco-editor, .overflow-guard': {
              borderRadius: '8px',
            },
            borderRadius: '8px',
            borderColor: isFocused || isHovered ? borderColor['primary'] : error ? borderColor['error'] : '#ccc',
            borderStyle: 'solid',
            borderWidth: isFocused ? '2px' : '1px',
          }}
        >
          <Editor
            {...rest}
            theme="light"
            loading="Carregando..."
            options={{
              guides: { indentation: false },
              ...options,
            }}
            onMount={handleEditorDidMount}
          />
        </Stack>
      </Stack>

      {helperText !== undefined && helperText !== '' && <FormHelperText error={error}>{helperText}</FormHelperText>}
    </Stack>
  );
};

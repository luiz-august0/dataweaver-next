import { setMultipartStateFromFile } from '@/helpers/general';
import { MultipartBean } from '@/shared/types/models';
import { Edit } from '@mui/icons-material';
import { Avatar, Box, IconButton, Menu, MenuItem } from '@mui/material';
import { SyntheticEvent, useRef, useState } from 'react';

type Props = {
  imageUrl?: string;
  onChange: (multipart: MultipartBean) => void;
  onRemove: () => void;
  width?: number;
  height?: number;
};

export default function AvatarEditor({ imageUrl, onChange, onRemove, width, height }: Props) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChange = (event: SyntheticEvent) => {
    const input = event.target as HTMLInputElement;

    const file = input.files?.[0];

    if (file) {
      setMultipartStateFromFile(file, (multipart: MultipartBean) => {
        onChange(multipart);
      });
    }
  };

  return (
    <>
      <input
        id="avatar-input-file"
        type="file"
        accept="image/*"
        hidden
        ref={fileInputRef}
        onChange={(e) => {
          handleChange(e);
          handleClose();
        }}
      />
      <Box
        sx={{
          position: 'relative',
          display: 'inline-block',
          '&:hover .edit-overlay': {
            opacity: 1,
          },
          '&:hover .MuiAvatar-root': {
            opacity: 0.5,
          },
        }}
      >
        <IconButton
          color="primary"
          sx={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onClick={(e) => {
            imageUrl ? handleClick(e) : fileInputRef?.current?.click?.();
          }}
        >
          <Avatar
            sx={{
              height: height ?? 150,
              width: width ?? 150,
              transition: 'opacity 0.3s',
            }}
            src={imageUrl}
          />
          <Box
            className="edit-overlay"
            sx={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              opacity: 0,
              transition: 'opacity 0.3s',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '100%',
            }}
          >
            <Edit
              sx={{
                color: '#fff',
                fontSize: 25,
              }}
            />
          </Box>
        </IconButton>
      </Box>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <label htmlFor="avatar-input-file">
          <MenuItem>Alterar</MenuItem>
        </label>
        <MenuItem
          onClick={() => {
            onRemove();
            handleClose();
          }}
        >
          Remover
        </MenuItem>
      </Menu>
    </>
  );
}

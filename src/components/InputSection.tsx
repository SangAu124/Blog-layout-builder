import { useState } from 'react';
import { Box, TextField, Button, Paper, useTheme } from '@mui/material';

interface InputSectionProps {
  onSubmit: (text: string) => void;
}

const InputSection = ({ onSubmit }: InputSectionProps) => {
  const [text, setText] = useState('');
  const theme = useTheme();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onSubmit(text);
    }
  };

  return (
    <Paper 
      elevation={2}
      sx={{
        p: 4,
        mt: 4,
        borderRadius: 2,
        backgroundColor: theme.palette.mode === 'dark' ? 'background.paper' : 'white',
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          width: '100%',
          maxWidth: 800,
          mx: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
        }}
      >
        <TextField
          multiline
          rows={10}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="여기에 텍스트를 붙여넣으세요..."
          variant="outlined"
          fullWidth
          sx={{
            '& .MuiOutlinedInput-root': {
              backgroundColor: theme.palette.mode === 'dark' ? 'background.default' : 'white',
              color: theme.palette.mode === 'dark' ? 'text.primary' : 'inherit',
              '& fieldset': {
                borderColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.23)' : 'rgba(0, 0, 0, 0.23)',
              },
              '&:hover fieldset': {
                borderColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.4)',
              },
              '&.Mui-focused fieldset': {
                borderColor: theme.palette.primary.main,
              },
            },
            '& .MuiInputBase-input': {
              color: theme.palette.mode === 'dark' ? 'text.primary' : 'inherit',
              '&::placeholder': {
                color: theme.palette.mode === 'dark' ? 'text.secondary' : 'rgba(0, 0, 0, 0.6)',
                opacity: 1,
              },
            },
          }}
        />
        <Button
          type="submit"
          variant="contained"
          size="large"
          disabled={!text.trim()}
          sx={{ 
            alignSelf: 'flex-start',
            backgroundColor: theme.palette.mode === 'dark' ? 'primary.main' : undefined,
            color: theme.palette.mode === 'dark' ? 'common.white' : undefined,
            '&:hover': {
              backgroundColor: theme.palette.mode === 'dark' ? 'primary.dark' : undefined,
            },
          }}
        >
          글 읽기 시작하기
        </Button>
      </Box>
    </Paper>
  );
};

export default InputSection;

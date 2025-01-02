import { useState } from 'react';
import { Box, TextField, Button, Paper } from '@mui/material';

interface InputSectionProps {
  onSubmit: (text: string) => void;
}

const InputSection = ({ onSubmit }: InputSectionProps) => {
  const [text, setText] = useState('');

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
        backgroundColor: 'white',
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
              backgroundColor: 'white',
            },
          }}
        />
        <Button
          type="submit"
          variant="contained"
          size="large"
          disabled={!text.trim()}
          sx={{ alignSelf: 'flex-start' }}
        >
          글 읽기 시작하기
        </Button>
      </Box>
    </Paper>
  );
};

export default InputSection;

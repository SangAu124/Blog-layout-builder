import { AppBar, Toolbar, Typography, Box, Button, useTheme } from '@mui/material';
import CodeIcon from '@mui/icons-material/Code';

const Navbar = () => {
  const theme = useTheme();
  const textColor = theme.palette.mode === 'light' ? 'text.primary' : '#fff';

  return (
    <AppBar 
      position="sticky" 
      elevation={0}
      sx={{
        backgroundColor: theme.palette.mode === 'light' ? '#fff' : '#1e1e1e',
        borderBottom: 1,
        borderColor: theme.palette.mode === 'light' ? 'grey.200' : 'grey.800',
      }}
    >
      <Toolbar>
        <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
          <CodeIcon sx={{ mr: 1, color: 'primary.main' }} />
          <Typography variant="h6" component="div" color="text.primary">
            Tech Blog
          </Typography>
          <Box sx={{ ml: 4, display: { xs: 'none', md: 'flex' }, gap: 2 }}>
            <Button sx={{ color: textColor }}>최신글</Button>
            <Button sx={{ color: textColor }}>트렌딩</Button>
            <Button sx={{ color: textColor }}>태그</Button>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button 
            variant="outlined" 
            size="small" 
            sx={{ 
              color: textColor,
              borderColor: theme.palette.mode === 'light' ? 'text.primary' : '#fff'
            }}
          >
            로그인
          </Button>
          <Button 
            variant="contained" 
            size="small"
            sx={{
              bgcolor: theme.palette.mode === 'light' ? 'text.primary' : 'primary.main',
              color: theme.palette.mode === 'light' ? '#fff' : '#fff',
              '&:hover': {
                bgcolor: theme.palette.mode === 'light' ? 'text.secondary' : 'primary.dark',
              }
            }}
          >
            시작하기
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

import { AppBar, Toolbar, Typography, Box, Button, useTheme } from '@mui/material';
import CodeIcon from '@mui/icons-material/Code';

const Navbar = () => {
  const theme = useTheme();

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
            <Button color="inherit">최신글</Button>
            <Button color="inherit">트렌딩</Button>
            <Button color="inherit">태그</Button>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button variant="outlined" size="small">로그인</Button>
          <Button variant="contained" size="small">시작하기</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

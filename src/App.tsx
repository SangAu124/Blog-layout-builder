import { useState, useMemo } from 'react'
import { Box, Container, CssBaseline, ThemeProvider, createTheme, Fab } from '@mui/material'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import InputSection from './components/InputSection'
import BlogPost from './components/BlogPost'
import Navbar from './components/Navbar'

function App() {
  const [content, setContent] = useState<string>('')
  const [mode, setMode] = useState<'light' | 'dark'>('light')

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          background: {
            default: mode === 'light' ? '#f5f5f5' : '#121212',
            paper: mode === 'light' ? '#ffffff' : '#1e1e1e',
          },
          text: {
            primary: mode === 'light' ? '#000000' : '#ffffff',
          },
        },
        typography: {
          fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        },
      }),
    [mode]
  )

  const handleContentSubmit = (text: string) => {
    setContent(text)
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ minHeight: '100vh', width: '100%' }}>
        <Navbar />
        <Container maxWidth="xl" sx={{ py: 4, px: { xs: 2, sm: 3, md: 4 } }}>
          {!content ? (
            <InputSection onSubmit={handleContentSubmit} />
          ) : (
            <BlogPost content={content} />
          )}
        </Container>
        <Fab
          color="primary"
          sx={{
            position: 'fixed',
            bottom: 20,
            right: 20,
          }}
          onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}
        >
          {mode === 'light' ? <Brightness4Icon /> : <Brightness7Icon />}
        </Fab>
      </Box>
    </ThemeProvider>
  )
}

export default App

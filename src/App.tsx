import { useState } from 'react'
import { Box, Container, CssBaseline, ThemeProvider, createTheme } from '@mui/material'
import InputSection from './components/InputSection'
import BlogPost from './components/BlogPost'

function App() {
  const [content, setContent] = useState<string>('')
  const theme = createTheme({
    typography: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            margin: 0,
            padding: 0,
            backgroundColor: '#f5f5f5',
            minHeight: '100vh',
          },
        },
      },
    },
  })

  const handleContentSubmit = (text: string) => {
    setContent(text)
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box 
        sx={{ 
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          width: '100%',
          backgroundColor: '#f5f5f5',
        }}
      >
        <Container 
          maxWidth="lg"
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            py: 4,
          }}
        >
          {!content ? (
            <InputSection onSubmit={handleContentSubmit} />
          ) : (
            <BlogPost content={content} />
          )}
        </Container>
      </Box>
    </ThemeProvider>
  )
}

export default App

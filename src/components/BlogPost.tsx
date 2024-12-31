import { useEffect, useState } from 'react';
import { Box, Typography, Paper, Avatar, Chip, IconButton, Divider } from '@mui/material';
import ReactMarkdown from 'react-markdown';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';

interface BlogPostProps {
  content: string;
}

const calculateReadingTime = (text: string): number => {
  const wordsPerMinute = 200;
  const words = text.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
};

const generateRandomStats = () => ({
  views: Math.floor(Math.random() * 1000) + 100,
  likes: Math.floor(Math.random() * 100) + 10,
});

const BlogPost = ({ content }: BlogPostProps) => {
  const [toc, setToc] = useState<string[]>([]);
  const readingTime = calculateReadingTime(content);
  const stats = generateRandomStats();

  useEffect(() => {
    const lines = content.split('\n');
    const headers = lines.filter(line => line.startsWith('#') || /^[^\s].+\n[=\-]{2,}/.test(line));
    setToc(headers);
  }, [content]);

  return (
    <Box sx={{ display: 'flex', gap: 4, width: '100%' }}>
      {/* Left sidebar with TOC */}
      <Paper
        elevation={0}
        sx={{
          width: 250,
          p: 2,
          position: 'sticky',
          top: 20,
          maxHeight: 'calc(100vh - 40px)',
          overflowY: 'auto',
          display: { xs: 'none', md: 'block' },
          backgroundColor: 'white',
        }}
      >
        <Typography variant="h6" gutterBottom>
          목차
        </Typography>
        {toc.map((header, index) => (
          <Typography
            key={index}
            variant="body2"
            sx={{
              mb: 1,
              cursor: 'pointer',
              '&:hover': { color: 'primary.main' },
            }}
          >
            {header.replace(/^#+\s/, '')}
          </Typography>
        ))}
      </Paper>

      {/* Main content */}
      <Paper
        elevation={1}
        sx={{
          flex: 1,
          maxWidth: 800,
          p: 4,
          backgroundColor: 'white',
        }}
      >
        {/* Article metadata */}
        <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar src="https://api.dicebear.com/7.x/bottts/svg?seed=tech" />
          <Box>
            <Typography variant="subtitle1" fontWeight="bold">
              Tech Writer
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Software Engineer @ Tech Company
            </Typography>
          </Box>
        </Box>

        <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
          <Chip
            icon={<VisibilityOutlinedIcon sx={{ fontSize: 16 }} />}
            label={`${stats.views} views`}
            size="small"
            variant="outlined"
          />
          <Chip
            icon={<ThumbUpOutlinedIcon sx={{ fontSize: 16 }} />}
            label={`${stats.likes} likes`}
            size="small"
            variant="outlined"
          />
          <Typography variant="body2" color="text.secondary">
            · {readingTime}분 읽기
          </Typography>
        </Box>

        <Divider sx={{ my: 3 }} />
        
        <Box sx={{
          '& h1': { mb: 4, mt: 6 },
          '& h2': { mb: 3, mt: 4 },
          '& p': { mb: 2, lineHeight: 1.8 },
          '& code': {
            backgroundColor: 'grey.100',
            p: 0.5,
            borderRadius: 1,
            fontFamily: 'monospace',
          },
          '& pre': {
            backgroundColor: 'grey.100',
            p: 2,
            borderRadius: 1,
            overflowX: 'auto',
          },
          '& blockquote': {
            borderLeft: '4px solid',
            borderColor: 'primary.main',
            pl: 2,
            py: 1,
            my: 2,
            backgroundColor: 'grey.50',
          },
        }}>
          <ReactMarkdown>{content}</ReactMarkdown>
        </Box>

        {/* Article actions */}
        <Divider sx={{ my: 4 }} />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <IconButton>
              <ThumbUpOutlinedIcon />
            </IconButton>
            <IconButton>
              <BookmarkBorderOutlinedIcon />
            </IconButton>
          </Box>
          <Typography variant="body2" color="text.secondary">
            마지막 수정: {new Date().toLocaleDateString()}
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default BlogPost;

import { useEffect, useState, useRef } from 'react';
import { Box, Typography, Paper, Avatar, Chip, IconButton, Divider, useTheme } from '@mui/material';
import ReactMarkdown from 'react-markdown';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import { generateTechHeaders } from '../utils/contentTransformer';
import AdBanner from './AdBanner';
import SideAd from './SideAd';

interface BlogPostProps {
  content: string;
}

interface TocItem {
  text: string;
  level: number;
  id: string;
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

const BlogPost = ({ content: initialContent }: BlogPostProps) => {
  const theme = useTheme();
  const [toc, setToc] = useState<TocItem[]>([]);
  const [content, setContent] = useState('');
  const [activeSection, setActiveSection] = useState<string>('');
  const readingTime = calculateReadingTime(content);
  const stats = generateRandomStats();
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const transformedContent = generateTechHeaders(initialContent);
    setContent(transformedContent);

    // Generate TOC with IDs
    const lines = transformedContent.split('\n');
    const headers = lines
      .filter(line => line.startsWith('#'))
      .map(header => {
        const level = header.match(/^#+/)?.[0].length || 1;
        const text = header.replace(/^#+\s/, '');
        const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        return { text, level, id };
      });
    setToc(headers);
  }, [initialContent]);

  useEffect(() => {
    const handleScroll = () => {
      if (contentRef.current) {
        const headings = contentRef.current.querySelectorAll('h1, h2, h3, h4, h5, h6');
        let currentSection = '';
        
        for (const heading of headings) {
          const rect = heading.getBoundingClientRect();
          if (rect.top <= 100) {
            currentSection = heading.id;
          } else {
            break;
          }
        }
        
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const contentParts = content.split('\n\n');
  const contentWithAds = contentParts.reduce((acc: JSX.Element[], part, index) => {
    // Add header IDs for scrolling
    const partWithIds = part.replace(/^(#{1,6})\s(.+)$/gm, (match, hashes, title) => {
      const id = title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      return `${hashes} ${title} {#${id}}`;
    });

    acc.push(
      <ReactMarkdown key={index}>
        {partWithIds}
      </ReactMarkdown>
    );
    
    // Randomly insert ads (approximately every 4-7 paragraphs)
    if (index > 0 && index % Math.floor(Math.random() * 4 + 4) === 0) {
      acc.push(<AdBanner key={`ad-${index}`} />);
    }
    
    return acc;
  }, []);

  return (
    <Box sx={{ display: 'flex', gap: 4, width: '100%' }}>
      {/* Left sidebar with TOC */}
      <Paper
        elevation={0}
        sx={{
          width: { md: 200, lg: 250 },
          p: 2,
          position: 'sticky',
          top: 80,
          maxHeight: 'calc(100vh - 100px)',
          overflowY: 'auto',
          display: { xs: 'none', md: 'block' },
          flexShrink: 0,
        }}
      >
        <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
          목차
        </Typography>
        {toc.map((item, index) => (
          <Typography
            key={index}
            variant="body2"
            component="a"
            href={`#${item.id}`}
            sx={{
              display: 'block',
              mb: 1,
              pl: (item.level - 1) * 2,
              cursor: 'pointer',
              textDecoration: 'none',
              color: activeSection === item.id ? 'primary.main' : 'text.primary',
              fontWeight: activeSection === item.id ? 700 : 400,
              '&:hover': { color: 'primary.main' },
            }}
          >
            {item.text}
          </Typography>
        ))}
      </Paper>

      {/* Main content */}
      <Paper
        elevation={1}
        sx={{
          flex: 1,
          minWidth: 0,
          maxWidth: { md: '100%', lg: 900, xl: 1000 },
          p: { xs: 2, md: 4 },
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
        
        <Box 
          ref={contentRef}
          sx={{
            '& h1': { mb: 4, mt: 6, scrollMarginTop: '80px' },
            '& h2': { mb: 3, mt: 4, scrollMarginTop: '80px' },
            '& p': { mb: 2, lineHeight: 1.8 },
            '& code': {
              backgroundColor: theme.palette.mode === 'light' ? 'grey.100' : 'grey.900',
              p: 0.5,
              borderRadius: 1,
              fontFamily: 'monospace',
            },
            '& pre': {
              backgroundColor: theme.palette.mode === 'light' ? 'grey.100' : 'grey.900',
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
              backgroundColor: theme.palette.mode === 'light' ? 'grey.50' : 'grey.900',
            },
          }}
        >
          {contentWithAds}
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

      {/* Right sidebar with ads */}
      <Box
        sx={{
          width: { lg: 250, xl: 300 },
          display: { xs: 'none', lg: 'block' },
          flexShrink: 0,
        }}
      >
        <SideAd />
      </Box>
    </Box>
  );
};

export default BlogPost;

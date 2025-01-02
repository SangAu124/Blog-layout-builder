import { useEffect, useState, useRef } from 'react';
import { Box, Typography, Paper, Avatar, Chip, IconButton, Divider, useTheme } from '@mui/material';
import ReactMarkdown from 'react-markdown';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import { generateTechHeaders } from '../utils/contentTransformer';
import AdBanner from './AdBanner';
import SideAd from './SideAd';
import ShareButtons from './ShareButtons';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';

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
  let firstHeader = '';
  let remainingContent: JSX.Element[] = [];

  // 첫 번째 헤더 찾기
  for (let i = 0; i < contentParts.length; i++) {
    if (contentParts[i].startsWith('#')) {
      firstHeader = contentParts[i];
      contentParts.splice(i, 1);
      break;
    }
  }

  // 첫 번째 헤더의 ID 생성
  const firstHeaderWithId = firstHeader.replace(/^(#{1,6})\s(.+)$/gm, (_, hashes, title) => {
    const id = title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    return `${hashes} ${title} {#${id}}`;
  });

  // 나머지 컨텐츠 처리
  const codeBlockStyle = {
    backgroundColor: theme.palette.mode === 'dark' ? '#1a1a1a' : '#f6f8fa',
    color: theme.palette.mode === 'dark' ? '#e6edf3' : '#24292e',
  };

  remainingContent = contentParts.reduce((acc: JSX.Element[], part, index) => {
    // Add header IDs for scrolling
    const partWithIds = part.replace(/^(#{1,6})\s(.+)$/gm, (_, hashes, title) => {
      const id = title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      return `${hashes} ${title} {#${id}}`;
    });

    acc.push(
      <ReactMarkdown
        key={`content-${index}`}
        components={{
          code({ node, inline, className, children, ...props }: any) {
            const match = /language-(\w+)/.exec(className || '');
            return !inline && match ? (
              <SyntaxHighlighter
                language={match[1]}
                PreTag="div"
                style={theme.palette.mode === 'dark' ? atomOneDark : undefined}
                customStyle={{
                  ...codeBlockStyle,
                  padding: '1rem',
                  borderRadius: '4px',
                  margin: '1rem 0',
                }}
                {...props}
              >
                {String(children).replace(/\n$/, '')}
              </SyntaxHighlighter>
            ) : (
              <code
                className={className}
                style={{
                  backgroundColor: theme.palette.mode === 'dark' ? '#2f3542' : '#f1f2f6',
                  padding: '0.2em 0.4em',
                  borderRadius: '3px',
                  color: theme.palette.mode === 'dark' ? '#e6edf3' : '#24292e',
                }}
                {...props}
              >
                {children}
              </code>
            );
          },
          blockquote: ({ node, children, ...props }: any) => (
            <Box
              component="blockquote"
              sx={{
                borderLeft: '4px solid',
                borderColor: 'primary.main',
                pl: 2,
                py: 1,
                my: 2,
                bgcolor: 'background.paper',
                '& p': {
                  m: 0
                }
              }}
              {...props}
            >
              {children}
            </Box>
          ),
          // tip, warning, info 등의 커스텀 컨테이너 처리
          div: ({ children, className, ...props }: any) => {
            if (className?.includes('tip') || className?.includes('warning') || className?.includes('info')) {
              const type = className?.split('-')[1] || 'tip';
              return (
                <Box
                  component="div"
                  sx={{
                    p: 2,
                    my: 2,
                    borderRadius: 1,
                    bgcolor: type === 'warning' ? 'warning.light' : 
                            type === 'info' ? 'info.light' : 'success.light',
                    '& p': {
                      m: 0
                    }
                  }}
                  {...props}
                >
                  {children}
                </Box>
              );
            }
            return <div className={className} {...props}>{children}</div>;
          }
        }}
      >
        {partWithIds}
      </ReactMarkdown>
    );
    
    // 광고 삽입 로직
    const minLines = 15;
    const randomInterval = Math.floor(Math.random() * 6 + 20); // 18-23 사이의 랜덤 값
    
    if (
      (index === minLines) || // 첫 광고는 15줄 후에
      (index > minLines && (index - minLines) % randomInterval === 0) // 그 이후는 랜덤 간격으로
    ) {
      acc.push(<AdBanner key={`ad-${index}`} />);
    }
    
    return acc;
  }, []);

  // 최종 컨텐츠 조합
  const contentWithAds = [
    <ReactMarkdown key="first-header">{firstHeaderWithId}</ReactMarkdown>,
    ...remainingContent
  ];

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
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
          backgroundColor: 'background.paper',
          borderRadius: 1,
          border: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
          목차
        </Typography>
        {toc.length > 0 && (
          <Box sx={{ 
            position: 'relative',
            '& > :first-of-type': {
              position: 'sticky',
              top: 0,
              backgroundColor: 'background.paper',
              zIndex: 1,
              pb: 1,
              borderBottom: '1px solid',
              borderColor: 'divider',
            }
          }}>
            {toc.map((item, index) => (
              <Typography
                key={item.id}
                variant="body2"
                component="a"
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  const element = document.getElementById(item.id);
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                sx={{
                  display: 'block',
                  pl: item.level * 1.5,
                  py: 0.5,
                  color: activeSection === item.id ? 'primary.main' : 'text.primary',
                  textDecoration: 'none',
                  '&:hover': {
                    color: 'primary.main',
                    backgroundColor: 'action.hover',
                  },
                }}
              >
                {item.text}
              </Typography>
            ))}
          </Box>
        )}
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
              my: 3,
              '& code': {
                backgroundColor: 'transparent',
                p: 0,
                color: theme.palette.mode === 'light' ? '#24292e' : '#e6edf3',
                display: 'block',
                fontFamily: 'Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace',
                fontSize: '0.875rem',
                lineHeight: 1.6,
                whiteSpace: 'pre',
                wordSpacing: 'normal',
                wordBreak: 'normal',
                wordWrap: 'normal',
                tabSize: 2,
              }
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

      {/* Share buttons */}
      <ShareButtons />

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

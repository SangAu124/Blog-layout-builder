import { Box, IconButton, Tooltip, useTheme } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ShareIcon from '@mui/icons-material/Share';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkIcon from '@mui/icons-material/Link';

const ShareButtons = () => {
  const theme = useTheme();

  const handleShare = (platform: string) => {
    // 실제 구현에서는 각 플랫폼별 공유 로직 추가
    console.log(`Sharing on ${platform}`);
  };

  const handleLike = () => {
    console.log('Liked');
  };

  return (
    <Box
      sx={{
        position: 'fixed',
        left: { lg: 'calc(50% - 550px)' }, // 컨텐츠 왼쪽에 고정
        top: '50%',
        transform: 'translateY(-50%)',
        display: { xs: 'none', lg: 'flex' },
        flexDirection: 'column',
        gap: 1,
        p: 1,
        borderRadius: 2,
        backgroundColor: theme.palette.mode === 'light' ? 'rgba(255, 255, 255, 0.8)' : 'rgba(18, 18, 18, 0.8)',
        backdropFilter: 'blur(8px)',
        boxShadow: theme.palette.mode === 'light' 
          ? '0 0 10px rgba(0,0,0,0.1)' 
          : '0 0 10px rgba(255,255,255,0.1)',
      }}
    >
      <Tooltip title="좋아요" placement="right">
        <IconButton 
          onClick={handleLike}
          sx={{
            '&:hover': {
              color: 'primary.main',
              transform: 'scale(1.1)',
            },
            transition: 'all 0.2s ease',
          }}
        >
          <ThumbUpIcon />
        </IconButton>
      </Tooltip>

      <Box sx={{ height: '1px', bgcolor: 'divider', my: 1 }} />

      <Tooltip title="트위터에 공유" placement="right">
        <IconButton 
          onClick={() => handleShare('twitter')}
          sx={{
            '&:hover': {
              color: '#1DA1F2',
              transform: 'scale(1.1)',
            },
            transition: 'all 0.2s ease',
          }}
        >
          <TwitterIcon />
        </IconButton>
      </Tooltip>

      <Tooltip title="페이스북에 공유" placement="right">
        <IconButton 
          onClick={() => handleShare('facebook')}
          sx={{
            '&:hover': {
              color: '#4267B2',
              transform: 'scale(1.1)',
            },
            transition: 'all 0.2s ease',
          }}
        >
          <FacebookIcon />
        </IconButton>
      </Tooltip>

      <Tooltip title="링크 복사" placement="right">
        <IconButton 
          onClick={() => handleShare('copy')}
          sx={{
            '&:hover': {
              color: 'primary.main',
              transform: 'scale(1.1)',
            },
            transition: 'all 0.2s ease',
          }}
        >
          <LinkIcon />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default ShareButtons;

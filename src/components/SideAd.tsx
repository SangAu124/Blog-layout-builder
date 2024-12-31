import { Paper, Box, Typography, useTheme } from '@mui/material';

const sideAds = [
  {
    title: '개발자 채용',
    description: '연봉 1억+ / 스톡옵션 / 자율 출퇴근',
    company: 'Tech Unicorn',
    color: '#FF6B6B',
  },
  {
    title: '클라우드 인프라 구축',
    description: '무료 컨설팅 진행중',
    company: 'Cloud Solutions',
    color: '#4ECDC4',
  },
  {
    title: 'AI 개발자 교육',
    description: '취업 연계 과정 / 수료율 98%',
    company: 'AI Academy',
    color: '#45B7D1',
  },
];

const SideAd = () => {
  const theme = useTheme();
  const randomAd = sideAds[Math.floor(Math.random() * sideAds.length)];

  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        border: '1px solid',
        borderColor: theme.palette.mode === 'light' ? 'grey.200' : 'grey.800',
        position: 'sticky',
        top: 20,
        width: '100%',
        maxWidth: 300,
      }}
    >
      <Box
        sx={{
          width: '100%',
          height: 120,
          backgroundColor: randomAd.color,
          opacity: theme.palette.mode === 'light' ? 0.1 : 0.05,
          borderRadius: 1,
          mb: 2,
        }}
      />
      <Typography
        variant="caption"
        sx={{ color: 'primary.main' }}
        gutterBottom
      >
        AD
      </Typography>
      <Typography variant="h6" gutterBottom>
        {randomAd.title}
      </Typography>
      <Typography variant="body2" color="text.secondary" gutterBottom>
        {randomAd.description}
      </Typography>
      <Typography variant="caption" color="text.secondary">
        Powered by {randomAd.company}
      </Typography>
    </Paper>
  );
};

export default SideAd;

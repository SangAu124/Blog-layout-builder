import { Paper, Box, Typography, useTheme } from '@mui/material';

const ads = [
  {
    title: '2024 개발자 컨퍼런스',
    description: '최신 기술 트렌드와 실무 경험을 공유하는 자리',
    company: 'Tech Conference',
  },
  {
    title: 'Cloud 자격증 과정',
    description: 'AWS, Azure, GCP 자격증 준비 과정 30% 할인',
    company: 'Cloud Academy',
  },
  {
    title: 'AI/ML 부트캠프',
    description: '실무 프로젝트로 배우는 인공지능 과정',
    company: 'AI Learning Hub',
  },
];

const AdBanner = () => {
  const theme = useTheme();
  const randomAd = ads[Math.floor(Math.random() * ads.length)];

  return (
    <Paper
      elevation={0}
      sx={{
        my: 4,
        p: 2,
        border: '1px solid',
        borderColor: theme.palette.mode === 'light' ? 'grey.300' : 'grey.800',
        backgroundColor: theme.palette.mode === 'light' ? 'grey.50' : 'grey.900',
        display: 'flex',
        alignItems: 'center',
        gap: 2,
      }}
    >
      <Box
        sx={{
          width: 80,
          height: 80,
          backgroundColor: theme.palette.primary.main,
          opacity: 0.1,
          borderRadius: 1,
        }}
      />
      <Box sx={{ flex: 1 }}>
        <Typography
          variant="caption"
          sx={{ color: theme.palette.primary.main }}
          gutterBottom
        >
          Sponsored
        </Typography>
        <Typography variant="subtitle1" fontWeight="bold">
          {randomAd.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {randomAd.description}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          by {randomAd.company}
        </Typography>
      </Box>
    </Paper>
  );
};

export default AdBanner;

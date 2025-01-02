import { Paper, Box, Typography, useTheme } from '@mui/material';

const sideAds = [
  {
    title: '개발자 채용',
    description: '연봉 1억+ / 스톡옵션 / 자율 출퇴근\n\n성장하는 팀과 함께 성장하세요',
    company: 'Tech Unicorn',
    color: '#FF6B6B',
  },
  {
    title: '클라우드 인프라 구축',
    description: '무료 컨설팅 진행중\n\n클라우드 전문가와 상담하세요',
    company: 'Cloud Solutions',
    color: '#4ECDC4',
  },
  {
    title: 'AI 개발자 교육',
    description: '취업 연계 과정 / 수료율 98%\n\n현업 개발자와 함께 성장하세요',
    company: 'AI Academy',
    color: '#45B7D1',
  },
  {
    title: '금융권 SI 프로젝트',
    description: '연봉 상위 20% / 분기별 성과급\n\n대규모 시스템 구축 경험을 쌓으세요',
    company: 'Smart Banking Solutions',
    color: '#6C5CE7',
  },
  {
    title: '공공기관 SI 개발자',
    description: '정규직 전환 가능 / 워라밸 보장\n\n안정적인 커리어를 시작하세요',
    company: 'Public IT Systems',
    color: '#00B894',
  },
  {
    title: '대기업 SI 프로젝트',
    description: 'PM/PL 채용 / 초급개발자 육성\n\n체계적인 성장 기회를 제공합니다',
    company: 'Enterprise Solutions',
    color: '#FDA7DF',
  }
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
        minHeight: 400, // 높이 2배로 증가
      }}
    >
      <Box
        sx={{
          width: '100%',
          height: 240, // 이미지 영역도 비례해서 증가
          backgroundColor: randomAd.color,
          opacity: theme.palette.mode === 'light' ? 0.1 : 0.05,
          borderRadius: 1,
          mb: 2,
          position: 'relative',
          overflow: 'hidden',
          '&::after': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `linear-gradient(45deg, ${randomAd.color}22, ${randomAd.color}11)`,
            opacity: 0.5,
          }
        }}
      />
      <Typography
        variant="caption"
        sx={{ color: 'primary.main' }}
        gutterBottom
      >
        광고
      </Typography>
      <Typography variant="h6" gutterBottom>
        {randomAd.title}
      </Typography>
      <Typography 
        variant="body2" 
        color="text.secondary" 
        sx={{ 
          whiteSpace: 'pre-line',
          mb: 2 
        }}
      >
        {randomAd.description}
      </Typography>
      <Typography variant="caption" color="text.secondary">
        Powered by {randomAd.company}
      </Typography>
    </Paper>
  );
};

export default SideAd;

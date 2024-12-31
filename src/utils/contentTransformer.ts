const techTopics = {
  backend: [
    'Spring Boot 아키텍처',
    'JPA 성능 최적화',
    'Spring Security',
    'MSA 설계 패턴',
    'Redis 캐싱 전략',
  ],
  ios: [
    'Swift UI 최적화',
    'iOS 앱 성능 개선',
    'Core Data 활용',
    'Push Notification',
    'In-App Purchase',
  ],
  database: [
    'DB 인덱싱 전략',
    '쿼리 최적화',
    '데이터 모델링',
    '샤딩과 파티셔닝',
    '백업 및 복구 전략',
  ],
};

export const generateTechHeaders = (content: string): string => {
  const category = Math.random() > 0.5 ? 'backend' : Math.random() > 0.5 ? 'ios' : 'database';
  const topics = techTopics[category as keyof typeof techTopics];
  const selectedTopics = topics.sort(() => Math.random() - 0.5).slice(0, 3);
  
  const headers = selectedTopics.map(topic => `## ${topic}`).join('\n\n');
  const contentParts = content.split('\n\n');
  
  // Insert headers evenly throughout the content
  const step = Math.floor(contentParts.length / 4);
  selectedTopics.forEach((_, index) => {
    const position = (index + 1) * step;
    if (position < contentParts.length) {
      contentParts.splice(position, 0, headers.split('\n\n')[index]);
    }
  });
  
  return contentParts.join('\n\n');
};

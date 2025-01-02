const techTopics = {
  backend: [
    { title: 'Spring Boot Architecture', subtopics: ['Dependency Injection', 'AOP 구현', '트랜잭션 관리'] },
    { title: 'JPA Performance 최적화', subtopics: ['N+1 문제 해결', 'Caching 전략', 'Batch 처리'] },
    { title: 'Spring Security 구현', subtopics: ['Authentication/Authorization', 'OAuth2.0 연동', 'JWT 토큰 관리'] },
    { title: 'MSA Design Patterns', subtopics: ['Service Discovery', 'Circuit Breaker', 'API Gateway'] },
    { title: 'Redis Caching 전략', subtopics: ['Distributed Lock', '세션 관리', 'Cache Invalidation'] },
    { title: 'Spring Cloud 활용', subtopics: ['Config Server', 'Service Registry', 'API Gateway'] },
    { title: 'Reactive Programming', subtopics: ['Mono/Flux 활용', 'Backpressure 처리', 'WebFlux 구현'] },
    { title: 'Batch Processing', subtopics: ['Chunk 기반 처리', 'Retry 메커니즘', 'Scheduling 관리'] },
  ],
  ios: [
    { title: 'SwiftUI Optimization', subtopics: ['Memory 관리', 'Rendering 성능', 'State 관리'] },
    { title: 'iOS App Performance', subtopics: ['Background 처리', 'Network 최적화', 'Image Caching'] },
    { title: 'Core Data Implementation', subtopics: ['Data Modeling', 'Migration 전략', 'Concurrency 처리'] },
    { title: 'Push Notification', subtopics: ['Token 관리', 'Payload 처리', 'Permission 설정'] },
    { title: 'In-App Purchase 구현', subtopics: ['Product 구성', 'Payment 검증', 'Subscription 관리'] },
    { title: 'Combine Framework', subtopics: ['Publisher/Subscriber', 'Error Handling', 'Async 처리'] },
    { title: 'Swift Concurrency', subtopics: ['async/await 패턴', 'Actor Model', 'Task 관리'] },
    { title: 'Metal Graphics', subtopics: ['Shader Programming', 'GPU Acceleration', 'Rendering Pipeline'] },
  ],
  android: [
    { title: 'Jetpack Compose 기초', subtopics: ['Composable Function', 'State Management', 'Layout System'] },
    { title: 'Android Performance', subtopics: ['Memory Leak 방지', 'Battery 최적화', 'App Size 관리'] },
    { title: 'Room Database 설계', subtopics: ['Entity 모델링', 'DAO Pattern', 'Migration 처리'] },
    { title: 'WorkManager 활용', subtopics: ['Background Task', 'Periodic Work', 'Task Chaining'] },
    { title: 'Android Security', subtopics: ['App Signing', 'Data Encryption', 'Biometric Auth'] },
    { title: 'Kotlin Coroutines', subtopics: ['Flow 활용', 'Channel 구현', 'Context 전환'] },
    { title: 'Navigation Component', subtopics: ['Deep Link 처리', 'Screen 전환', 'Arguments 전달'] },
    { title: 'Custom View 개발', subtopics: ['Canvas Drawing', 'Touch Event', 'Animation 구현'] },
  ],
  database: [
    { title: 'DB Indexing Strategy', subtopics: ['Composite Index', 'Selectivity 분석', 'Covering Index'] },
    { title: 'Query Optimization', subtopics: ['Execution Plan', 'Join 최적화', 'Subquery 튜닝'] },
    { title: 'Data Modeling 기법', subtopics: ['정규화/비정규화', 'Partitioning 설계', 'Sharding 전략'] },
    { title: 'Sharding & Partition', subtopics: ['수평/수직 분할', 'Shard Key 선택', 'Data Distribution'] },
    { title: 'Backup & Recovery', subtopics: ['Incremental Backup', 'Replication 구성', 'Disaster Recovery'] },
    { title: 'Transaction Management', subtopics: ['ACID Properties', 'Isolation Level', 'Deadlock 처리'] },
    { title: 'Data Migration 전략', subtopics: ['Zero-Downtime', 'Schema Change', 'Rollback Plan'] },
    { title: 'Performance Monitoring', subtopics: ['Resource Usage', 'Slow Query 분석', 'Bottleneck 진단'] },
  ],
};

const codeExamples = [
  {
    language: 'typescript',
    code: `// 목차 아이템 인터페이스
interface TocItem {
  text: string;
  level: number;
  id: string;
}`
  },
  {
    language: 'typescript',
    code: `// 목차 생성 함수
const generateTableOfContents = (content: string): TocItem[] => {
  // 모든 헤딩 태그 찾기 (h1-h6)
  const headings = content.match(/^#{1,6}.+$/gm) || [];
  
  // 각 헤딩을 TocItem으로 변환
  return headings.map(heading => {
    // '#' 개수로 레벨 결정
    const level = heading.match(/^#+/)[0].length;
    
    // 헤딩 텍스트 추출
    const text = heading.replace(/^#+\\s/, '');
    
    // URL 친화적인 ID 생성
    const id = text.toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
    
    return { text, level, id };
  });
};`
  }
];

const blogElements = [
  {
    type: 'quote',
    content: '좋은 코드는 그 자체로 최고의 문서가 됩니다. 하지만 좋은 문서는 더 나은 코드를 만들어냅니다. 📚',
  },
  {
    type: 'quote',
    content: '버그를 찾는 것은 디버깅의 절반에 불과합니다. 더 어려운 절반은 버그를 수정하는 것입니다. 🐛',
  },
  {
    type: 'tip',
    content: '💡 Tip: 코드 리뷰는 버그를 찾는 것보다 지식을 공유하는 데 더 큰 가치가 있습니다.',
  },
  {
    type: 'warning',
    content: '⚠️ 주의: 프로덕션 환경에서는 항상 에러 처리를 철저히 해주세요.',
  },
  {
    type: 'info',
    content: 'ℹ️ 참고: 이 글의 예제 코드는 TypeScript 4.5 이상의 버전에서 테스트되었습니다.',
  },
  {
    type: 'quote',
    content: '완벽한 코드는 없습니다. 하지만 더 나은 코드를 위해 노력하는 과정은 있습니다. 🎯',
  },
  {
    type: 'tip',
    content: '🔍 Tip: 성능 최적화를 시작하기 전에 항상 프로파일링을 먼저 진행하세요. 추측이 아닌 데이터를 기반으로 결정하세요.',
  },
  {
    type: 'warning',
    content: '🚨 Warning: 보안 관련 설정은 환경 변수나 설정 파일로 분리하여 관리하세요. 절대 코드에 직접 입력하지 마세요.',
  },
  {
    type: 'info',
    content: '📊 Info: 마이크로서비스 아키텍처는 확장성과 유연성을 제공하지만, 그만큼 운영 복잡도도 증가합니다.',
  },
  {
    type: 'quote',
    content: '기술 부채는 이자율이 가장 높은 대출과 같습니다. 적절한 시기에 갚지 않으면 나중에 더 큰 비용을 치르게 됩니다. 💸',
  },
  {
    type: 'tip',
    content: '⚡️ Tip: 캐싱은 성능 향상의 강력한 도구지만, 캐시 무효화 전략도 함께 고려해야 합니다.',
  },
  {
    type: 'warning',
    content: '⏰ Warning: 비동기 작업의 타임아웃 설정은 필수입니다. 무한 대기 상태를 방지하세요.',
  },
  {
    type: 'info',
    content: '🔄 Info: CI/CD 파이프라인은 개발 생산성을 높이지만, 안정적인 테스트 자동화가 선행되어야 합니다.',
  },
  {
    type: 'quote',
    content: '레거시 코드는 과거의 성공적인 비즈니스 결정의 결과물입니다. 비난하지 말고 이해하려 노력하세요. 🌱',
  },
  {
    type: 'tip',
    content: '📱 Tip: 모바일 앱 개발 시 네트워크 상태와 배터리 소모를 항상 고려하세요.',
  }
];

export const generateTechHeaders = (content: string): string => {
  // 글 길이에 따라 추가할 주제 수 결정
  const contentLength = content.length;
  let numTopics = 2; // 기본 주제 수

  if (contentLength > 3000) numTopics = 3;
  if (contentLength > 5000) numTopics = 4;
  if (contentLength > 8000) numTopics = 5;

  // 랜덤하게 카테고리 선택
  const categories = Object.keys(techTopics);
  const selectedCategory = categories[Math.floor(Math.random() * categories.length)];
  const topics = techTopics[selectedCategory as keyof typeof techTopics];

  // 랜덤하게 주제 선택
  const selectedTopics = [...topics]
    .sort(() => Math.random() - 0.5)
    .slice(0, numTopics);

  // 헤더 생성
  let headers: string[] = [];
  selectedTopics.forEach(topic => {
    headers.push(`## ${topic.title}`);
    
    // 글이 충분히 길면 서브토픽도 추가
    if (contentLength > 3000) {
      const numSubtopics = Math.min(
        Math.floor(contentLength / 2000), // 2000자당 1개의 서브토픽
        topic.subtopics.length
      );
      
      const selectedSubtopics = topic.subtopics
        .sort(() => Math.random() - 0.5)
        .slice(0, numSubtopics);
      
      selectedSubtopics.forEach(subtopic => {
        headers.push(`### ${subtopic}`);
      });
    }
  });

  // 컨텐츠에 헤더 삽입
  const contentParts = content.split('\n\n');
  const step = Math.floor(contentParts.length / (headers.length + 1));
  
  headers.forEach((header, index) => {
    const position = (index + 1) * step;
    if (position < contentParts.length) {
      contentParts.splice(position, 0, header);
    }
  });

  // 코드 블록 추가 (9000자마다)
  if (contentLength > 9000) {
    const numCodeBlocks = Math.floor(contentLength / 9000);
    for (let i = 0; i < numCodeBlocks; i++) {
      const position = Math.floor((i + 1) * contentParts.length / (numCodeBlocks + 1));
      const codeExample = codeExamples[i % codeExamples.length];
      contentParts.splice(position, 0, `\`\`\`${codeExample.language}\n${codeExample.code}\n\`\`\``);
    }
  }

  // 블로그 요소 추가 (약 3000자마다)
  if (contentLength > 3000) {
    const numElements = Math.floor(contentLength / 3000);
    for (let i = 0; i < numElements; i++) {
      const position = Math.floor((i + 1) * contentParts.length / (numElements + 2));
      const element = blogElements[i % blogElements.length];
      
      let elementContent = '';
      switch (element.type) {
        case 'quote':
          elementContent = `> ${element.content}`;
          break;
        case 'tip':
        case 'warning':
        case 'info':
          elementContent = `:::${element.type}\n${element.content}\n:::`;
          break;
      }
      
      contentParts.splice(position, 0, elementContent);
    }
  }

  return contentParts.join('\n\n');
};

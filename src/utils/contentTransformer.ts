const techTopics = {
  backend: [
    { title: 'Spring Boot 아키텍처', subtopics: ['의존성 주입', 'AOP', '트랜잭션 관리'] },
    { title: 'JPA 성능 최적화', subtopics: ['N+1 문제 해결', '캐싱 전략', '배치 처리'] },
    { title: 'Spring Security', subtopics: ['인증/인가', 'OAuth2.0', 'JWT 토큰'] },
    { title: 'MSA 설계 패턴', subtopics: ['서비스 디스커버리', '서킷브레이커', 'API 게이트웨이'] },
    { title: 'Redis 캐싱 전략', subtopics: ['분산 락', '세션 관리', '캐시 무효화'] },
    { title: 'Spring Cloud 활용', subtopics: ['Config Server', 'Eureka', 'Zuul Gateway'] },
    { title: 'WebFlux 리액티브', subtopics: ['비동기 처리', 'Mono/Flux', '백프레셔'] },
    { title: 'Spring Batch', subtopics: ['청크 처리', '재시도 전략', '스케줄링'] },
  ],
  ios: [
    { title: 'Swift UI 최적화', subtopics: ['메모리 관리', '렌더링 성능', '상태 관리'] },
    { title: 'iOS 앱 성능 개선', subtopics: ['백그라운드 처리', '네트워크 최적화', '이미지 캐싱'] },
    { title: 'Core Data 활용', subtopics: ['데이터 모델링', '마이그레이션', '동시성 처리'] },
    { title: 'Push Notification', subtopics: ['토큰 관리', '페이로드 처리', '사용자 권한'] },
    { title: 'In-App Purchase', subtopics: ['상품 구성', '결제 검증', '구독 관리'] },
    { title: 'Combine 프레임워크', subtopics: ['Publisher/Subscriber', '비동기 처리', '에러 핸들링'] },
    { title: 'Swift Concurrency', subtopics: ['async/await', 'Actor 모델', 'Task 관리'] },
    { title: 'Metal 그래픽스', subtopics: ['셰이더 프로그래밍', 'GPU 가속', '렌더링 파이프라인'] },
  ],
  android: [
    { title: 'Jetpack Compose', subtopics: ['컴포저블 함수', '상태 관리', '레이아웃 시스템'] },
    { title: 'Android 성능 최적화', subtopics: ['메모리 누수', '배터리 효율', '앱 크기 최적화'] },
    { title: 'Room Database', subtopics: ['엔티티 설계', 'DAO 패턴', '마이그레이션'] },
    { title: 'WorkManager', subtopics: ['백그라운드 작업', '주기적 작업', '작업 체이닝'] },
    { title: 'Android Security', subtopics: ['앱 서명', '데이터 암호화', '생체 인증'] },
    { title: 'Kotlin Coroutines', subtopics: ['Flow', 'Channel', '컨텍스트 전환'] },
    { title: 'Navigation Component', subtopics: ['딥링크', '화면 전환', '인자 전달'] },
    { title: 'Custom View', subtopics: ['캔버스 드로잉', '터치 이벤트', '애니메이션'] },
  ],
  database: [
    { title: 'DB 인덱싱 전략', subtopics: ['복합 인덱스', '인덱스 선택성', '커버링 인덱스'] },
    { title: '쿼리 최적화', subtopics: ['실행 계획', '조인 최적화', '서브쿼리 튜닝'] },
    { title: '데이터 모델링', subtopics: ['정규화', '역정규화', '파티셔닝'] },
    { title: '샤딩과 파티셔닝', subtopics: ['수평/수직 분할', '샤드 키 선택', '데이터 분산'] },
    { title: '백업 및 복구 전략', subtopics: ['증분 백업', '리플리케이션', '장애 복구'] },
    { title: '트랜잭션 관리', subtopics: ['ACID 속성', '격리 수준', '데드락 처리'] },
    { title: '데이터 마이그레이션', subtopics: ['무중단 이전', '스키마 변경', '롤백 전략'] },
    { title: '성능 모니터링', subtopics: ['리소스 사용량', '슬로우 쿼리', '병목 지점'] },
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
  selectedTopics.forEach((topic, index) => {
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

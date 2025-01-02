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
  },
  {
    language: 'javascript',
    code: `// 이미지 레이지 로딩 구현
const lazyLoadImages = () => {
  const images = document.querySelectorAll('img[data-src]');
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        imageObserver.unobserve(img);
      }
    });
  });
  images.forEach(img => imageObserver.observe(img));
};`
  },
  {
    language: 'python',
    code: `# 데이터 캐싱 데코레이터
from functools import lru_cache
from datetime import datetime, timedelta
def timed_cache(seconds: int = 300):
    def decorator(func):
        cache = {}
        def wrapper(*args, **kwargs):
            key = str(args) + str(kwargs)
            if key in cache:
                result, timestamp = cache[key]
                if datetime.now() - timestamp < timedelta(seconds=seconds):
                    return result
            result = func(*args, **kwargs)
            cache[key] = (result, datetime.now())
            return result
        return wrapper
    return decorator`
  },
  {
    language: 'java',
    code: `// 제네릭 빌더 패턴
public class GenericBuilder<T> {
    private final Supplier<T> instantiator;
    private List<Consumer<T>> modifiers = new ArrayList<>();
    public GenericBuilder(Supplier<T> instantiator) {
        this.instantiator = instantiator;
    }
    public <V> GenericBuilder<T> with(BiConsumer<T, V> consumer, V value) {
        modifiers.add(instance -> consumer.accept(instance, value));
        return this;
    }
    public T build() {
        T instance = instantiator.get();
        modifiers.forEach(modifier -> modifier.accept(instance));
        return instance;
    }
}`
  },
  {
    language: 'typescript',
    code: `// 커스텀 리액트 훅: 무한 스크롤
const useInfiniteScroll = <T>(
  fetchMore: () => Promise<T[]>,
  options = { threshold: 100 }
) => {
  const [items, setItems] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  useEffect(() => {
    const handleScroll = async () => {
      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - options.threshold
      ) {
        if (!loading && hasMore) {
          setLoading(true);
          const newItems = await fetchMore();
          setHasMore(newItems.length > 0);
          setItems(prev => [...prev, ...newItems]);
          setLoading(false);
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading, hasMore]);
  return { items, loading, hasMore };
};`
  },
  {
    language: 'go',
    code: `// 고루틴을 사용한 동시성 작업 처리
func processItems(items []string) []string {
    numWorkers := 3
    jobs := make(chan string, len(items))
    results := make(chan string, len(items))
    // 워커 생성
    for i := 0; i < numWorkers; i++ {
        go worker(jobs, results)
    }
    // 작업 전달
    for _, item := range items {
        jobs <- item
    }
    close(jobs)
    // 결과 수집
    processed := make([]string, 0, len(items))
    for i := 0; i < len(items); i++ {
        processed = append(processed, <-results)
    }
    return processed
}`
  },
  {
    language: 'rust',
    code: `// 안전한 싱글톤 패턴
use std::sync::{Arc, Mutex, Once};
use std::sync::atomic::{AtomicBool, Ordering};
pub struct Singleton {
    data: String,
}
pub struct SingletonWrapper {
    instance: Arc<Mutex<Singleton>>,
    initialized: AtomicBool,
}
impl SingletonWrapper {
    pub fn get_instance() -> Arc<Mutex<Singleton>> {
        static mut SINGLETON: Option<SingletonWrapper> = None;
        static ONCE: Once = Once::new();
        unsafe {
            ONCE.call_once(|| {
                SINGLETON = Some(SingletonWrapper {
                    instance: Arc::new(Mutex::new(Singleton {
                        data: String::new(),
                    })),
                    initialized: AtomicBool::new(false),
                });
            });
            SINGLETON.as_ref().unwrap().instance.clone()
        }
    }
}`
  },
  {
    language: 'sql',
    code: `-- 계층형 데이터 쿼리 (재귀 CTE)
WITH RECURSIVE CommentHierarchy AS (
    -- 기본 케이스: 최상위 댓글
    SELECT 
        id,
        content,
        parent_id,
        author,
        created_at,
        0 as depth,
        CAST(id AS VARCHAR(1000)) as path
    FROM comments
    WHERE parent_id IS NULL
    UNION ALL
    -- 재귀 케이스: 자식 댓글
    SELECT 
        c.id,
        c.content,
        c.parent_id,
        c.author,
        c.created_at,
        ch.depth + 1,
        ch.path || '-' || c.id
    FROM comments c
    JOIN CommentHierarchy ch ON c.parent_id = ch.id
)
SELECT * FROM CommentHierarchy
ORDER BY path;`
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
  let numTopics = 3;

  if (contentLength > 2000) numTopics = 4;
  if (contentLength > 4000) numTopics = 5;
  if (contentLength > 6000) numTopics = 6;

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
    
    if (contentLength > 1500) {
      const numSubtopics = Math.min(
        Math.floor(contentLength / 1000),
        topic.subtopics.length
      );
      
      const selectedSubtopics = topic.subtopics
        .sort(() => Math.random() - 0.5)
        .slice(0, numSubtopics);
      
      selectedSubtopics.forEach(subtopic => {
        headers.push(`### ${subtopic}`);
        
        // 20% 확률로만 인용구 추가
        if (Math.random() < 0.2) {
          const element = blogElements[Math.floor(Math.random() * blogElements.length)];
          headers.push(`> ${element.content}`);
        }
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

  // 코드 블록 추가 (500자마다)
  if (contentLength > 500) {
    const numCodeBlocks = Math.floor(contentLength / 500);
    for (let i = 0; i < numCodeBlocks; i++) {
      // 컨텐츠 전체에 걸쳐 고르게 분포
      const position = Math.floor((i + 1) * contentParts.length / (numCodeBlocks + 2));
      const codeExample = codeExamples[i % codeExamples.length];
      contentParts.splice(position, 0, `\`\`\`${codeExample.language}\n${codeExample.code}\n\`\`\``);
    }
  }

  // 블로그 요소 추가 (1500자마다, 빈도 감소)
  if (contentLength > 850) {
    const numElements = Math.floor(contentLength / 850);
    // 최대 5개로 제한
    const maxElements = Math.min(numElements, 5);
    
    for (let i = 0; i < maxElements; i++) {
      // 컨텐츠 앞쪽 2/3 영역에만 배치
      const position = Math.floor((i + 1) * (contentParts.length * 0.67) / (maxElements + 1));
      const element = blogElements[i % blogElements.length];
      contentParts.splice(position, 0, `> ${element.content}`);
    }
  }

  return contentParts.join('\n\n');
};

import { type ReactNode, useEffect, useState } from 'react';
import { ArrowRight, ArrowUpRight, Github, Linkedin, Mail, MapPin, Menu, Plus, X } from 'lucide-react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';

const queryClient = new QueryClient();

const navItems = [
  { id: 'about', label: '소개' },
  { id: 'work', label: '작업' },
  { id: 'career', label: '경력' },
  { id: 'contact', label: '연락하기' },
];

const principles = [
  { number: '01', title: '복잡함을 정리합니다', text: '사용자가 다음에 해야 할 일을 빠르게 이해하도록 흐름과 인터페이스를 다듬습니다.' },
  { number: '02', title: '맥락에서 시작합니다', text: '화면을 만들기 전에 사람, 팀, 그리고 제품이 놓인 환경을 먼저 살핍니다.' },
  { number: '03', title: '끝까지 구현합니다', text: '작은 간격과 예외 상태까지 직접 확인하며 아이디어를 실제 경험으로 완성합니다.' },
];

const skills = [
  { name: 'React / TypeScript', level: 'CORE' },
  { name: 'Next.js / Node.js', level: 'BUILD' },
  { name: 'UI systems / CSS', level: 'CRAFT' },
  { name: 'Figma / Prototyping', level: 'THINK' },
];

const projects = [
  {
    id: '01',
    title: '결의의 지도',
    type: 'PRODUCT / 2024',
    description: '흩어진 팀의 의사결정을 한 장의 흐름으로 정리한 협업 도구',
    visual: 'visual-one',
    large: true,
  },
  {
    id: '02',
    title: '모어 데이즈',
    type: 'BRAND / 2023',
    description: '매일의 기록을 가볍게 시작하게 만드는 리추얼 스튜디오',
    visual: 'visual-two',
    large: false,
  },
  {
    id: '03',
    title: '오프셋 리서치',
    type: 'WEB / 2023',
    description: '도시의 변화와 사람의 이동을 읽는 데이터 아카이브',
    visual: 'visual-three',
    large: false,
  },
];

const career = [
  { year: '2022 — 현재', role: '프론트엔드 개발자', place: '스튜디오 프레임', detail: 'B2B SaaS의 첫 화면부터 운영 도구까지, 기획과 디자인 그리고 구현 사이를 오가며 일합니다.' },
  { year: '2020 — 2022', role: 'UI 엔지니어', place: '레이어드 랩', detail: '서비스 초기 팀의 멤버로 합류해 디자인 시스템을 세우고 제품의 첫 사용자 경험을 만들었습니다.' },
  { year: '2016 — 2020', role: '컴퓨터공학 전공', place: '서울 소재 대학', detail: '코드를 도구로, 관찰을 태도로 배웠습니다. 지금도 만들기 전 오래 들여다보는 편입니다.' },
];

const notes = [
  { title: '인터페이스는 언제 설명을 멈춰야 하는가', tag: 'ESSAY · 06' },
  { title: '작은 팀을 위한 디자인 시스템의 온도', tag: 'FIELD NOTE · 05' },
  { title: '좋은 기본값에 관하여', tag: 'THOUGHTS · 04' },
];

function useReveal() {
  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>('.reveal');
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add('is-visible')),
      { threshold: 0.12 },
    );
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);
}

function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('about');
  useReveal();

  useEffect(() => {
    const sections = navItems.map(({ id }) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && setActiveSection(entry.target.id)),
      { rootMargin: '-28% 0px -62% 0px' },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="site-shell">
      <header className="topbar" data-testid="header-navigation">
        <div className="wrap topbar-inner">
          <a className="brand" href="#top" onClick={closeMenu} data-testid="link-brand">
            <span className="brand-mark">S</span>
            <span className="brand-copy">SEOA Portfolio<small>FRONTEND · PRODUCT · CODE</small></span>
          </a>
          <nav className={`nav-links ${menuOpen ? 'open' : ''}`} aria-label="주요 메뉴">
            {navItems.map((item) => (
              <a key={item.id} href={`#${item.id}`} className={activeSection === item.id ? 'active' : ''} onClick={closeMenu} data-testid={`link-nav-${item.id}`}>
                {item.label}
              </a>
            ))}
            <a className="nav-contact" href="#contact" onClick={closeMenu} data-testid="link-nav-contact">
              함께 만들기 <ArrowUpRight size={14} />
            </a>
          </nav>
          <button className="menu-toggle" onClick={() => setMenuOpen((open) => !open)} aria-label={menuOpen ? '메뉴 닫기' : '메뉴 열기'} data-testid="button-mobile-menu">
            {menuOpen ? <X size={23} /> : <Menu size={23} />}
          </button>
        </div>
      </header>

      <main id="top">
        <section className="hero" aria-labelledby="hero-title">
          <div className="wrap hero-grid">
            <div>
              <div className="hero-kicker"><span className="pulse" /> 서울을 기반으로, 더 나은 흐름을 만듭니다.</div>
              <h1 id="hero-title">
                아이디어를
                <br />
                <span className="soft">명확한</span> <span className="script">화면으로.</span>
              </h1>
              <p className="hero-intro">
                저는 제품의 방향을 함께 고민하고, 그 생각을 화면 위에서 작동하게 만드는 프론트엔드 개발자 서아입니다.
                사람과 팀이 더 잘 움직이는 디지털 경험을 만듭니다.
              </p>
              <div className="hero-actions">
                <a className="button button-primary" href="#work" data-testid="link-hero-work">작업 둘러보기 <ArrowRight size={15} /></a>
                <a className="button button-quiet" href="#contact" data-testid="link-hero-contact">인사 건네기</a>
              </div>
            </div>
            <div className="hero-art" aria-label="SEOA Portfolio 소개 그래픽">
              <div className="scroll-note"><span className="scroll-line" /> 더 알아보기</div>
              <div className="code-card">
                <div className="code-top"><span>seoa / portfolio.tsx</span><span className="code-dots"><i /><i /><i /></span></div>
                <div className="code-lines">
                  <div><span className="blue">const</span> <span className="mint">experience</span> = {'{'}</div>
                  <div className="indent"><span className="orange">purpose</span>: <span className="mint">'make it clear'</span>,</div>
                  <div className="indent"><span className="orange">stack</span>: [<span className="mint">'React'</span>, <span className="mint">'TypeScript'</span>],</div>
                  <div className="indent"><span className="orange">detail</span>: <span className="mint">true</span>,</div>
                  <div>{'}'};</div>
                  <br />
                  <div><span className="blue">export default</span> <span className="mint">experience</span>;</div>
                </div>
              </div>
              <div className="status-card"><span className="status-dot" /><div>현재 협업 가능<small>새로운 제품 이야기를 기다립니다</small></div></div>
              <div className="hero-index mono"><strong>01</strong> / 04 — INTRO</div>
            </div>
          </div>
        </section>

        <div className="marquee-band" aria-hidden="true">
          <div className="marquee-track">
            <span className="marquee-item">생각을 구조로, 구조를 경험으로</span>
            <span className="marquee-item">생각을 구조로, 구조를 경험으로</span>
            <span className="marquee-item">생각을 구조로, 구조를 경험으로</span>
            <span className="marquee-item">생각을 구조로, 구조를 경험으로</span>
          </div>
        </div>

        <section id="about" className="section about" aria-labelledby="about-title">
          <div className="wrap about-grid">
            <div className="about-copy reveal">
              <span className="eyebrow">02 — ABOUT</span>
              <h2 id="about-title" className="section-heading">작게 보고,<br /><em>멀리</em> 만듭니다.</h2>
              <p>기술은 목적지가 아니라 <span>더 나은 질문을 위한 도구</span>라고 믿습니다.</p>
            </div>
            <div className="principles reveal" style={{ transitionDelay: '140ms' }}>
              {principles.map((principle) => (
                <article className="principle" key={principle.number} data-testid={`card-principle-${principle.number}`}>
                  <span className="principle-num">{principle.number}</span>
                  <div><h3>{principle.title}</h3><p>{principle.text}</p></div>
                  <Plus size={16} strokeWidth={1.5} />
                </article>
              ))}
            </div>
            <div className="skills-panel reveal" style={{ transitionDelay: '220ms' }}>
              <span className="eyebrow">TOOLKIT / 지금 잘 쓰는 것들</span>
              <div className="skills-list">
                {skills.map((skill) => (
                  <div className="skill" key={skill.name} data-testid={`text-skill-${skill.name.replaceAll(' ', '-').toLowerCase()}`}>
                    <span>{skill.name}</span><small>{skill.level}</small>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="work" className="section work-section" aria-labelledby="work-title">
          <div className="wrap">
            <div className="work-header reveal">
              <div><span className="eyebrow">03 — SELECTED WORK</span><h2 id="work-title" className="section-heading">만든 것들의<br /><em>일부.</em></h2></div>
              <p>문제를 발견하는 일부터 마지막 픽셀을 다듬는 일까지. 프로젝트를 누르면 함께 만들 다음 장면으로 이어집니다.</p>
            </div>
            <div className="project-grid">
              {projects.map((project, index) => (
                <a className={`project reveal ${project.large ? 'project-large' : ''}`} href="#contact" key={project.id} style={{ transitionDelay: `${index * 100}ms` }} data-testid={`card-project-${project.id}`}>
                  <div className={`project-visual ${project.visual}`}>
                    {project.visual === 'visual-one' && <div className="browser"><div className="browser-bar"><i /><i /><i /></div><div className="browser-content"><div className="fake-title" /><div className="fake-line" /><div className="fake-line" /><div className="fake-block" /></div></div>}
                    {project.visual === 'visual-two' && <div className="label-card">more days<br /><span className="serif">for the in-between</span></div>}
                  </div>
                  <div className="project-meta"><div><div className="project-title">{project.title}</div><div className="project-type">{project.type}</div></div><ArrowUpRight className="project-arrow" size={19} /></div>
                  <p className="project-description">{project.description}</p>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section id="career" className="section career" aria-labelledby="career-title">
          <div className="wrap career-grid">
            <div className="career-intro reveal">
              <span className="eyebrow">04 — PATH SO FAR</span>
              <h2 id="career-title" className="section-heading">계속<br /><em>배우는 중.</em></h2>
              <p>정답이 빠르게 바뀌는 세계에서, 만드는 사람의 호기심을 오래 지키려고 합니다.</p>
            </div>
            <div className="timeline reveal" style={{ transitionDelay: '120ms' }}>
              {career.map((item, index) => (
                <article className="timeline-item" key={item.year} data-testid={`row-career-${index}`}>
                  <span className="timeline-year">{item.year}</span>
                  <div><h3 className="timeline-role">{item.role}</h3><p className="timeline-place">{item.place}</p><p className="timeline-detail">{item.detail}</p></div>
                  <span className="timeline-dot" />
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section learning" aria-labelledby="learning-title">
          <div className="learning-shape" aria-hidden="true" />
          <div className="wrap learning-grid">
            <div className="learning-copy reveal">
              <span className="eyebrow">05 — ALWAYS CURIOUS</span>
              <h2 id="learning-title" className="section-heading">아직도<br /><em>궁금한 것들.</em></h2>
              <p>읽고, 걷고, 대화하며 다음 프로젝트에 가져갈 질문을 모읍니다. 최근에 정리한 짧은 메모입니다.</p>
            </div>
            <div className="notes reveal" style={{ transitionDelay: '150ms' }}>
              {notes.map((note, index) => (
                <a className="note" href="#contact" key={note.tag} data-testid={`link-note-${index}`}>
                  <div><div className="note-title">{note.title}</div><div className="note-tag">{note.tag}</div></div><ArrowUpRight size={16} />
                </a>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="contact" aria-labelledby="contact-title">
          <div className="wrap contact-inner reveal">
            <div><span className="eyebrow">06 — SAY HELLO</span><h2 id="contact-title">같이 만들<br /><em>이야기</em>가 있나요?</h2></div>
            <div className="contact-copy">
              <p>새로운 제품을 시작하거나, 이미 있는 서비스를 조금 더 명확하게 만들고 싶다면 편하게 이야기해주세요. 좋은 질문부터 함께 찾아보겠습니다.</p>
              <a className="contact-email" href="mailto:hello@seoa.dev" data-testid="link-contact-email">hello@seoa.dev <ArrowUpRight size={14} /></a>
              <div style={{ marginTop: 30, display: 'flex', gap: 10 }}>
                <a className="button button-quiet" href="https://github.com" target="_blank" rel="noreferrer" data-testid="link-github"><Github size={15} /> GitHub</a>
                <a className="button button-quiet" href="https://linkedin.com" target="_blank" rel="noreferrer" data-testid="link-linkedin"><Linkedin size={15} /> LinkedIn</a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="wrap footer">
        <span data-testid="text-footer-copyright">© 2024 SEOA Portfolio. Frontend developer portfolio.</span>
        <span className="footer-links"><a href="#top" data-testid="link-footer-top">맨 위로</a><a href="mailto:hello@seoa.dev" data-testid="link-footer-mail"><Mail size={12} /> 메일</a><span><MapPin size={12} /> Seoul, KR</span></span>
      </footer>
    </div>
  );
}

function Router() {
  return (
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
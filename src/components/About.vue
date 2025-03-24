<template>
  <div class="biography-container">
    <header class="bio-header">
      <div class="profile-section">
        <img src="/images/prop.jpg" alt="Profile" class="profile-image" />
        <div class="profile-info">
          <h1 class="name">BMC</h1>
          <p class="tagline">보안 지식을 겸비한 개발자로 성장하고 싶습니다.</p>
          <div class="quick-stats">
            <div class="stat-item">
              <i class="fas fa-code"></i>
              <span>Full Stack Development</span>
            </div>
            <div class="stat-item">
              <i class="fas fa-graduation-cap"></i>
              <span>Korea University</span>
            </div>
            <div class="stat-item">
              <i class="fas fa-shield-alt"></i>
              <span>Smart Security</span>
            </div>
            <div class="stat-item">
              <i class="fas fa-desktop"></i>
              <span>Computer Science</span>
            </div>
          </div>
        </div>
      </div>
    </header>

    <main class="bio-content">
      <section class="timeline-section">
        <h2>My Journey</h2>
        <div class="timeline">
          <div class="timeline-item fade-trigger">
            <div class="timeline-date">2016 - 2019</div>
            <div class="timeline-content">
              <h3>선린인터넷고등학교</h3>
              <div class="timeline-subtitle">웹운영과</div>
              <p>웹 개발의 기초를 배우고, 다양한 실습을 통해 실전 경험을 쌓았습니다. 여러 해커톤과 공모전에서 팀 프로젝트를 진행하며, 창의적 문제 해결과 협업 능력을 키웠습니다.</p>
              <div class="achievements">
                <div class="achievement">
                  <i class="fas fa-trophy"></i>
                  <span>선린 해커톤 동상 - Enerprice</span>
                </div>
                <div class="achievement">
                  <i class="fas fa-medal"></i>
                  <span>선린 해커톤 금상 - 마을의 소리</span>
                </div>
                <div class="achievement">
                  <i class="fas fa-award"></i>
                  <span>Smarteen Appjam 최우수상 - TheQuiet</span>
                </div>
              </div>
            </div>
          </div>

          <div class="timeline-item fade-trigger">
            <div class="timeline-date">2019 - 2021</div>
            <div class="timeline-content">
              <h3>서울시립대학교</h3>
              <div class="timeline-subtitle">컴퓨터과학부</div>
              <p>컴퓨터 과학의 기초를 학습하며 프로그래밍의 이론적 토대를 다졌습니다. 데이터베이스, 알고리즘, 운영체제 등 핵심 과목들을 통해 개발자로서의 기본기를 확립하고, 문제 해결을 위한 효율적인 접근 방식을 배웠습니다.</p>
            </div>
          </div>

          <div class="timeline-item fade-trigger">
            <div class="timeline-date">2021 - 2023</div>
            <div class="timeline-content">
              <h3>정보체계운영병</h3>
              <p>IPS(침입 방지 시스템) 관제 업무를 통해 보안의 중요성을 실감하게 되었습니다. 주로 실시간 네트워크 트래픽을 모니터링하고, 이상 징후를 감지하여 신속하게 대응하는 업무를 담당했습니다. 이를 통해 시스템의 안정성을 유지하며, 네트워크 보안에 대한 기본적인 이해를 쌓았습니다. 이 경험은 단순한 보안 대응을 넘어 향후 개발자로서 시스템과 소프트웨어의 안정성을 고려한 개발을 하는 데 도움이 되었습니다.</p>
            </div>
          </div>

          <div class="timeline-item fade-trigger">
            <div class="timeline-date">2023 - 현재</div>
            <div class="timeline-content">
              <h3>고려대학교</h3>
              <div class="timeline-subtitle">스마트보안학부 | 컴퓨터학과</div>
              <p>고려대학교에서 보안과 개발을 결합한 전문성을 키우고 있으며, 일상생활에서의 불편함을 해결하는 다양한 소프트웨어를 구상하고 개발하는 데 집중하고 있습니다. 특히, 사용자 중심의 가치 실현을 목표로, 사람들이 겪는 작은 불편함을 해결할 수 있는 앱과 서비스를 설계하고 구현하는 경험을 쌓고 있습니다. 개발 과정에서 시스템 설계와 보안에 대한 깊은 이해를 바탕으로, 기술적 문제를 해결하는 동시에 사용자 경험을 최적화하는 방법을 배워가고 있습니다.</p>
            </div>
          </div>

          <div class="timeline-item fade-trigger">
            <div class="timeline-date">2023 - 2024</div>
            <div class="timeline-content">
              <h3>화이트햇스쿨</h3>
              <div class="timeline-subtitle">1기</div>
              <p>화이트햇스쿨 1기 과정에서는 실습 중심의 보안 교육을 통해 다양한 보안 기술을 심화 학습했습니다. 이 과정에서 웹 애플리케이션 취약점 분석, 모의 해킹, 보안 솔루션 개발 등 다양한 분야에서 실무 경험을 쌓았습니다. 웹 취약점 분석을 통해 SQL 인젝션, XSS, CSRF와 같은 주요 보안 취약점을 탐지하고 대응 방법을 배웠으며, 모의 해킹 실습을 통해 실제 환경에서의 해킹 기법을 체험하고 이를 방어하는 방법을 익혔습니다.</p>
            </div>
          </div>

          <div class="timeline-item fade-trigger">
            <div class="timeline-date">2024</div>
            <div class="timeline-content">
              <h3>(주)시옷</h3>
              <div class="timeline-subtitle">인턴 사원</div>
              <p>Hardware Security Module(HSM)의 Abstraction Layer API 개발을 위한 기초 자료를 수집하고, 이를 기반으로 다양한 HSM의 API를 분석, 설계하였습니다. 주요 업무로는 Infineon, NXP, Microchip 등 HSM 제공업체들의 제품을 조사하고, API 문서화 및 데이터 시트를 분석하여 HSM의 기능과 특징을 파악하였습니다. 또한, 다양한 협업 도구(Slack, Jira, Confluence 등)를 활용하여 프로젝트 관리와 협업을 원활히 진행하였습니다. 이를 통해 HSM API 설계에 필요한 기본 개념과 실무 지식을 습득하였습니다.</p>
            </div>
          </div>

          <div class="timeline-item fade-trigger">
            <div class="timeline-date">2025</div>
            <div class="timeline-content">
              <h3>LG CNS</h3>
              <div class="timeline-subtitle">인턴 사원</div>
              <p>ITO Dashboard 시스템 개발에 참여했습니다. 특정 페이지의 풀 스택 개발을 맡아, 그리드 솔루션 라이브러리 선택과 과제 선정 과정에서 중요한 의사결정을 내렸습니다. 고객사와의 소통을 통해 기능 개선을 이끌어냈고, 시스템의 배포와 운영을 직접 경험하며 실제 운영 환경에서의 문제 해결 능력을 키웠습니다. 또한, 유지보수 측면에서 코드 재사용성을 높이는 방법을 고민하며 성장할 수 있었습니다.</p>
            </div>
          </div>
        </div>
      </section>

      <section class="philosophy-section">
        <h2>The way of thinking</h2>
        <div class="philosophy-content">
          <div class="philosophy-item">
            <i class="fas fa-user-shield"></i>
            <h3>보안 중심 설계</h3>
            <p>보안은 서비스의 신뢰성을 높이는 핵심 요소입니다. 개발 초기 단계부터 보안을 고려한 설계를 지향합니다.</p>
          </div>
          <div class="philosophy-item">
            <i class="fas fa-users"></i>
            <h3>사용자 중심 개발</h3>
            <p>기술은 사용자의 문제를 해결하기 위한 도구입니다. 항상 사용자의 관점에서 생각하고 개발합니다.</p>
          </div>
          <div class="philosophy-item">
            <i class="fas fa-sync-alt"></i>
            <h3>지속적 학습</h3>
            <p>새로운 기술과 도전을 두려워하지 않으며, 끊임없는 학습을 통해 성장합니다.</p>
          </div>
        </div>
      </section>

      <section class="projects-section">
        <h2>Projects</h2>
        <div class="projects-grid">
          <div class="project-card">
            <div class="project-header">
              <h3>개인 블로그</h3>
              <span class="project-year">2024</span>
            </div>
            <p class="project-desc">Spring Boot와 Vue.js를 활용한 기술 블로그 개발. 데이터 정규화, RESTful API 설계, 사용자 경험 최적화에 중점을 둠.</p>
            <div class="project-links">
              <a href="https://bmc.monster" target="_blank">Live Demo</a>
              <a href="https://github.com/bmc-00" target="_blank">GitHub</a>
            </div>
          </div>
          <div class="project-card">
            <div class="project-header">
              <h3>Siren</h3>
              <span class="project-year">2023-현재</span>
            </div>
            <p class="project-desc">인디 음악 개발자를 위한 실시간 스트리밍 및 커뮤니티 플랫폼. 라디오 형식의 동시 청취 경험 제공.</p>
            <span class="project-status">진행중</span>
          </div>
        </div>
      </section>

      <section class="contact-section">
        <h2>Contact & Links</h2>
        <div class="contact-grid">
          <a href="https://github.com/bmchun00" class="contact-card">
            <i class="fab fa-github"></i>
            <h3>GitHub (bmchun00)</h3>
            <p>프로젝트와 코드를 확인해보세요</p>
          </a>
          <a href="https://github.com/bmc-00" class="contact-card">
            <i class="fab fa-github"></i>
            <h3>GitHub (bmc-00)</h3>
            <p>프로젝트와 코드를 확인해보세요</p>
          </a>
          <a href="https://solved.ac/bmchun00" class="contact-card">
            <i class="fas fa-code"></i>
            <h3>solved.ac</h3>
            <p>알고리즘 문제 해결 기록</p>
          </a>
        </div>
      </section>
    </main>
  </div>
</template>

<style scoped>
/* 색상 변수 정의 */
:root {
  --primary-color: #6366f1;
  --primary-light: rgba(99, 102, 241, 0.1);
  --primary-gradient: linear-gradient(135deg, #6366f1 0%, #818cf8 100%);
  --bg-light: rgb(248, 248, 252);
  --text-primary: #1e293b;
  --text-secondary: #64748b;
  --shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.03);
  --shadow-md: 0 4px 20px rgba(0, 0, 0, 0.05);
}

.biography-container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem;
}

/* 헤더 섹션 개선 */
.bio-header {
  background: transparent;
  padding: 3rem 1rem;
  margin-bottom: 4rem;
  box-shadow: none;
  animation: scaleIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  opacity: 0;
}

.profile-section {
  display: flex;
  align-items: center;
  gap: 3rem;
}

.profile-image {
  width: 180px;
  height: 180px;
  border-radius: 50%; /* 완전한 원형으로 변경 */
  object-fit: cover;
  border: 3px solid var(--primary-color);
  box-shadow: 0 4px 15px rgba(99, 102, 241, 0.15);
  animation: scaleIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s forwards;
  opacity: 0;
}

.profile-info {
  flex: 1;
}

.name {
  font-size: 42px;
  margin-bottom: 8px;
  background: var(--primary-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: black;
  letter-spacing: -0.02em;
  animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.4s forwards;
  opacity: 0;
}

.tagline {
  font-size: 18px;
  margin-bottom: 32px;
  color: var(--text-secondary);
  margin-bottom: 2rem;
  font-weight: 300;
  animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.6s forwards;
  opacity: 0;
}

.quick-stats {
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  background: transparent;
  border: none;
  box-shadow: none;
  animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  opacity: 0;
}

.stat-item:nth-child(1) { animation-delay: 0.5s; }
.stat-item:nth-child(2) { animation-delay: 0.6s; }
.stat-item:nth-child(3) { animation-delay: 0.7s; }
.stat-item:nth-child(4) { animation-delay: 0.8s; }

.stat-item i {
  color: var(--primary-color);
  font-size: 16px;
}

.stat-item span {
  font-size: 14px;
  color: var(--text-secondary);
  font-weight: 400;
}

/* Timeline 섹션 개선 */
.timeline-section {
  margin: 6rem 0;
  padding: 0 2rem;
}

.timeline::before {
  background: var(--primary-gradient);
  opacity: 0.3;
}

.timeline-item {
  position: relative;
  padding: 2rem 0;
  margin-bottom: 1rem;
  border-bottom: 1px solid rgba(99, 102, 241, 0.2);
}

.timeline-item:last-child {
  border-bottom: none;
}

.timeline-date {
  font-size: 19px;
  font-weight: 600;
  color: var(--primary-color);
  margin-bottom: 1rem;
}

.timeline-content {
  margin-left: 0;
  padding: 0;
}

.timeline-content h3 {
  font-size: 24px;
  color: var(--text-primary);
  margin-bottom: 8px;
}

.timeline-subtitle {
  font-size: 17px;
  color: var(--text-secondary);
  margin-bottom: 16px;
}

.timeline-content p {
  color: var(--text-secondary);
  line-height: 1.8;
  margin: 16px 0;
  font-size: 16px;
}

.achievements {
  margin-top: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.achievement {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  color: var(--text-secondary);
  font-size: 15px;
}

.achievement i {
  color: var(--primary-color);
  font-size: 17px;
}

/* Philosophy 섹션 개선 */
.philosophy-section {
  padding: 2rem;
  margin: 4rem 0;
}

.philosophy-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.philosophy-item {
  background: transparent;
  padding: 2rem;
  border: 1px solid rgba(99, 102, 241, 0.1);
  border-radius: 16px;
}

.philosophy-item i {
  font-size: 28px;
  margin-bottom: 1rem;
  padding: 0.8rem;
}

.philosophy-item h3 {
  font-size: 21px;
  margin-bottom: 12px;
}

.philosophy-item p {
  font-size: 16px;
  line-height: 1.5;
}

/* Projects 섹션 개선 */
.projects-section {
  padding: 2rem;
  margin: 4rem 0;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.project-card {
  background: var(--bg-light);
  border-radius: 24px;
  border: 1px solid rgba(99, 102, 241, 0.1);
  padding: 2rem;
  transition: transform 0.3s ease;
  animation: scaleIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  opacity: 0;
}

.project-card:hover {
  transform: translateY(-5px);
}

.project-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.project-year {
  background: var(--primary-light);
  color: var(--primary-color);
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 14px;
}

.project-desc {
  margin-bottom: 1rem;
  line-height: 1.6;
  font-size: 16px;
}

.project-links {
  display: flex;
  gap: 1rem;
}

.project-links a {
  display: inline-block;
  padding: 0.5rem 1rem;
  background: var(--primary-light);
  color: var(--primary-color);
  border-radius: 20px;
  transition: all 0.3s ease;
  font-weight: 500;
  font-size: 14px;
}

.project-links a:hover {
  background: var(--primary-color);
  color: white;
}

.project-card:nth-child(1) { animation-delay: 0.3s; }
.project-card:nth-child(2) { animation-delay: 0.5s; }

/* Contact 섹션 개선 */
.contact-section {
  padding: 2rem;
  margin: 4rem 0;
}

a {
  color: inherit; 
  text-decoration: none;
}

a:hover,
a:focus,
a:visited {
  color: inherit;
  text-decoration: none; 
}


.contact-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.contact-card {
  background: var(--bg-light);
  border-radius: 24px;
  border: 1px solid rgba(99, 102, 241, 0.1);
  padding: 2.5rem 2rem;
  transition: all 0.3s ease;
  animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  opacity: 0;
}

.contact-card:hover {
  background: white;
  border-color: var(--primary-color);
}

.contact-card i {
  color: var(--primary-color);
  background: var(--primary-light);
  padding: 1rem;
  border-radius: 16px;
  font-size: 32px;
  margin-bottom: 1.5rem;
}

.contact-card h3 {
  font-size: 22px;
  margin-bottom: 0.5rem;
  color: var(--text-title);
}

.contact-card p {
  color: var(--text-secondary);
  line-height: 1.6;
  font-size: 16px;
}

.contact-card:nth-child(1) { animation-delay: 0.4s; }
.contact-card:nth-child(2) { animation-delay: 0.6s; }
.contact-card:nth-child(3) { animation-delay: 0.8s; }

/* 섹션 헤더 개선 */
h2 {
  font-size: 35px;
  letter-spacing: -0.02em;
  color: var(--text-primary);
  margin-bottom: 2.5rem;
  position: relative;
  padding-bottom: 1rem;
  text-align: center;
  animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  opacity: 0;
}

h2::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 4px;
  background: var(--primary-gradient);
  border-radius: 2px;
}

/* 반응형 디자인 개선 */
@media (max-width: 768px) {
  .timeline-section,
  .philosophy-section,
  .projects-section,
  .contact-section {
    padding: 1.5rem;
  }

  .timeline-content {
    padding: 1rem;
  }

  .timeline-item {
    padding: 1.5rem 0;
  }

  .timeline-date {
    font-size: 17px;
  }

  .timeline-content h3 {
    font-size: 21px;
  }

  .timeline-subtitle {
    font-size: 16px;
  }

  .timeline-content p {
    font-size: 15px;
  }

  .profile-section {
    flex-direction: column;
    text-align: center;
  }

  .profile-image {
    width: 150px;
    height: 150px;
  }

  .name {
    font-size: 35px;
  }

  .tagline {
    font-size: 16px;
  }

  .quick-stats {
    justify-content: center;
  }

  .philosophy-content {
    grid-template-columns: 1fr;
  }

  .philosophy-item h3 {
    font-size: 19px;
  }

  .philosophy-item p {
    font-size: 15px;
  }

  h2 {
    font-size: 28px;
  }
}

@media (min-width: 1024px) {
  .philosophy-content {
    grid-template-columns: repeat(3, 1fr);
  }
}

/* 애니메이션 효과 추가 */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.timeline-item, .philosophy-item, .project-card, .contact-card {
  animation: fadeInUp 0.6s ease forwards;
  opacity: 0;
}

.timeline-item:nth-child(n), 
.philosophy-item:nth-child(n), 
.project-card:nth-child(n), 
.contact-card:nth-child(n) {
  animation-delay: calc(n * 0.1s);
}

/* Intersection Observer를 위한 기본 상태 */
.fade-trigger {
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}

.fade-trigger.visible {
  opacity: 1;
  transform: translateY(0);
}
</style>

<script setup>
import { onMounted } from 'vue';

onMounted(() => {
  // Intersection Observer 설정
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.1
  });

  // 관찰할 요소들 선택
  document.querySelectorAll('.fade-trigger').forEach(el => {
    observer.observe(el);
  });
});
</script>


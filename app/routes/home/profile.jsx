import { Button } from '~/components/button';
import { Divider } from '~/components/divider';
import { Section } from '~/components/section';
import { Transition } from '~/components/transition';
import { useState, useEffect, useRef } from 'react';
import styles from './profile.module.css';

const TYPING_LINES = [
  'Building Civic Assist v2 ...',
  'Solving DSA problems ...',
  'Open to collaborations ...',
  'Crafting Android apps ...',
  'Contributing to open source ...',
  'Always learning something new ...',
];

function LiveTypingCard({ visible }) {
  const [displayed, setDisplayed] = useState('');
  const [lineIdx, setLineIdx] = useState(0);
  const [typing, setTyping] = useState(true);
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (!visible) return;
    const target = TYPING_LINES[lineIdx];
    if (typing) {
      if (displayed.length < target.length) {
        timeoutRef.current = setTimeout(
          () => setDisplayed(target.slice(0, displayed.length + 1)), 52
        );
      } else {
        timeoutRef.current = setTimeout(() => setTyping(false), 1800);
      }
    } else {
      if (displayed.length > 0) {
        timeoutRef.current = setTimeout(
          () => setDisplayed(displayed.slice(0, -1)), 30
        );
      } else {
        setLineIdx(i => (i + 1) % TYPING_LINES.length);
        setTyping(true);
      }
    }
    return () => clearTimeout(timeoutRef.current);
  }, [visible, displayed, typing, lineIdx]);

  return (
    <div className={styles.typingCard}>
      <span className={styles.typingPrompt}>~</span>
      <span className={styles.typingText}>{displayed}</span>
      <span className={styles.typingCursor} />
    </div>
  );
}

const education = [
  {
    degree: 'B.E. Computer Engineering',
    institute: 'Dr. D. Y. Patil Institute of Technology, Pune',
    period: 'Aug 2023 – June 2027',
    score: '9.74 / 10',
    scoreLabel: 'CGPA',
    icon: '🎓',
  },
  {
    degree: 'HSC — Science (Class XII)',
    institute: 'SGJC Korhale, Shirdi',
    period: '2023',
    score: '84.17%',
    scoreLabel: 'Percentage',
    icon: '📘',
  },
  {
    degree: 'SSC (Class X)',
    institute: 'CSV Kolpewadi',
    period: '2021',
    score: '84.20%',
    scoreLabel: 'Percentage',
    icon: '📗',
  },
];

const achievements = [
  { value: '1800+', label: 'LeetCode Rating', icon: '⚡' },
  { value: '700+', label: 'DSA Problems', icon: '🧠' },
  { value: '290', label: 'Day Streak', icon: '🔥' },
  { value: '10/10', label: 'SGPA — Rank 1', icon: '🏅' },
];

const honours = [
  {
    emoji: '🥉',
    title: '2nd Runner-up',
    desc: 'National 48-Hour Hackathon · Amity University Mumbai',
  },
  {
    emoji: '🥇',
    title: '1st Place',
    desc: 'Civic Assist Platform · 1st among 550+ teams, College Competition',
  },
];

const certificates = [
  {
    title: 'The Complete Android 14 & Kotlin Development Masterclass',
    issuer: 'Udemy',
    date: 'Oct 2025',
    duration: '66.5 hours',
    badge: '📱',
    accentColor: '#a435f0',
    image: '/cert-udemy-android.jpg',
  },
  {
    title: 'Full Stack Web Development',
    issuer: 'Apna College',
    date: '2024',
    duration: 'Alpha DSA with Java',
    badge: '🌐',
    accentColor: '#f0a500',
    image: '/cert-apna-college.png',
  },
  {
    title: 'Decode C++ with DSA Course',
    issuer: 'Physics Wallah',
    date: 'Apr 2025',
    duration: "June '24 Program",
    badge: '🧩',
    accentColor: '#ff6b00',
    image: '/cert-pw-dsa.jpg',
  },
];

export const Profile = ({ id, visible, sectionRef }) => {
  const [focused, setFocused] = useState(false);
  const titleId = `${id}-title`;

  return (
    <Section
      className={styles.profile}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      as="section"
      id={id}
      ref={sectionRef}
      aria-labelledby={titleId}
      tabIndex={-1}
    >
      <Transition in={visible || focused} timeout={1500}>
        {({ visible: vis, nodeRef }) => (
          <div className={styles.profileWrapper} ref={nodeRef}>

            {/* BLOCK 1 — Intro 2-col */}
            <div className={styles.introGrid}>
              <div className={styles.introLeft}>
                <div className={styles.introTag}>
                  <Divider notchWidth="64px" notchHeight="8px" collapsed={!vis} collapseDelay={1000} />
                  <span className={styles.introTagText} data-visible={vis}>About me</span>
                </div>
                <h2 className={styles.introHeading} id={titleId} data-visible={vis}>
                  A passionate Full Stack Web &amp; Android Developer from Maharashtra, India.
                </h2>
                <p className={styles.introBio} data-visible={vis}>
                  I build fast, scalable web apps and polished Android experiences — and I love
                  solving hard problems through competitive programming and open-source work.
                </p>
                <ul className={styles.introBullets} data-visible={vis}>
                  <li>🚀 Currently pursuing B.E. Computer Engineering with <strong>9.74 CGPA</strong></li>
                  <li>💡 Technical Head · led cross-functional teams on full-stack products</li>
                  <li>🏆 Hackathon winner &amp; top DSA performer with <strong>1800+ LeetCode rating</strong></li>
                </ul>
                <LiveTypingCard visible={vis} />
              </div>

              <div className={styles.introRight} data-visible={vis}>
                <div className={styles.photoWrap}>
                  <img
                    src="/profile.jpg"
                    alt="Aniket Adhav — Full Stack Web and Android Developer"
                    className={styles.photo}
                  />
                  <div className={styles.photoBadge}>
                    <span className={styles.photoBadgeName}>Aniket Adhav</span>
                    <span className={styles.photoBadgeRole}>Full Stack &amp; Android Dev</span>
                  </div>
                </div>
              </div>
            </div>

            {/* BLOCK 2 — Education */}
            <div className={styles.block} data-visible={vis}>
              <h3 className={styles.blockHeading}>🎓 Education</h3>
              <div className={styles.eduGrid}>
                {education.map((e, i) => (
                  <div key={i} className={styles.eduCard} style={{ '--delay': `${i * 80}ms` }}>
                    <span className={styles.eduIcon}>{e.icon}</span>
                    <div className={styles.eduScore}>
                      <span className={styles.eduScoreValue}>{e.score}</span>
                      <span className={styles.eduScoreLabel}>{e.scoreLabel}</span>
                    </div>
                    <p className={styles.eduDegree}>{e.degree}</p>
                    <p className={styles.eduInstitute}>{e.institute}</p>
                    <p className={styles.eduPeriod}>{e.period}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* BLOCK 3 — Achievements */}
            <div className={styles.block} data-visible={vis}>
              <h3 className={styles.blockHeading}>🏆 Achievements</h3>
              <div className={styles.statsGrid}>
                {achievements.map((a, i) => (
                  <div key={i} className={styles.statCard} style={{ '--delay': `${i * 60}ms` }}>
                    <span className={styles.statIcon}>{a.icon}</span>
                    <span className={styles.statValue}>{a.value}</span>
                    <span className={styles.statLabel}>{a.label}</span>
                  </div>
                ))}
              </div>
              <div className={styles.honoursGrid}>
                {honours.map((h, i) => (
                  <div key={i} className={styles.honourCard}>
                    <span className={styles.honourEmoji}>{h.emoji}</span>
                    <div>
                      <p className={styles.honourTitle}>{h.title}</p>
                      <p className={styles.honourDesc}>{h.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* BLOCK 4 — Certificates */}
            <div className={styles.block} data-visible={vis}>
              <h3 className={styles.blockHeading}>🎖️ Certificates</h3>
              <div className={styles.certGrid}>
                {certificates.map((c, i) => (
                  <div
                    key={i}
                    className={styles.certCard}
                    style={{ '--accent': c.accentColor, '--delay': `${i * 80}ms` }}
                  >
                    <img src={c.image} alt={c.title} className={styles.certImage} loading="lazy" />
                    <div className={styles.certMeta}>
                      <span className={styles.certBadge}>{c.badge}</span>
                      <span className={styles.certIssuer}>{c.issuer}</span>
                      <span className={styles.certDate}>{c.date}</span>
                    </div>
                    <p className={styles.certTitle}>{c.title}</p>
                    <p className={styles.certDuration}>{c.duration}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}
      </Transition>
    </Section>
  );
};

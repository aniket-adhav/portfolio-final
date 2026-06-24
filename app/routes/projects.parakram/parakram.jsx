import parakramHero from '~/assets/parakram-screenshot.png';
import parakramJersey from '~/assets/parakram-jersey.png';
import parakramChampions from '~/assets/parakram-champions.png';
import parakramSports from '~/assets/parakram-sports.png';
import { Footer } from '~/components/footer';
import { Button } from '~/components/button';
import { Image } from '~/components/image';
import {
  ProjectContainer,
  ProjectSection,
  ProjectSectionColumns,
  ProjectSectionContent,
  ProjectSectionHeading,
  ProjectSectionText,
  ProjectTextRow,
} from '~/layouts/project';
import { baseMeta } from '~/utils/meta';
import { Fragment } from 'react';
import { Link } from '@remix-run/react';
import styles from './parakram.module.css';

const title = 'Parakram — Sports Event Platform';
const description =
  'A full-stack sports event management platform serving 1500+ users with Google OAuth authentication, QR-based payments, jersey validation, and real-time admin workflows.';

export const meta = () => {
  return baseMeta({ title, description, prefix: 'Project' });
};

export function Parakram() {
  return (
    <Fragment>
      <ProjectContainer className={styles.parakram}>

        <div className={styles.backRow}>
          <Link to="/#project-3" className={styles.backLink}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Back to projects
          </Link>
        </div>

        <header className={styles.header}>
          <div className={styles.headerContent}>
            <div className={styles.headerText}>
              <div className={styles.tag}>Full Stack · Web App · Event Platform</div>
              <h1 className={styles.title}>{title}</h1>
              <p className={styles.description}>{description}</p>
              <div className={styles.headerButtons}>
                <Button
                  iconHoverShift
                  iconEnd="arrow-right"
                  href="https://www.parakram.site"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Live Demo
                </Button>
                <Button
                  iconHoverShift
                  iconEnd="arrow-right"
                  href="https://github.com/aniket-adhav/parakram-web"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub Repo
                </Button>
              </div>
            </div>
            <ul className={styles.techList}>
              <li className={styles.techLabel}>Tech Stack</li>
              {[
                'React.js',
                'Node.js',
                'MongoDB Atlas',
                'Google OAuth',
                'Framer Motion',
                'Vercel',
                'Email Services',
                'QR Payments',
              ].map(tech => (
                <li key={tech} className={styles.techItem}>{tech}</li>
              ))}
            </ul>
          </div>
        </header>

        <ProjectSection padding="top" className={styles.heroSection}>
          <ProjectSectionContent data-width="xl">
            <div className={styles.heroImageWrap}>
              <Image
                src={parakramHero}
                width={1280}
                height={720}
                alt="Parakram sports event platform homepage showing countdown timer and event registration"
                sizes="(max-width: 768px) 100vw, 90vw"
                className={styles.heroImage}
              />
              <div className={styles.imageCaption}>
                Homepage — College Sports Fest 2026 with countdown timer and event navigation
              </div>
            </div>
          </ProjectSectionContent>
        </ProjectSection>

        <ProjectSection>
          <ProjectSectionColumns centered className={styles.overviewColumns}>
            <div className={styles.overviewText}>
              <ProjectSectionHeading>The Challenge</ProjectSectionHeading>
              <ProjectSectionText>
                Managing a college sports fest with 1500+ participants meant dealing
                with fragile spreadsheet-based registrations, manual payment tracking,
                and zero anti-cheating safeguards — resulting in duplicate registrations
                and revenue loss.
              </ProjectSectionText>
              <ProjectSectionText>
                Parakram replaced this chaos with a unified digital platform: secure
                login via Google OAuth, instant QR payment verification, jersey
                validation tied to secret codes, and a live admin dashboard to
                oversee every registration in real time.
              </ProjectSectionText>
            </div>
            <div className={styles.statsColumn}>
              {[
                { value: '1500+', label: 'Users Served' },
                { value: 'QR', label: 'Payment System' },
                { value: 'OAuth', label: 'Secure Auth' },
                { value: 'Live', label: 'Admin Dashboard' },
              ].map(stat => (
                <div key={stat.label} className={styles.statCard}>
                  <span className={styles.statValue}>{stat.value}</span>
                  <span className={styles.statLabel}>{stat.label}</span>
                </div>
              ))}
            </div>
          </ProjectSectionColumns>
        </ProjectSection>

        <ProjectSection light>
          <ProjectSectionContent>
            <ProjectTextRow>
              <ProjectSectionHeading>Key Features</ProjectSectionHeading>
              <ProjectSectionText>
                Built around three pillars — secure access, fair play, and seamless
                administration — each feature was designed to eliminate a real pain
                point from traditional event management.
              </ProjectSectionText>
            </ProjectTextRow>

            <div className={styles.featureGrid}>
              {[
                {
                  icon: '🔐',
                  title: 'Google OAuth',
                  desc: 'Secure single-click login via Google. No passwords to manage, no fake accounts — every registration is tied to a verified Google identity.',
                },
                {
                  icon: '📱',
                  title: 'QR Payment System',
                  desc: 'Students scan a QR code to pay, then submit proof. Admins verify and approve payments through a dedicated dashboard before access is granted.',
                },
                {
                  icon: '👕',
                  title: 'Jersey Validation',
                  desc: 'Anti-cheating logic using secret codes tied to jersey numbers. Only valid code holders can complete registration for their sport.',
                },
                {
                  icon: '🛡️',
                  title: 'Anti-Cheat Logic',
                  desc: 'Server-side validation prevents duplicate registrations, reuse of secret codes, and manipulation of payment status.',
                },
                {
                  icon: '📊',
                  title: 'Admin Dashboard',
                  desc: 'Real-time view of all registrations, payment statuses, sport-wise headcounts, and order management — all in one place.',
                },
                {
                  icon: '🚀',
                  title: 'Production Deploy',
                  desc: 'Deployed on Vercel with a custom domain, MongoDB Atlas for cloud data storage, and email services for confirmation notifications.',
                },
              ].map(f => (
                <div key={f.title} className={styles.featureCard}>
                  <span className={styles.featureIcon}>{f.icon}</span>
                  <h3 className={styles.featureTitle}>{f.title}</h3>
                  <p className={styles.featureDesc}>{f.desc}</p>
                </div>
              ))}
            </div>
          </ProjectSectionContent>
        </ProjectSection>

        <ProjectSection>
          <ProjectSectionContent>
            <ProjectTextRow>
              <ProjectSectionHeading>Screenshots</ProjectSectionHeading>
              <ProjectSectionText>
                A closer look at the platform's key screens — jersey registration,
                championship standings, and the sports showcase.
              </ProjectSectionText>
            </ProjectTextRow>
            <div className={styles.screenshotGrid}>
              <div className={styles.screenshotItem}>
                <Image
                  src={parakramJersey}
                  width={1280}
                  height={720}
                  alt="Parakram jersey registration page"
                  sizes="(max-width: 768px) 100vw, 60vw"
                  className={styles.screenshotImage}
                />
                <p className={styles.screenshotCaption}>Jersey Registration — Get your official event jersey</p>
              </div>
              <div className={styles.screenshotItem}>
                <Image
                  src={parakramChampions}
                  width={1280}
                  height={720}
                  alt="Parakram general championship hall of fame"
                  sizes="(max-width: 768px) 100vw, 60vw"
                  className={styles.screenshotImage}
                />
                <p className={styles.screenshotCaption}>Hall of Fame — General Championship results and department standings</p>
              </div>
              <div className={styles.screenshotItem}>
                <Image
                  src={parakramSports}
                  width={1280}
                  height={720}
                  alt="Parakram sports showcase listing all available sports"
                  sizes="(max-width: 768px) 100vw, 60vw"
                  className={styles.screenshotImage}
                />
                <p className={styles.screenshotCaption}>Sports Showcase — Browse and register for cricket, football, badminton, kabaddi and more</p>
              </div>
            </div>
          </ProjectSectionContent>
        </ProjectSection>

        <ProjectSection className={styles.ctaSection}>
          <ProjectSectionContent>
            <ProjectTextRow center>
              <ProjectSectionHeading>See it live</ProjectSectionHeading>
              <ProjectSectionText>
                Parakram is live at parakram.site. Explore the event portal,
                browse sports, and see the full registration flow in action.
              </ProjectSectionText>
              <div className={styles.ctaButtons}>
                <Button
                  iconHoverShift
                  iconEnd="arrow-right"
                  href="https://www.parakram.site"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Visit parakram.site
                </Button>
                <Button
                  iconHoverShift
                  iconEnd="arrow-right"
                  href="https://github.com/aniket-adhav/parakram-web"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Source Code
                </Button>
              </div>
            </ProjectTextRow>
          </ProjectSectionContent>
        </ProjectSection>

      </ProjectContainer>
      <Footer />
    </Fragment>
  );
}

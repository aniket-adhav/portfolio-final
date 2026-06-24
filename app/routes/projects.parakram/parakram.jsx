import parakramScreenshot from '~/assets/parakram-screenshot.png';
import parakramScreenshotLarge from '~/assets/parakram-screenshot-large.png';
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
  'A full-stack sports event management platform serving 1500+ registered users, featuring Google OAuth, QR-based payment verification, jersey validation, and real-time admin workflows.';

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
              <div className={styles.tag}>Full Stack · Sports Platform</div>
              <h1 className={styles.title}>{title}</h1>
              <p className={styles.description}>{description}</p>
              <div className={styles.headerButtons}>
                <Button
                  iconHoverShift
                  iconEnd="arrow-right"
                  href="https://github.com/aniket-adhav/parakram"
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
                'Tailwind CSS',
                'Node.js / Express',
                'MongoDB',
                'Google OAuth 2.0',
                'JWT',
                'UPI QR Payments',
                'Vercel + Render',
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
                src={parakramScreenshot}
                width={1280}
                height={800}
                alt="Parakram sports event platform landing page showing sports categories and registration"
                sizes="(max-width: 768px) 100vw, 90vw"
                className={styles.heroImage}
              />
              <div className={styles.imageCaption}>
                Parakram Platform — Sports event registration and management for 1500+ athletes
              </div>
            </div>
          </ProjectSectionContent>
        </ProjectSection>

        <ProjectSection>
          <ProjectSectionColumns centered className={styles.overviewColumns}>
            <div className={styles.overviewText}>
              <ProjectSectionHeading>About Parakram</ProjectSectionHeading>
              <ProjectSectionText>
                Parakram is a comprehensive sports event management platform built for a
                large-scale college sports meet. The platform managed the entire event
                lifecycle — from athlete registration and team formation to payment
                verification and results tracking.
              </ProjectSectionText>
              <ProjectSectionText>
                With <strong>1500+ registered users</strong> across 20+ sports, Parakram
                replaced manual spreadsheet workflows with a real-time, auditable digital
                system, reducing registration errors and admin overhead by over 80%.
              </ProjectSectionText>
            </div>
            <div className={styles.statsColumn}>
              {[
                { value: '1500+', label: 'Registered Users' },
                { value: '20+', label: 'Sports Events' },
                { value: '80%', label: 'Admin Time Saved' },
                { value: '3', label: 'User Portals' },
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
            </ProjectTextRow>
            <div className={styles.featureGrid}>
              {[
                {
                  icon: '🔐',
                  title: 'Google OAuth',
                  desc: 'Secure, one-click login via Google OAuth 2.0 — no passwords to manage for 1500+ participants.',
                },
                {
                  icon: '📱',
                  title: 'QR-Based Payments',
                  desc: 'UPI QR code generation for each registration. Admin scans to verify payment in real time.',
                },
                {
                  icon: '👕',
                  title: 'Jersey Validation',
                  desc: 'Unique jersey number assignment with validation to prevent duplicates across teams and sports.',
                },
                {
                  icon: '🏟️',
                  title: 'Multi-Sport Management',
                  desc: '20+ sports events managed from a single admin dashboard with category and team-size support.',
                },
                {
                  icon: '📊',
                  title: 'Real-Time Admin Panel',
                  desc: 'Live overview of registrations, payments, sport-wise participation counts, and approval queues.',
                },
                {
                  icon: '🏆',
                  title: 'Results & Rankings',
                  desc: 'Per-sport result entry and leaderboard display for participants to track their standing.',
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
          <ProjectSectionContent data-width="xl">
            <ProjectTextRow>
              <ProjectSectionHeading>Event Gallery</ProjectSectionHeading>
              <ProjectSectionText>
                From jersey assignment to champion celebrations — Parakram handled every
                aspect of the sports event with a seamless digital experience.
              </ProjectSectionText>
            </ProjectTextRow>
            <div className={styles.screenshotGrid}>
              <div className={styles.screenshotItem}>
                <Image
                  src={parakramJersey}
                  width={1280}
                  height={800}
                  alt="Jersey validation system showing unique number assignment interface"
                  sizes="(max-width: 768px) 100vw, 90vw"
                  className={styles.screenshotImage}
                />
                <p className={styles.screenshotCaption}>
                  Jersey Validation — Unique number assignment with duplicate prevention
                </p>
              </div>
              <div className={styles.screenshotItem}>
                <Image
                  src={parakramChampions}
                  width={1280}
                  height={800}
                  alt="Parakram champions leaderboard showing sport-wise winners"
                  sizes="(max-width: 768px) 100vw, 90vw"
                  className={styles.screenshotImage}
                />
                <p className={styles.screenshotCaption}>
                  Champions — Sport-wise winners and results leaderboard
                </p>
              </div>
              <div className={styles.screenshotItem}>
                <Image
                  src={parakramSports}
                  width={1280}
                  height={800}
                  alt="Sports selection page showing 20+ available sports events"
                  sizes="(max-width: 768px) 100vw, 90vw"
                  className={styles.screenshotImage}
                />
                <p className={styles.screenshotCaption}>
                  Sports Selection — 20+ events available for athlete registration
                </p>
              </div>
            </div>
          </ProjectSectionContent>
        </ProjectSection>

        <ProjectSection className={styles.ctaSection}>
          <ProjectSectionContent>
            <ProjectTextRow center>
              <ProjectSectionHeading>View the source</ProjectSectionHeading>
              <ProjectSectionText>
                Parakram is open source. Browse the full-stack codebase on GitHub.
              </ProjectSectionText>
              <div className={styles.ctaButtons}>
                <Button
                  iconHoverShift
                  iconEnd="arrow-right"
                  href="https://github.com/aniket-adhav/parakram"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View on GitHub
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

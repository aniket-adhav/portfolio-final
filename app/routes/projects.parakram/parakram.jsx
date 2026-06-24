import parakramScreenshot from '~/assets/parakram-screenshot.png';
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
        <ProjectSection padding="none" className={styles.hero}>
          <ProjectSectionContent>
            <div className={styles.heroBack}>
              <Button secondary iconHoverShift icon="arrow-left" as={Link} to="/#project-3">
                Back to projects
              </Button>
            </div>
            <Image
              srcSet={`${parakramScreenshot} 1280w`}
              width={1280}
              height={800}
              placeholder={parakramScreenshot}
              alt="Parakram sports event platform landing page"
              sizes="100vw"
              className={styles.heroImage}
            />
          </ProjectSectionContent>
        </ProjectSection>

        <ProjectSection>
          <ProjectTextRow>
            <ProjectSectionHeading>About Parakram</ProjectSectionHeading>
            <ProjectSectionText>
              Parakram is a comprehensive sports event management platform built for a large-scale
              college sports meet. The platform managed the entire event lifecycle — from athlete
              registration and team formation to payment verification and results tracking.
            </ProjectSectionText>
            <ProjectSectionText>
              With <strong>1500+ registered users</strong> across 20+ sports, Parakram replaced
              manual spreadsheet workflows with a real-time, auditable digital system, reducing
              registration errors and admin overhead by over 80%.
            </ProjectSectionText>
          </ProjectTextRow>
        </ProjectSection>

        <ProjectSection light>
          <ProjectSectionColumns>
            <div>
              <Image
                srcSet={`${parakramJersey} 800w`}
                width={800}
                height={500}
                placeholder={parakramJersey}
                alt="Jersey validation system in Parakram"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className={styles.featureList}>
              <ProjectSectionHeading>Key Features</ProjectSectionHeading>
              {[
                { icon: '🔐', title: 'Google OAuth', desc: 'Secure, one-click login via Google OAuth 2.0 — no passwords to manage for 1500+ participants.' },
                { icon: '📱', title: 'QR-Based Payments', desc: 'UPI QR code generation for each registration. Admin scans to verify payment in real time.' },
                { icon: '👕', title: 'Jersey Validation', desc: 'Unique jersey number assignment system with validation to prevent duplicates across teams and sports.' },
                { icon: '🏟️', title: 'Multi-Sport Management', desc: '20+ sports events managed from a single admin dashboard with category and team-size support.' },
                { icon: '📊', title: 'Real-Time Admin Panel', desc: 'Live overview of registrations, payments, sport-wise participation counts, and approval queues.' },
              ].map((f, i) => (
                <div key={i} className={styles.featureItem}>
                  <span className={styles.featureIcon}>{f.icon}</span>
                  <div>
                    <strong>{f.title}</strong>
                    <p>{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </ProjectSectionColumns>
        </ProjectSection>

        <ProjectSection>
          <ProjectSectionColumns>
            <div className={styles.techStack}>
              <ProjectSectionHeading>Tech Stack</ProjectSectionHeading>
              {[
                { label: 'Frontend', value: 'React.js + Tailwind CSS' },
                { label: 'Backend', value: 'Node.js + Express.js' },
                { label: 'Database', value: 'MongoDB + Mongoose' },
                { label: 'Auth', value: 'Google OAuth 2.0 + JWT' },
                { label: 'Payments', value: 'UPI QR Code generation' },
                { label: 'Deploy', value: 'Vercel + Render' },
              ].map((t, i) => (
                <div key={i} className={styles.techRow}>
                  <span className={styles.techLabel}>{t.label}</span>
                  <span className={styles.techValue}>{t.value}</span>
                </div>
              ))}
              <div className={styles.statRow}>
                <div className={styles.stat}><span className={styles.statNum}>1500+</span><span className={styles.statLbl}>Registered Users</span></div>
                <div className={styles.stat}><span className={styles.statNum}>20+</span><span className={styles.statLbl}>Sports Events</span></div>
                <div className={styles.stat}><span className={styles.statNum}>80%</span><span className={styles.statLbl}>Admin Time Saved</span></div>
              </div>
            </div>
            <div>
              <Image
                srcSet={`${parakramSports} 800w`}
                width={800}
                height={500}
                placeholder={parakramSports}
                alt="Parakram sports selection and event listing"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </ProjectSectionColumns>
        </ProjectSection>

        <ProjectSection light>
          <ProjectTextRow center>
            <ProjectSectionHeading>View the source</ProjectSectionHeading>
            <ProjectSectionText>
              Parakram is open source. Browse the full-stack codebase on GitHub.
            </ProjectSectionText>
            <Button
              secondary
              iconHoverShift
              icon="github"
              href="https://github.com/aniket-adhav/parakram"
              target="_blank"
              rel="noopener noreferrer"
            >
              View on GitHub
            </Button>
          </ProjectTextRow>
        </ProjectSection>
      </ProjectContainer>
      <Footer />
    </Fragment>
  );
}

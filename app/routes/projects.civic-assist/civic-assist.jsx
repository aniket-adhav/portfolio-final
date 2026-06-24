import civicCommunityFeed from '~/assets/civic-community-feed.png';
import civicAdminDashboard from '~/assets/civic-admin-dashboard.png';
import civicAdminLogin from '~/assets/civic-admin-login.png';
import civicLeaderboard from '~/assets/civic-leaderboard.png';
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
import styles from './civic-assist.module.css';

const title = 'Civic Assist Platform';
const description =
  'A full-stack civic issue reporting platform that empowers citizens to report local problems with image upload, geolocation tagging, and community-driven prioritization through upvotes.';

export const meta = () => {
  return baseMeta({ title, description, prefix: 'Project' });
};

export function CivicAssist() {
  return (
    <Fragment>
      <ProjectContainer className={styles.civicAssist}>
        <ProjectSection padding="none" className={styles.hero}>
          <ProjectSectionContent>
            <div className={styles.heroBack}>
              <Button secondary iconHoverShift icon="arrow-left" as={Link} to="/#project-1">
                Back to projects
              </Button>
            </div>
            <Image
              srcSet={`${civicCommunityFeed} 1280w`}
              width={1280}
              height={800}
              placeholder={civicCommunityFeed}
              alt="Civic Assist community feed showing trending civic issues"
              sizes="100vw"
              className={styles.heroImage}
            />
            <p className={styles.heroCaption}>
              Community Feed — Browse and upvote civic issues in your neighbourhood
            </p>
          </ProjectSectionContent>
        </ProjectSection>

        <ProjectSection>
          <ProjectTextRow>
            <ProjectSectionHeading>The Problem</ProjectSectionHeading>
            <ProjectSectionText>
              Citizens often struggle to report local civic issues — potholes, garbage overflow,
              broken streetlights — to the right authorities. Reports get lost in WhatsApp groups
              or lengthy bureaucratic channels with no accountability or follow-up.
            </ProjectSectionText>
            <ProjectSectionText>
              Civic Assist bridges this gap by providing a unified platform where citizens can
              report issues with photo evidence and GPS coordinates, while the community upvotes
              the most critical problems to ensure they get resolved first.
            </ProjectSectionText>
          </ProjectTextRow>
        </ProjectSection>

        <ProjectSection light>
          <ProjectSectionColumns>
            <div>
              <Image
                srcSet={`${civicAdminDashboard} 800w`}
                width={800}
                height={500}
                placeholder={civicAdminDashboard}
                alt="Admin dashboard showing complaint statistics and AI classification"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <p className={styles.imageCaption}>
                Admin Dashboard — Real-time complaint tracking with AI-powered spam detection
              </p>
            </div>
            <div className={styles.featureList}>
              <ProjectSectionHeading>Key Features</ProjectSectionHeading>
              <ProjectSectionText>
                Civic Assist is designed around three core user groups — citizens, government
                officers, and administrators — each with a tailored experience that makes issue
                resolution faster and more transparent.
              </ProjectSectionText>
              {[
                {
                  icon: '📍',
                  title: 'Geotagged Reports',
                  desc: 'Citizens pin issues on an interactive Leaflet map. Heatmaps show high-density problem zones at a glance.',
                },
                {
                  icon: '🗳️',
                  title: 'Community Upvoting',
                  desc: 'The most-upvoted issues rise to the top, ensuring the worst problems are tackled first by authorities.',
                },
                {
                  icon: '🤖',
                  title: 'AI Spam Detection',
                  desc: 'A machine learning model filters fake or duplicate reports, keeping the complaint data clean and reliable.',
                },
                {
                  icon: '📊',
                  title: 'Live Analytics',
                  desc: 'Admin dashboard shows resolution rates, complaint trends, and officer performance in real time.',
                },
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
                { label: 'Frontend', value: 'React.js + Tailwind CSS + Leaflet.js' },
                { label: 'Backend', value: 'Node.js + Express.js + REST APIs' },
                { label: 'Database', value: 'MongoDB Atlas + Mongoose ODM' },
                { label: 'Auth', value: 'JWT + bcrypt' },
                { label: 'Storage', value: 'Cloudinary (image uploads)' },
                { label: 'AI/ML', value: 'Python FastAPI + scikit-learn (spam detection)' },
                { label: 'Maps', value: 'Leaflet.js + OpenStreetMap' },
                { label: 'Deploy', value: 'Vercel (frontend) + Render (backend)' },
              ].map((t, i) => (
                <div key={i} className={styles.techRow}>
                  <span className={styles.techLabel}>{t.label}</span>
                  <span className={styles.techValue}>{t.value}</span>
                </div>
              ))}
            </div>
            <div>
              <Image
                srcSet={`${civicLeaderboard} 800w`}
                width={800}
                height={500}
                placeholder={civicLeaderboard}
                alt="Civic leaderboard showing top reporters and resolved issues"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </ProjectSectionColumns>
        </ProjectSection>

        <ProjectSection light>
          <ProjectTextRow center>
            <ProjectSectionHeading>🏆 Achievement</ProjectSectionHeading>
            <ProjectSectionText>
              Civic Assist secured <strong>1st place among 550+ competing teams</strong> in a
              college-level project competition. The platform demonstrated real-world impact and
              received praise for its AI spam-detection accuracy and UX clarity.
            </ProjectSectionText>
            <Button
              secondary
              iconHoverShift
              icon="github"
              href="https://github.com/aniket-adhav/civic-assist"
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

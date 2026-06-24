import moviesHeroImg from '~/assets/movieshouse-screenshot.png';
import moviesListImg from '~/assets/movieshouse-screenshot2.png';
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
import styles from './movies-house.module.css';

const title = 'Movies House — Android Movie Discovery App';
const description =
  'A feature-rich Android movie discovery app built with Jetpack Compose and MVVM architecture, integrating the TMDB API for real-time movie data, offline-first caching with Room DB, and detailed UI screens with cast info and recommendations.';

export const meta = () => {
  return baseMeta({ title, description, prefix: 'Project' });
};

export function MoviesHouse() {
  return (
    <Fragment>
      <ProjectContainer className={styles.moviesHouse}>

        <div className={styles.backRow}>
          <Link to="/#project-2" className={styles.backLink}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Back to projects
          </Link>
        </div>

        <header className={styles.header}>
          <div className={styles.headerContent}>
            <div className={styles.headerText}>
              <div className={styles.tag}>Android · Kotlin · Jetpack Compose</div>
              <h1 className={styles.title}>{title}</h1>
              <p className={styles.description}>{description}</p>
              <div className={styles.headerButtons}>
                <Button
                  iconHoverShift
                  iconEnd="arrow-right"
                  href="https://github.com/aniket-adhav/MoviesHouse"
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
                'Kotlin',
                'Jetpack Compose',
                'MVVM + Hilt',
                'Retrofit',
                'Room DB',
                'Paging 3',
                'Coil',
                'TMDB API',
              ].map(tech => (
                <li key={tech} className={styles.techItem}>{tech}</li>
              ))}
            </ul>
          </div>
        </header>

        <ProjectSection padding="top" className={styles.heroSection}>
          <ProjectSectionContent>
            <div className={styles.phoneShowcase}>
              <div className={styles.phoneWrap}>
                <Image
                  src={moviesHeroImg}
                  width={375}
                  height={812}
                  alt="Movies House home screen showing trending movies"
                  sizes="(max-width: 480px) 90vw, 375px"
                  className={styles.phoneImg}
                />
              </div>
              <div className={styles.phoneWrap}>
                <Image
                  src={moviesListImg}
                  width={375}
                  height={812}
                  alt="Movies House detail screen with cast and recommendations"
                  sizes="(max-width: 480px) 90vw, 375px"
                  className={styles.phoneImg}
                />
              </div>
            </div>
          </ProjectSectionContent>
        </ProjectSection>

        <ProjectSection>
          <ProjectTextRow>
            <ProjectSectionHeading>Overview</ProjectSectionHeading>
            <ProjectSectionText>
              Movies House is a clean, performant Android application that lets users browse
              trending movies, search titles, view detailed information including cast info
              and trailers, and save favourites — all working seamlessly even when offline.
            </ProjectSectionText>
            <ProjectSectionText>
              Built entirely in Kotlin with Jetpack Compose for the UI layer, it follows the
              MVVM architecture pattern with Hilt dependency injection and integrates TMDB API
              for live movie metadata.
            </ProjectSectionText>
          </ProjectTextRow>
        </ProjectSection>

        <ProjectSection light>
          <ProjectSectionContent>
            <ProjectTextRow>
              <ProjectSectionHeading>Key Features</ProjectSectionHeading>
            </ProjectTextRow>
            <div className={styles.featureGrid}>
              {[
                { icon: '🎬', title: 'Real-time Movie Data', desc: 'Live data from TMDB API — trending, top-rated, upcoming, and now-playing categories.' },
                { icon: '💾', title: 'Offline-First with Room DB', desc: 'Paging 3 + Room DB caches all loaded data so the app works flawlessly without an internet connection.' },
                { icon: '🔍', title: 'Instant Search', desc: "Debounced live search across TMDB's entire movie catalogue, with results paginated for performance." },
                { icon: '❤️', title: 'Favourites List', desc: "Add any movie to your local favourites — persisted in Room DB and accessible offline." },
                { icon: '🖼️', title: 'Coil Image Loading', desc: 'Optimised image loading with Coil, including crossfade animations and placeholder support.' },
                { icon: '🏗️', title: 'Clean Architecture', desc: 'MVVM + Repository pattern + Hilt DI keeps the codebase modular, testable, and maintainable.' },
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

        <ProjectSection className={styles.ctaSection}>
          <ProjectSectionContent>
            <ProjectTextRow center>
              <ProjectSectionHeading>View the source</ProjectSectionHeading>
              <ProjectSectionText>
                Movies House is open source. Explore the architecture, browse the code, or clone
                and run it locally on Android Studio.
              </ProjectSectionText>
              <div className={styles.ctaButtons}>
                <Button
                  iconHoverShift
                  iconEnd="arrow-right"
                  href="https://github.com/aniket-adhav/MoviesHouse"
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

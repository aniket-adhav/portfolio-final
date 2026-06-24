import moviesHouseScreenshot from '~/assets/movieshouse-screenshot.png';
import moviesHouseScreenshot2 from '~/assets/movieshouse-screenshot2.png';
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

const title = 'Movies House';
const description =
  'A feature-rich Android movie discovery app built with Kotlin and Jetpack Compose, integrating the TMDB API for real-time movie data with offline-first caching via Room DB.';

export const meta = () => {
  return baseMeta({ title, description, prefix: 'Project' });
};

export function MoviesHouse() {
  return (
    <Fragment>
      <ProjectContainer className={styles.moviesHouse}>
        <ProjectSection padding="none" className={styles.hero}>
          <ProjectSectionContent>
            <div className={styles.heroBack}>
              <Button secondary iconHoverShift icon="arrow-left" as={Link} to="/#project-2">
                Back to projects
              </Button>
            </div>
            <div className={styles.phoneRow}>
              <Image
                srcSet={`${moviesHouseScreenshot} 375w`}
                width={375}
                height={812}
                placeholder={moviesHouseScreenshot}
                alt="Movies House home screen"
                sizes="(max-width: 480px) 90vw, 375px"
                className={styles.phoneImg}
              />
              <Image
                srcSet={`${moviesHouseScreenshot2} 375w`}
                width={375}
                height={812}
                placeholder={moviesHouseScreenshot2}
                alt="Movies House detail screen"
                sizes="(max-width: 480px) 90vw, 375px"
                className={styles.phoneImg}
              />
            </div>
          </ProjectSectionContent>
        </ProjectSection>

        <ProjectSection>
          <ProjectTextRow>
            <ProjectSectionHeading>Overview</ProjectSectionHeading>
            <ProjectSectionText>
              Movies House is a clean, performant Android application that lets users browse
              trending movies, search titles, view detailed information and trailers, and save
              favourites — all working seamlessly even when offline.
            </ProjectSectionText>
            <ProjectSectionText>
              Built entirely in Kotlin with Jetpack Compose for the UI layer, it follows the
              MVVM architecture pattern with Hilt dependency injection and integrates TMDB API
              for live movie metadata.
            </ProjectSectionText>
          </ProjectTextRow>
        </ProjectSection>

        <ProjectSection light>
          <ProjectSectionColumns>
            <div className={styles.featureList}>
              <ProjectSectionHeading>Features</ProjectSectionHeading>
              {[
                { icon: '🎬', title: 'Real-time Movie Data', desc: 'Live data from The Movie Database (TMDB) API — trending, top-rated, upcoming, and now-playing categories.' },
                { icon: '💾', title: 'Offline-First with Room DB', desc: 'Paging 3 + Room DB caches all loaded data so the app works flawlessly without an internet connection.' },
                { icon: '🔍', title: 'Instant Search', desc: "Debounced live search across TMDB's entire movie catalogue, with results paginated for performance." },
                { icon: '❤️', title: 'Favourites List', desc: "Add any movie to your local favourites — persisted in Room DB and accessible offline." },
                { icon: '🖼️', title: 'Coil Image Loading', desc: 'Optimised image loading with Coil, including crossfade animations and placeholder support.' },
                { icon: '🏗️', title: 'Clean Architecture', desc: 'MVVM + Repository pattern + Hilt DI keeps the codebase modular, testable, and maintainable.' },
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
            <div className={styles.techStack}>
              <ProjectSectionHeading>Tech Stack</ProjectSectionHeading>
              {[
                { label: 'Language', value: 'Kotlin' },
                { label: 'UI', value: 'Jetpack Compose + Material 3' },
                { label: 'Architecture', value: 'MVVM + Repository' },
                { label: 'DI', value: 'Hilt' },
                { label: 'Async', value: 'Coroutines + Flow' },
                { label: 'Networking', value: 'Retrofit + OkHttp' },
                { label: 'Caching', value: 'Room DB + Paging 3' },
                { label: 'Images', value: 'Coil' },
                { label: 'API', value: 'TMDB API v3' },
                { label: 'Build', value: 'Gradle (Kotlin DSL)' },
              ].map((t, i) => (
                <div key={i} className={styles.techRow}>
                  <span className={styles.techLabel}>{t.label}</span>
                  <span className={styles.techValue}>{t.value}</span>
                </div>
              ))}
            </div>
          </ProjectSectionColumns>
        </ProjectSection>

        <ProjectSection>
          <ProjectTextRow center>
            <ProjectSectionHeading>View the source</ProjectSectionHeading>
            <ProjectSectionText>
              Movies House is open source. Explore the architecture, browse the code, or clone
              and run it locally on Android Studio.
            </ProjectSectionText>
            <Button
              secondary
              iconHoverShift
              icon="github"
              href="https://github.com/aniket-adhav/MoviesHouse"
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

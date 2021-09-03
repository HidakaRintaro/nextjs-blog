import Head from 'next/head'
import styles from './layout.module.css'
import utileStyle from '../styles/utils.module.css'
import Link from 'next/link'

const name = 'Rintaro'
export const siteTitle = 'Next.js Sample Website'

export default function Layout({ children, home }) {
  return (
    <div className={styles.container}>
      <Head>
        <link ref="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Learn how to build a personal website using Next.js"
        />
        <meta
          property="og:image"
          content={`https://og-image.now.sh/${encodeURI(
            siteTitle
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.zeit.co%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <header className={styles.header}>
        {home ? (
          <>
            <img
              src="/images/profile.jpg"
              className={`${styles.headerHomeImage} ${utileStyle.borderCircle}`}
              alt={name}
            />
            <h1 className={utileStyle.heading2Xl}></h1>
          </>
        ) : (
          <>
            <Link href="/">
              <a>
                <img
                  src="/images/profile.jpg"
                  className={`${styles.headerHomeImage} ${utileStyle.borderCircle}`}
                  alt={name}
                />
              </a>
            </Link>
            <h2 className={utileStyle.headingLg}>
              <Link href="/">
                <a className={utileStyle.colorInherit}>{name}</a>
              </Link>
            </h2>
          </>
        )}
      </header>
      <main>{children}</main>
      {!home && (
        <div className={styles.backToHome}>
          <Link href="/">
            <a>← back to home</a>
          </Link>
        </div>
      )}
    </div>
  )
}

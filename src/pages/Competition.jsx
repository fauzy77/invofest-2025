import { Helmet } from "react-helmet";

export default function Competition() {
  return (
    <>
      <Helmet>
        <title>Competition | INVOFEST 2025</title>
        <meta name="description" content="Ikuti berbagai kompetisi teknologi seperti UI/UX, Web Design, dan AI Challenge di INVOFEST 2025." />
        <meta property="og:title" content="Competition | INVOFEST 2025" />
        <meta property="og:description" content="Tunjukkan inovasimu di kompetisi INVOFEST 2025!" />
        <meta property="og:image" content="https://invofest-harkatnegeri.com/assets/competition.jpg" />
      </Helmet>

      <h1>Competition Page</h1>
    </>
  );
}

import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";

const RandomText = ({ children: finalText }: { children: string }) => {
  const [text, setText] = useState("");
  const [iterations, setIterations] = useState(0);
  const [maxIters] = useState(
    Math.floor((Math.random() * finalText.length) / 2) + finalText.length
  );
  const timeout = 32;
  const charmap = 1024;

  useEffect(() => {
    if (iterations <= maxIters) {
      setTimeout(() => {
        const randomString = Array(finalText.length)
          .fill(null)
          .map(() => String.fromCharCode(Math.floor(Math.random() * charmap)));
        const remaining = maxIters - iterations;
        if (remaining < finalText.length) {
          const revealed = finalText.length - remaining;
          randomString.splice(0, revealed, finalText.slice(0, revealed));
        }
        setText(randomString.join(""));
        setIterations(iterations + 1);
      }, timeout);
    }
  }, [finalText, iterations]);

  return <>{text}</>;
};

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>emerald</title>
        <meta name="description" content="web3 creative studio" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap"
          rel="stylesheet"
        />
      </Head>

      <main className={styles.main}>
        <strong>
          <RandomText>internet toys for internet people</RandomText>
        </strong>
        <p>
          <a href="https://spacetime.rodeo">spacetime.rodeo</a> a pyschedelic
          internet aquarium
        </p>
      </main>
    </div>
  );
};

export default Home;

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
  const charmap = 512;

  useEffect(() => {
    if (iterations <= maxIters) {
      setTimeout(() => {
        const randomString = Array(finalText.length)
          .fill(null)
          .map(() => String.fromCharCode(Math.floor(Math.random() * charmap)))
          .filter((n) => !n.match(/[\n\r]/g));
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

  return <span className={styles.randomText}>{text}</span>;
};

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>emerald</title>
        <meta name="description" content="web3 toy studio" />
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap"
          rel="stylesheet"
        />
      </Head>

      <main className={styles.main}>
        <strong style={{ color: "green" }}>
          <RandomText>emerald</RandomText>
        </strong>{" "}
        <RandomText>is a web3 toy studio</RandomText>
        <p>
          <a href="https://spacetime.rodeo">spacetime.rodeo</a>{" "}
          <small>pyschedelic internet aquarium</small>
        </p>
      </main>
    </div>
  );
};

export default Home;

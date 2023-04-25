import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import Diamond from "../components/diamond";
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
      </Head>

      <Diamond />

      <main className={styles.main}>
        <strong style={{ color: "green" }}>
          <RandomText>emerald</RandomText>
        </strong>{" "}
        <RandomText>is an internet toy factory</RandomText>
        <div className={styles.links}>
          <p>
            <a href="https://grok.computer" target="_blank">grok.computer</a>{" "}
            byte-sized coding lessons
          </p>
          <p>
            <a href="https://spacetime.rodeo" target="_blank">spacetime.rodeo</a>{" "}
            pyschedelic internet aquarium
          </p>
        </div>
        <p>
          <a href="https://campedersen.com" target="_blank">more!</a>
        </p>
      </main>
    </div>
  );
};

export default Home;

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

import { useMemo } from "react";
import { Geometry } from "three-stdlib";
import { Canvas } from "@react-three/fiber";
import { Physics, usePlane, useConvexPolyhedron } from "@react-three/cannon";
import { OrbitControls, useGLTF } from "@react-three/drei";

const Background = () => {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    setReady(typeof window !== "undefined");
  }, []);
  if (!ready) return null;
  const { nodes } = useGLTF("/diamond.glb") as any;
  return (
    <div className={styles.background}>
      <Canvas shadows camera={{ position: [0, 0, 2.56], fov: 16 }}>
        <OrbitControls autoRotate autoRotateSpeed={0.16} />
        <mesh geometry={nodes.Cylinder.geometry} rotation-x={0.32} rotation-z={0.64}>
          <meshBasicMaterial wireframe />
        </mesh>
      </Canvas>
    </div>
  );
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

      <Background />

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

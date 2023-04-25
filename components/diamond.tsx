import { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import styles from "../styles/Home.module.css";

const Diamond = () => {
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

export default Diamond;

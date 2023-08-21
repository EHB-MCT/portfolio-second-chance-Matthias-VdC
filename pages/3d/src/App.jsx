import { Physics } from "@react-three/cannon";
import { Environment, Sky } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { Suspense, useEffect, useRef } from "react";
import "./App.css";
import Cubes from "./components/Cubes";
import FirstPersonCamera from "./components/FirstPersonCamera";
import Ground from "./components/Ground";
import Player from "./components/Player";
import TextureSelector from "./components/TextureSelector";
import { Menu } from "./components/hud/HUD";
import { NoToneMapping, Vector3 } from "three";
import Enemies from "./components/Enemies";
import Path from "./components/Path";
import OtherPlayers from "./components/OtherPlayers";
import GameOverScreen from "./components/hud/GameOverScreen";
import { useStore } from "./hooks/useStore";
import Castle from "./components/models/environment/Castle";
import { Ram } from "./components/models/Ram";

function App() {
  const [isGameOver, enemies] = useStore((state) => [
    state.isGameOver,
    state.enemies,
  ]);

  return (
    <div id="canvas-container">
      <Canvas
        gl={{
          antialias: true,
          // toneMapping: NoToneMapping,
        }}
        shadows
        
        // linear
      >
        <Suspense>
          {/* <Sky sunPosition={[100, 40, 20]} /> */}
          <Sky distance={450000} sunPosition={[0, 1, 0]} inclination={0} azimuth={0.25} />
          <ambientLight intensity={0.35} />
          <directionalLight position={[0, 50, 0]} lookAt={new Vector3(0,0,0)} color="rgb(120,120,120)" />
          <FirstPersonCamera />
          <Physics>
            <Player />
            <OtherPlayers />
            <Cubes />
            <Path />
            <Enemies />
            <Ground />
            <Castle />
          </Physics>
          {/* <Environment preset="night" /> */}
        </Suspense>
      </Canvas>
      <Menu />
      <div id="cursor">+</div>
      <TextureSelector />
      {isGameOver ? <GameOverScreen /> : null}
    </div>
  );
}

export default App;

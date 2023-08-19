/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.11 ./public/models/soldier/scene.gltf --shadows --transform 
Files: ./public/models/soldier/scene.gltf [112.28KB] > scene-transformed.glb [66.8KB] (41%)
Author: Ryzekiel (https://sketchfab.com/Ryzekiel)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/sword-soldier-410fad7847ec4550ad7ca55b23e47932
Title: Sword Soldier
*/

import React, { useEffect, useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'

export default function Soldier(props) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF('/models/soldier/scene-transformed.glb');
  const { actions } = useAnimations(animations, group);
  useEffect(() => {
    console.log(actions);
    if (actions) actions["Armature|Walk"].play();
  }, [actions]);

  return (
    <group position={[-48.45,1.275,41]} scale={0.5} ref={group} {...props} dispose={null}>
      <group name="Sketchfab_Scene">
        <primitive object={nodes._rootJoint} />
        <skinnedMesh name="Object_32" geometry={nodes.Object_32.geometry} material={materials.PaletteMaterial001} skeleton={nodes.Object_32.skeleton} position={[95.829, -1.644, -108.889]} rotation={[-Math.PI / 2, 0, 0.089]} scale={0.4} />
        <skinnedMesh name="Object_34" geometry={nodes.Object_34.geometry} material={materials.PaletteMaterial001} skeleton={nodes.Object_34.skeleton} position={[95.829, -1.644, -108.889]} rotation={[-Math.PI / 2, 0, 0.089]} scale={0.4} />
        <skinnedMesh name="Object_35" geometry={nodes.Object_35.geometry} material={materials.PaletteMaterial001} skeleton={nodes.Object_35.skeleton} position={[95.829, -1.644, -108.889]} rotation={[-Math.PI / 2, 0, 0.089]} scale={0.4} />
        <skinnedMesh name="Object_37" geometry={nodes.Object_37.geometry} material={materials.PaletteMaterial001} skeleton={nodes.Object_37.skeleton} position={[95.829, -1.644, -108.889]} rotation={[-Math.PI / 2, 0, 0.089]} scale={0.4} />
        <skinnedMesh name="Object_39" geometry={nodes.Object_39.geometry} material={materials.PaletteMaterial001} skeleton={nodes.Object_39.skeleton} position={[95.829, -1.644, -108.889]} rotation={[-Math.PI / 2, 0, 0.089]} scale={0.4} />
        <skinnedMesh name="Object_41" geometry={nodes.Object_41.geometry} material={materials.PaletteMaterial001} skeleton={nodes.Object_41.skeleton} position={[95.829, -1.644, -108.889]} rotation={[-Math.PI / 2, 0, 0.089]} scale={0.4} />
        <skinnedMesh name="Object_43" geometry={nodes.Object_43.geometry} material={materials.PaletteMaterial001} skeleton={nodes.Object_43.skeleton} position={[95.829, -1.644, -108.889]} rotation={[-Math.PI / 2, 0, 0.089]} scale={0.4} />
        <skinnedMesh name="Object_45" geometry={nodes.Object_45.geometry} material={materials.PaletteMaterial001} skeleton={nodes.Object_45.skeleton} position={[95.829, -1.644, -108.889]} rotation={[-Math.PI / 2, 0, 0.089]} scale={0.4} />
        <skinnedMesh name="Object_47" geometry={nodes.Object_47.geometry} material={materials.PaletteMaterial001} skeleton={nodes.Object_47.skeleton} position={[95.829, -1.644, -108.889]} rotation={[-Math.PI / 2, 0, 0.089]} scale={0.4} />
        <skinnedMesh name="Object_49" geometry={nodes.Object_49.geometry} material={materials.PaletteMaterial001} skeleton={nodes.Object_49.skeleton} position={[95.829, -1.644, -108.889]} rotation={[-Math.PI / 2, 0, 0.089]} scale={0.4} />
        <skinnedMesh name="Object_51" geometry={nodes.Object_51.geometry} material={materials.PaletteMaterial001} skeleton={nodes.Object_51.skeleton} position={[95.829, -1.644, -108.889]} rotation={[-Math.PI / 2, 0, 0.089]} scale={0.4} />
        <skinnedMesh name="Object_53" geometry={nodes.Object_53.geometry} material={materials.PaletteMaterial001} skeleton={nodes.Object_53.skeleton} position={[95.829, -1.644, -108.889]} rotation={[-Math.PI / 2, 0, 0.089]} scale={0.4} />
        <skinnedMesh name="Object_55" geometry={nodes.Object_55.geometry} material={materials.PaletteMaterial001} skeleton={nodes.Object_55.skeleton} position={[95.829, -1.644, -108.889]} rotation={[-Math.PI / 2, 0, 0.089]} scale={0.4} />
        <skinnedMesh name="Object_57" geometry={nodes.Object_57.geometry} material={materials.PaletteMaterial001} skeleton={nodes.Object_57.skeleton} position={[95.829, -1.644, -108.889]} rotation={[-Math.PI / 2, 0, 0.089]} scale={0.4} />
      </group>
    </group>
  )
}

useGLTF.preload('/models/soldier/scene-transformed.glb');
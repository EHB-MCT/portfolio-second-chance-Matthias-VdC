import { useGLTF } from "@react-three/drei";
import { useGraph } from "@react-three/fiber";
import { useMemo } from "react";
import * as SkeletonUtils from 'three/addons/utils/SkeletonUtils.js';

// https://github.com/pmndrs/react-three-fiber/issues/245#issuecomment-1214450109
export default function useSkinnedMeshClone(path) {
    const { scene, materials, animations } = useGLTF(path);
    const clonedScene = useMemo(() => SkeletonUtils.clone(scene), [scene]);
    const { nodes } = useGraph(clonedScene);

    return { scene: clonedScene, materials, animations, nodes };
}
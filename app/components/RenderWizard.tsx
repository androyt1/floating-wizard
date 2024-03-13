"use client";
import { useGLTF, Environment } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";

import { forwardRef, useEffect, useRef } from "react";

const Wizard = forwardRef(function MyWizard(props, ref) {
    const model = useGLTF("/models/wizard.glb");
    useFrame((state, _) => {
        ref.current.position.y = -2 + Math.sin(state.clock.elapsedTime) * 0.3;
    });
    return <primitive object={model.scene} {...props} ref={ref} />;
});

const RenderWizard = () => {
    const modelRef = useRef();

    return (
        <Canvas className='h-screen'>
            <Wizard scale={0.05} position-y={-2} ref={modelRef} />
            <Environment preset='dawn' />
        </Canvas>
    );
};

export default RenderWizard;

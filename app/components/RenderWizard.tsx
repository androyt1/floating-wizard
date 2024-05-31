"use client";
import { useGLTF, Environment, useProgress, Html } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";

import { forwardRef, useRef, Suspense } from "react";

const Wizard = forwardRef(function MyWizard(props, ref) {
    const model = useGLTF("/models/wizard.glb");
    useFrame((state, _) => {
        ref.current.position.y = -2 + Math.sin(state.clock.elapsedTime) * 0.3;
    });
    return <primitive object={model.scene} {...props} ref={ref} />;
});

function Loader() {
    const { progress } = useProgress();
    return (
        <Html center className='text-white text-3xl font-semibold min-w-[400px]'>
            <span>loading: {Math.round(progress)} % loaded</span>{" "}
        </Html>
    );
}

const RenderWizard = () => {
    const modelRef = useRef();

    return (
        <Canvas className='h-screen'>
            <Suspense fallback={<Loader />}>
                <Wizard scale={0.05} position-y={-2} ref={modelRef} />
                <Environment preset='dawn' />
            </Suspense>
        </Canvas>
    );
};

export default RenderWizard;

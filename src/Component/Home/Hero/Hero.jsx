import React, { useRef, useEffect, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";

const Model = ({ modelRef }) => {
  const { scene } = useGLTF("/assets/Model/Tushar3d.glb");

  return (
    <primitive
      ref={modelRef}
      object={scene}
      scale={[5.2, 5.2, 5.2]}
      position={[0, -2.5, 0]}
    />
  );
};
useGLTF.preload("/assets/Model/Tushar3d.glb");

const Hero = () => {
  const modelRef = useRef();
  const textRef = useRef();
  const isHeroActive = useRef(true);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (modelRef.current && isHeroActive.current) {
        const x = (e.clientX / window.innerWidth - 0.5) * 2;
        modelRef.current.rotation.y = x * 0.3;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      let raw = Math.min(window.scrollY / 700, 1);
      const progress = 1 - Math.pow(1 - raw, 3);
      isHeroActive.current = progress < 0.95;

      if (modelRef.current) {
        const targetX = -3.2;
        const targetRotation = -1.4;

        modelRef.current.position.x = targetX * progress;
        modelRef.current.position.y = -2.5;
        modelRef.current.rotation.y = targetRotation * progress;
      }

      // const onScrollRotation = (e) => {
      //   if (modelRef.current) {
      //     modelRef.current.rotation.x = e.clientX * 0.005;
      //   }
      // };
      // if(modelRef.current) {
      //   modelRef.current.rotation.x = e.clientX;
      // }

      if (textRef.current) {
        if (progress > 0.95) {
          textRef.current.style.opacity = "1";
          textRef.current.style.transform = "translateY(-50%) translateX(0px)";
        } else {
          textRef.current.style.opacity = "0";
          textRef.current.style.transform =
            "translateY(-50%) translateX(100px)";
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div style={{ height: "180vh", position: "relative" }}>
      <h1
        className="font-long text-[500px] text-sky-400 drop-shadow-[0_0_10px_rgba(56,189,248,0.5)]"
        style={{
          position: "absolute",
          top: "30%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 0,
          pointerEvents: "none",
        }}
      >
        IIIIIIIIII
      </h1>
      <div style={{ height: "100vh", position: "sticky", top: 0, zIndex: 10 }}>
        <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
          <ambientLight intensity={1.2} />
          <directionalLight position={[3, 4, 3]} intensity={1} />
          <pointLight position={[-4, 2, -2]} intensity={30} color="#38bdf8" />
          <Suspense fallback={null}>
            <Model modelRef={modelRef} />
          </Suspense>
        </Canvas>
      </div>
      <div
        ref={textRef}
        className="fixed top-1/2 right-16 max-w-md text-white"
        style={{
          opacity: 0,
          transform: "translateY(-50%) translateX(100px)",
          transition: "all 0.3s ease-out",
        }}
      >
        <h2 className="text-7xl font-bold text-sky-400">ABOUT</h2>
        <p className="text-xl leading-relaxed text-gray-300">
          Agraphic designer with 3+ years of experience and 250+ successful
          projects. I specialize in bold, purposeful visuals—from brand
          identities to high-impact thumbnails—helping creators and brands stand
          out with precision and style.
        </p>
      </div>
    </div>
  );
};

export default Hero;

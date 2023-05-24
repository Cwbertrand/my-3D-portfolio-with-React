import React, { Suspense, useEffect, useState } from "react";

//Canvas is just an empty canvas that allows us to place something on it
import { Canvas } from "@react-three/fiber";

//helpers that makes it easier to draw from the canvas
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";

import CanvasLoader from "../Loader";

const Computers = ({isMobile}) => {
  //Import the GLTF model
  const computer = useGLTF("./desktop_pc/scene.gltf");
  return (
    //to create a 3D element you start with mesh tag
    <mesh>
      {/* create a light */}
      <hemisphereLight intensity={0.15} groundColor="black" />
      {/* point light. This brightens just a single spot */}
      <pointLight intensity={1}/>
      {/* the main light. This brightens everywhere */}
      <spotLight 
        position={[-20, 50, 10]}
        angle={0.12}
        penumbra={1}
        intensity={1}
        castShadow
        shadow-mapSize={1024}
      />

      {/* this is the computer object */}
      <primitive 
        object={computer.scene}
        //pass a condition if screen is smaller then reduce the scale
        scale={isMobile ? 0.7 : 0.75}
        position={isMobile ? [4, -4, -1.3] : [0, -3.25, -1.5]}
        rotation={[-0.01, -0.2, -0.1]}
      />
    </mesh>
  )
}

const ComputersCanvas = () => {

  // media query for screen size
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {

    //check if the screen is mobile
    const mediaQuery = window.matchMedia('(max-width: 500px)');
    setIsMobile(mediaQuery.matches);

    //When the screen is resized we need to modify the canvas size
    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    }

    mediaQuery.addEventListener('change', handleMediaQueryChange);
    
    //We need to remove the event listener when the component unmounts because we don't want it to run again
    return () => {
      mediaQuery.removeEventListener('change', handleMediaQueryChange);
    }
  }, [])

  
  return (
    <Canvas frameloop="demand"
      shadows
      // fov: field of view
      camera={{ position: [20, 3, 5], fov: 25 }}
      gl={{preserveDrawingBuffer: true}}
    >
      {/* react function this is not from three.js */}
      <Suspense fallback={<CanvasLoader/>}> {/*  fallback={<CanvasLoader/>}: This calls a component forthe percentage */}
        <OrbitControls //it allows you to rotate the 3d
          enableZoom={false}
          maxPolarAngle={Math.PI / 2} //stops rotation up and donw
          minPolarAngle={Math.PI / 2}
        /> 
        <Computers isMobile={isMobile} />
      </Suspense>
      <Preload all/>
    </Canvas>
  )
}

export default ComputersCanvas
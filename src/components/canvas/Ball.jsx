import React, { Suspense} from 'react';
import { Canvas } from '@react-three/fiber';
import { Decal, Float, OrbitControls, Preload, useTexture } from '@react-three/drei';

import CanvasLoader from '../Loader';

const Ball = (props) => {
  const [decal] = useTexture([props.imgUrl]);
  return (
    <Float speed={1.75} rotationIntensity={1} floatIntensity={2}>
      <ambientLight intensity={0.50} />
      <pointLight position={[0, 0, 0.05]} />
      <mesh castShadow receiveShadow scale={2.75}>
        <icosahedronGeometry args={[1, 1]}/>
        <meshStandardMaterial
          color='#fff8eb'
          polygonOffset
          polygonOffsetFactor={-5}
          flatShading
        />
        <Decal
          position={[0, 0, 1]}
          rotation={[2 * Math.PI, 0, 6.25]}
          flatShading
          map={decal}
        />
      </mesh>
    </Float>
  )
}

const BallCanvas = ({ icon }) => {
  return (
    <Canvas frameloop="demand"
      gl={{preserveDrawingBuffer: true}}
    >
      {/* react function this is not from three.js */}
      <Suspense fallback={<CanvasLoader/>}> {/*  fallback={<CanvasLoader/>}: This calls a component forthe percentage */}
        <OrbitControls //it allows you to rotate the 3d
          enableZoom={false}
        /> 
        <Ball imgUrl={icon}/>
      </Suspense>
      <Preload all/>
    </Canvas>
  )
}

export default BallCanvas
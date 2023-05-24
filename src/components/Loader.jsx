// this components makes the percentage upload
import { Html, useProgress } from '@react-three/drei';

const Loader = () => {
  const { progress } = useProgress();
  return (
    <Html>
      <span className="canvas-load"></span>
      {/** this is inline react native css styling */}
      <p style={{
            fontSize: 14,
            color: '#f1f1f1',
            fontWeight: 800,
            marginTop: 40,
          }}>
        {progress.toFixed()}%
      </p>
    </Html>
  )
}

export default Loader
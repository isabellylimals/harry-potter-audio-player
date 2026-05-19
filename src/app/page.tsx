import AudioPlayer from '../components/AudioPlayer';
import IsaBackground from '../components/IsaBackground';

export default function Home() {
  return (
    <main style={{
      height: '100vh',
      width: '100vw',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden',
      margin: 0,
      padding: 0
    }}>
      <IsaBackground />
      <AudioPlayer />
    </main>
  );
}
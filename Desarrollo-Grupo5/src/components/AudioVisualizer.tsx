import { useRef, useEffect } from 'react';

interface AudioVisualizerProps {
  audioEngine: any; 
  width?: number;
  height?: number;
}

export function AudioVisualizer({ audioEngine, width = 800, height = 100 }: AudioVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!audioEngine) return;

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!ctx) return;

    const analyser = audioEngine.getAnalyser();
    const dataArray = new Uint8Array(analyser.frequencyBinCount);
    let animationId: number;

    const draw = () => {
      analyser.getByteFrequencyData(dataArray);
      ctx.clearRect(0, 0, width, height);

      const barWidth = width / dataArray.length;
      dataArray.forEach((value, i) => {
        const barHeight = (value / 255) * height;
        ctx.fillStyle = `hsl(${(i / dataArray.length) * 360}, 100%, 50%)`;
        ctx.fillRect(i * barWidth, height - barHeight, barWidth, barHeight);
      });

      animationId = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animationId);
  }, [audioEngine, width, height]);

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      style={{ display: 'block', margin: '0 auto', borderRadius: 8 }}
    />
  );
}
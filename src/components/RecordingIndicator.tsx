import { useState, useEffect } from "react";
import { Video, Mic } from "lucide-react";

interface RecordingIndicatorProps {
  isRecording: boolean;
}

const RecordingIndicator = ({ isRecording }: RecordingIndicatorProps) => {
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (!isRecording) {
      setDuration(0);
      return;
    }

    const interval = setInterval(() => {
      setDuration(prev => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isRecording]);

  if (!isRecording) return null;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed top-4 right-4 z-50 animate-fade-in">
      <div className="bg-emergency/90 backdrop-blur-sm border-2 border-emergency-glow px-6 py-3 rounded-lg shadow-emergency">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-white animate-pulse" />
            <span className="text-white font-bold">RECORDING</span>
          </div>
          
          <div className="flex items-center gap-3 text-white/90">
            <Video className="h-4 w-4" />
            <Mic className="h-4 w-4" />
            <span className="font-mono text-sm">{formatTime(duration)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecordingIndicator;

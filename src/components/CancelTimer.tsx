import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface CancelTimerProps {
  onCancel: () => void;
  onTimeout: () => void;
  duration?: number;
}

const CancelTimer = ({ onCancel, onTimeout, duration = 10 }: CancelTimerProps) => {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    if (timeLeft <= 0) {
      onTimeout();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        const next = prev - 0.1;
        setProgress((next / duration) * 100);
        return next;
      });
    }, 100);

    return () => clearInterval(timer);
  }, [timeLeft, duration, onTimeout]);

  return (
    <Card className="p-6 border-emergency bg-emergency/5 shadow-emergency animate-pulse-emergency">
      <div className="text-center mb-4">
        <div className="text-5xl font-bold text-emergency mb-2">
          {Math.ceil(timeLeft)}
        </div>
        <p className="text-sm text-muted-foreground">
          seconds to cancel
        </p>
      </div>

      <Progress 
        value={progress} 
        className="mb-6 h-3"
      />

      <Button
        onClick={onCancel}
        className="w-full bg-emergency hover:bg-emergency/90 text-white shadow-emergency"
        size="lg"
      >
        <X className="mr-2 h-5 w-5" />
        Cancel Emergency Alert
      </Button>

      <p className="text-xs text-center text-muted-foreground mt-4">
        If not cancelled, authorities and responders will be notified
      </p>
    </Card>
  );
};

export default CancelTimer;

import { useState, useEffect } from "react";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SOSButtonProps {
  onTrigger: (tapCount: number) => void;
  disabled?: boolean;
}

const SOSButton = ({ onTrigger, disabled = false }: SOSButtonProps) => {
  const [tapCount, setTapCount] = useState(0);
  const [isPressed, setIsPressed] = useState(false);

  useEffect(() => {
    if (tapCount === 0) return;

    const timer = setTimeout(() => {
      if (tapCount >= 2) {
        onTrigger(tapCount);
      }
      setTapCount(0);
    }, 800);

    return () => clearTimeout(timer);
  }, [tapCount, onTrigger]);

  const handlePress = () => {
    if (disabled) return;
    setIsPressed(true);
    setTapCount(prev => prev + 1);
  };

  const handleRelease = () => {
    setIsPressed(false);
  };

  const getButtonStyle = () => {
    if (disabled) {
      return "bg-muted cursor-not-allowed opacity-50";
    }
    if (tapCount >= 4) {
      return "gradient-emergency shadow-emergency animate-pulse-emergency border-2 border-emergency-glow";
    }
    if (tapCount >= 2) {
      return "bg-warning shadow-glow border-2 border-warning-glow";
    }
    return "gradient-hero shadow-glow hover:shadow-[0_0_60px_hsl(180_100%_50%_/_0.7)] border-2 border-primary/50";
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        {/* Ripple effect */}
        {isPressed && !disabled && (
          <>
            <div className="absolute inset-0 rounded-full bg-primary/40 animate-ripple" />
            <div className="absolute inset-0 rounded-full bg-primary/30 animate-ripple" style={{ animationDelay: '0.2s' }} />
            <div className="absolute inset-0 rounded-full bg-primary/20 animate-ripple" style={{ animationDelay: '0.4s' }} />
          </>
        )}
        
        {/* Main button */}
        <Button
          size="lg"
          disabled={disabled}
          onMouseDown={handlePress}
          onMouseUp={handleRelease}
          onMouseLeave={handleRelease}
          onTouchStart={handlePress}
          onTouchEnd={handleRelease}
          className={`
            relative w-48 h-48 rounded-full text-2xl font-bold
            transition-smooth cursor-pointer select-none
            ${getButtonStyle()}
            ${isPressed && !disabled ? 'scale-95' : 'scale-100'}
            hover:scale-105 active:scale-95 font-black text-black
          `}
        >
          <div className="flex flex-col items-center gap-2">
            <AlertCircle className="h-16 w-16" />
            <span>SOS</span>
          </div>
        </Button>
      </div>

      {/* Tap counter */}
      <div className="mt-6 text-center">
        {tapCount > 0 && (
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-lg shadow-soft">
            <div className="flex gap-1">
              {Array.from({ length: tapCount }).map((_, i) => (
                <div
                  key={i}
                  className={`w-3 h-3 rounded-full ${
                    tapCount >= 4 ? 'bg-emergency' : 
                    tapCount >= 2 ? 'bg-warning' : 
                    'bg-primary'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm font-medium text-muted-foreground">
              {tapCount} {tapCount === 1 ? 'tap' : 'taps'}
            </span>
          </div>
        )}
        
        {tapCount === 0 && !disabled && (
          <p className="text-sm text-muted-foreground">
            Tap repeatedly to activate SOS
          </p>
        )}
      </div>
    </div>
  );
};

export default SOSButton;

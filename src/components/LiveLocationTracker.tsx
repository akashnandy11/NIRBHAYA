import { useState, useEffect } from "react";
import { MapPin, Navigation } from "lucide-react";
import { Card } from "@/components/ui/card";

interface LiveLocationTrackerProps {
  isActive: boolean;
}

const LiveLocationTracker = ({ isActive }: LiveLocationTrackerProps) => {
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [accuracy, setAccuracy] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isActive) {
      setLocation(null);
      return;
    }

    if (!navigator.geolocation) {
      setError("Geolocation not supported");
      return;
    }

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setAccuracy(position.coords.accuracy);
        setError(null);
      },
      (err) => {
        setError(err.message);
      },
      {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 5000,
      }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, [isActive]);

  if (!isActive) return null;

  return (
    <Card className="p-4 bg-card/90 backdrop-blur-sm border-primary/30 shadow-glow animate-fade-in">
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-lg bg-primary/20">
          <Navigation className="h-5 w-5 text-primary animate-pulse" />
        </div>
        <div className="flex-1">
          <h4 className="font-bold text-foreground mb-2 flex items-center gap-2">
            <span>Live GPS Tracking</span>
            <div className="w-2 h-2 rounded-full bg-safe animate-pulse" />
          </h4>
          {error ? (
            <p className="text-sm text-destructive">{error}</p>
          ) : location ? (
            <div className="space-y-1 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <MapPin className="h-3 w-3" />
                <span className="font-mono">
                  {location.lat.toFixed(6)}, {location.lng.toFixed(6)}
                </span>
              </div>
              <p className="text-xs">
                Accuracy: ±{accuracy.toFixed(0)}m | Sharing with authorities & responders
              </p>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">Acquiring location...</p>
          )}
        </div>
      </div>
    </Card>
  );
};

export default LiveLocationTracker;

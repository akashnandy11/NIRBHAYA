import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, AlertCircle, CheckCircle2, Phone, Users as UsersIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import SOSButton from "@/components/SOSButton";
import CancelTimer from "@/components/CancelTimer";
import RecordingIndicator from "@/components/RecordingIndicator";
import LiveLocationTracker from "@/components/LiveLocationTracker";
import { useToast } from "@/hooks/use-toast";

const Dashboard = () => {
  const [isSOSActive, setIsSOSActive] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);
  const [tapCount, setTapCount] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [alertsSent, setAlertsSent] = useState(0);
  const { toast } = useToast();

  const handleSOSTrigger = (taps: number) => {
    setTapCount(taps);
    
    if (taps >= 4) {
      setIsSOSActive(true);
      setIsCancelling(true);
      toast({
        title: "Enhanced SOS Triggered",
        description: `${taps} taps detected - Auto recording enabled. Cancel within 10 seconds.`,
      });
    } else {
      toast({
        title: "Standard SOS Alert",
        description: `${taps} taps detected - Contacts notified.`,
      });
    }
  };

  const handleCancel = () => {
    setIsSOSActive(false);
    setIsCancelling(false);
    setTapCount(0);
    toast({
      title: "SOS Cancelled",
      description: "Alert has been cancelled successfully.",
      variant: "default",
    });
  };

  const handleTimeout = () => {
    setIsCancelling(false);
    setIsRecording(true);
    setAlertsSent(3);
    
    // Simulate sending alerts
    setTimeout(() => setAlertsSent(prev => prev + 2), 1000);
    setTimeout(() => setAlertsSent(prev => prev + 5), 2000);
    
    toast({
      title: "🚨 Emergency Dispatch Initiated",
      description: "Recording active. Police, responders & contacts alerted. GPS tracking enabled.",
      variant: "destructive",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      <RecordingIndicator isRecording={isRecording} />
      
      {/* Header */}
      <header className="border-b border-border bg-card/80 backdrop-blur-md sticky top-0 z-10 shadow-glow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link to="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
            </Link>
            <h1 className="text-xl font-bold text-foreground">
              SOS Dashboard
            </h1>
            <div className="w-24" /> {/* Spacer for centering */}
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Status Banner */}
        {isSOSActive && (
          <div className="space-y-4 mb-8">
            <Card className="p-6 border-emergency bg-emergency/10 shadow-emergency animate-pulse-emergency">
              <div className="flex items-start gap-4">
                <AlertCircle className="h-6 w-6 text-emergency flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-foreground mb-2">
                    🚨 EMERGENCY MODE ACTIVE
                  </h3>
                  <p className="text-muted-foreground mb-3">
                    Auto-recording enabled. Live stream being sent to authorities and verified responders.
                  </p>
                  {alertsSent > 0 && (
                    <div className="flex items-center gap-2 text-sm">
                      <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-safe/20 border border-safe/30">
                        <Phone className="h-3 w-3 text-safe" />
                        <span className="text-safe font-medium">Police Notified</span>
                      </div>
                      <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-primary/20 border border-primary/30">
                        <UsersIcon className="h-3 w-3 text-primary" />
                        <span className="text-primary font-medium">{alertsSent} Responders En Route</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Card>
            
            <LiveLocationTracker isActive={isSOSActive} />
          </div>
        )}

        <div className="grid lg:grid-cols-2 gap-8">
          {/* SOS Control Section */}
          <div>
            <Card className="p-8 shadow-soft">
              <h2 className="text-2xl font-bold text-foreground mb-6 text-center">
                Emergency Trigger
              </h2>
              
              <div className="mb-6">
                <SOSButton onTrigger={handleSOSTrigger} disabled={isSOSActive} />
              </div>

              {isCancelling && (
                <CancelTimer onCancel={handleCancel} onTimeout={handleTimeout} />
              )}

              {!isSOSActive && (
                <div className="mt-8 space-y-4">
                  <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-bold text-primary">2-3</span>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Standard Alert</p>
                      <p className="text-sm text-muted-foreground">
                        Notifies emergency contacts
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 bg-emergency/5 rounded-lg border border-emergency/20">
                    <div className="w-8 h-8 rounded-full bg-emergency/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-bold text-emergency">4-5</span>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Enhanced Emergency</p>
                      <p className="text-sm text-muted-foreground">
                        Auto-recording + Police + Verified responders
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </Card>

            {/* Voice Activation Info */}
            <Card className="mt-6 p-6 bg-secondary/10 border-secondary/30 shadow-glow">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg gradient-hero flex items-center justify-center flex-shrink-0 shadow-glow">
                  <span className="text-black text-xl">🎤</span>
                </div>
                <div>
                  <h3 className="font-bold text-foreground mb-2">Voice Activation Available</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Say your secret keyword to trigger SOS hands-free using on-device AI recognition
                  </p>
                  <p className="text-xs text-secondary font-medium bg-secondary/20 px-2 py-1 rounded">
                    Voice AI Active - Say your keyword
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Information Panel */}
          <div className="space-y-6">
            <Card className="p-6 shadow-soft">
              <h3 className="text-xl font-bold text-foreground mb-4">
                System Status
              </h3>
              
              <div className="space-y-3">
                <StatusItem
                  icon={<CheckCircle2 className="h-5 w-5 text-safe" />}
                  label="GPS Location"
                  value="Active"
                  status="safe"
                />
                <StatusItem
                  icon={<CheckCircle2 className="h-5 w-5 text-safe" />}
                  label="Network Connection"
                  value="Strong"
                  status="safe"
                />
                <StatusItem
                  icon={<CheckCircle2 className="h-5 w-5 text-safe" />}
                  label="Nearby Responders"
                  value="12 verified within 2km"
                  status="safe"
                />
                <StatusItem
                  icon={<CheckCircle2 className="h-5 w-5 text-safe" />}
                  label="Safe Zones Nearby"
                  value="8 locations"
                  status="safe"
                />
              </div>
            </Card>

            <Card className="p-6 shadow-soft">
              <h3 className="text-xl font-bold text-foreground mb-4">
                How It Works
              </h3>
              
              <ol className="space-y-3 text-sm text-muted-foreground">
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs">
                    1
                  </span>
                  <span>Tap the power button 4-5 times to activate enhanced SOS</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs">
                    2
                  </span>
                  <span>10-second cancellation window appears to prevent false alarms</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs">
                    3
                  </span>
                  <span>Auto-recording starts capturing audio/video evidence</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs">
                    4
                  </span>
                  <span>Police authorities and verified gig workers nearby are alerted</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs">
                    5
                  </span>
                  <span>GPS tracking monitors responder approach for safety verification</span>
                </li>
              </ol>
            </Card>

            <div className="flex gap-4">
              <Link to="/safe-places" className="flex-1">
                <Button className="w-full" variant="outline">
                  View Safe Zones Map
                </Button>
              </Link>
              <Link to="/architecture" className="flex-1">
                <Button className="w-full" variant="outline">
                  Tech Docs
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatusItem = ({ 
  icon, 
  label, 
  value, 
  status 
}: { 
  icon: React.ReactNode; 
  label: string; 
  value: string;
  status: "safe" | "warning" | "error";
}) => {
  return (
    <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
      <div className="flex items-center gap-3">
        {icon}
        <span className="font-medium text-foreground">{label}</span>
      </div>
      <span className={`text-sm font-medium ${
        status === "safe" ? "text-safe" : 
        status === "warning" ? "text-warning" : 
        "text-emergency"
      }`}>
        {value}
      </span>
    </div>
  );
};

export default Dashboard;

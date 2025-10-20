import { Link } from "react-router-dom";
import { ArrowLeft, Zap, Shield, Database, Cloud, Users, Camera, MapPin, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Architecture = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link to="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
            </Link>
            <h1 className="text-xl font-bold text-foreground">
              Technical Architecture
            </h1>
            <div className="w-24" />
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Overview */}
        <Card className="mb-8 p-8 shadow-soft">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Nirbhaya System Architecture
          </h2>
          <p className="text-lg text-muted-foreground mb-6">
            AI-powered emergency response platform bridging the critical 15-25 minute gap
            through verified community response, auto-evidence capture, and intelligent safety networks.
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            <StatBox
              icon={<Zap className="h-6 w-6" />}
              value="<10s"
              label="Alert dispatch time"
            />
            <StatBox
              icon={<Users className="h-6 w-6" />}
              value="100%"
              label="Verified responders"
            />
            <StatBox
              icon={<Shield className="h-6 w-6" />}
              value="Real-time"
              label="Evidence preservation"
            />
          </div>
        </Card>

        {/* Tabbed Content */}
        <Tabs defaultValue="system" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-grid">
            <TabsTrigger value="system">System Flow</TabsTrigger>
            <TabsTrigger value="tech">Tech Stack</TabsTrigger>
            <TabsTrigger value="features">Core Features</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>

          {/* System Flow */}
          <TabsContent value="system" className="space-y-6">
            <Card className="p-6 shadow-soft">
              <h3 className="text-2xl font-bold text-foreground mb-6">Emergency Response Flow</h3>
              
              <div className="space-y-6">
                <FlowStep
                  number={1}
                  title="Trigger Detection"
                  description="Multi-modal activation system"
                  details={[
                    "Power button: 2-3 taps = Standard SOS, 4-5 taps = Enhanced SOS",
                    "Voice activation: Secret keyword detection using TensorFlow Lite",
                    "Fragment-based on-device recognition (wake-word detection)",
                    "No continuous microphone access required"
                  ]}
                  color="primary"
                />

                <FlowStep
                  number={2}
                  title="Cancel Window (10 seconds)"
                  description="Prevents false alarms while maintaining rapid response"
                  details={[
                    "Visual countdown timer with progress indicator",
                    "Large cancel button for easy access",
                    "Audio/visual feedback during countdown",
                    "If cancelled: Alert terminated, no dispatch"
                  ]}
                  color="warning"
                />

                <FlowStep
                  number={3}
                  title="Auto Evidence Recording"
                  description="Immediate capture and secure storage"
                  details={[
                    "Automatic audio/video recording activation",
                    "Real-time streaming to Firebase Cloud Storage",
                    "End-to-end encrypted transmission",
                    "Live stream links sent to authorities",
                    "Offline fallback: Local storage with sync when online"
                  ]}
                  color="accent"
                />

                <FlowStep
                  number={4}
                  title="Multi-Channel Alert Dispatch"
                  description="Simultaneous notification to all response channels"
                  details={[
                    "Police authorities via direct API integration",
                    "Verified gig workers within 2km radius",
                    "Emergency contacts via SMS (Twilio)",
                    "GPS coordinates shared in real-time",
                    "Safe zone suggestions displayed on map"
                  ]}
                  color="emergency"
                />

                <FlowStep
                  number={5}
                  title="Responder Verification & Tracking"
                  description="GPS-based integrity monitoring"
                  details={[
                    "Real-time GPS logging of responder movement",
                    "Google Maps API coordinate comparison",
                    "Suspicious overlap detection algorithm",
                    "Automatic account flagging for misuse",
                    "Reward points for verified assistance"
                  ]}
                  color="safe"
                />
              </div>
            </Card>

            {/* User Journey Flowchart */}
            <Card className="p-6 shadow-soft">
              <h3 className="text-2xl font-bold text-foreground mb-6">User Journey Visualization</h3>
              <div className="bg-muted/30 p-8 rounded-lg">
                <div className="space-y-4 max-w-2xl mx-auto">
                  <JourneyNode text="User in Distress" type="start" />
                  <JourneyArrow />
                  <JourneyNode text="Multi-tap (4-5x) OR Voice Keyword" type="trigger" />
                  <JourneyArrow />
                  <JourneyNode text="10-Second Cancel Timer" type="warning" />
                  <JourneyBranch
                    left="Cancelled"
                    right="Not Cancelled"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <JourneyNode text="Alert Terminated" type="end" />
                    </div>
                    <div className="space-y-4">
                      <JourneyNode text="Auto-Recording Starts" type="action" />
                      <JourneyArrow />
                      <JourneyNode text="Police + Responders Alerted" type="action" />
                      <JourneyArrow />
                      <JourneyNode text="Evidence Preserved + Help Arrives" type="success" />
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Tech Stack */}
          <TabsContent value="tech" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <TechCard
                title="Frontend Layer"
                icon={<Cloud className="h-8 w-8" />}
                technologies={[
                  { name: "React", desc: "User interface & real-time state management" },
                  { name: "Google Maps JavaScript API", desc: "Safe zone mapping & navigation" },
                  { name: "TensorFlow Lite", desc: "On-device voice keyword detection" },
                  { name: "MediaRecorder API", desc: "Audio/video evidence capture" }
                ]}
              />

              <TechCard
                title="Backend Services"
                icon={<Database className="h-8 w-8" />}
                technologies={[
                  { name: "Node.js", desc: "API server & real-time processing" },
                  { name: "Firebase Cloud/Firestore", desc: "Real-time database & messaging" },
                  { name: "Firebase Cloud Storage", desc: "Secure evidence storage" },
                  { name: "Twilio API", desc: "SMS alerts & communication" }
                ]}
              />

              <TechCard
                title="AI & Detection"
                icon={<Zap className="h-8 w-8" />}
                technologies={[
                  { name: "TensorFlow Lite", desc: "Wake-word detection engine" },
                  { name: "Picovoice Porcupine", desc: "Custom keyword spotting" },
                  { name: "Motion Detection APIs", desc: "Shake/gesture recognition" },
                  { name: "ML Kit", desc: "On-device model optimization" }
                ]}
              />

              <TechCard
                title="Verification & Security"
                icon={<Shield className="h-8 w-8" />}
                technologies={[
                  { name: "Aadhaar eKYC API", desc: "Responder identity verification" },
                  { name: "Google Maps Geocoding", desc: "Location integrity checks" },
                  { name: "End-to-End Encryption", desc: "Evidence protection" },
                  { name: "JWT Authentication", desc: "Secure API access" }
                ]}
              />
            </div>
          </TabsContent>

          {/* Core Features */}
          <TabsContent value="features" className="space-y-6">
            <div className="grid gap-6">
              <FeatureCard
                icon={<Zap className="h-8 w-8 text-primary" />}
                title="Multi-Trigger SOS System"
                description="Flexible activation designed for critical scenarios"
                features={[
                  "Physical: 2-3 taps (standard), 4-5 taps (enhanced with auto-record)",
                  "Voice: Secret keyword activation using AI wake-word detection",
                  "10-second cancellation window to prevent false alarms",
                  "Visual and haptic feedback for confirmation",
                  "Works in low-signal environments with offline fallback"
                ]}
              />

              <FeatureCard
                icon={<Users className="h-8 w-8 text-safe" />}
                title="Verified Responder Network"
                description="Community-powered first response system"
                features={[
                  "KYC verification via Aadhaar eKYC for all responders",
                  "Police background check integration",
                  "Gig workers (delivery agents, drivers) within 2km radius",
                  "GPS-based integrity monitoring for safety",
                  "Reward point system for authentic assistance",
                  "Account flagging for suspicious activity"
                ]}
              />

              <FeatureCard
                icon={<Camera className="h-8 w-8 text-accent" />}
                title="Auto Evidence Capture"
                description="Real-time documentation and preservation"
                features={[
                  "Automatic audio/video recording on enhanced SOS",
                  "Live streaming to secure cloud storage",
                  "Tamper-proof timestamping and metadata",
                  "Shared with authorities in real-time",
                  "Offline recording with auto-sync when connected",
                  "End-to-end encryption for privacy"
                ]}
              />

              <FeatureCard
                icon={<MapPin className="h-8 w-8 text-secondary" />}
                title="Safe Zone Network"
                description="Verified safe locations for immediate refuge"
                features={[
                  "Google Maps integration with color-coded safety ratings",
                  "24/7 monitored locations (metro, cafes, stores, police)",
                  "Real-time distance and navigation guidance",
                  "Crowd-sourced safety ratings and reviews",
                  "Operating hours and accessibility information",
                  "Emergency contact at each verified location"
                ]}
              />

              <FeatureCard
                icon={<Award className="h-8 w-8 text-warning" />}
                title="Reward & Verification System"
                description="Ensuring authentic community participation"
                features={[
                  "Points awarded for verified assistance",
                  "Redeemable through in-app marketplace",
                  "GPS cross-verification with victim location",
                  "Time-stamped response tracking",
                  "Peer and victim rating system",
                  "Automatic fraud detection algorithms"
                ]}
              />
            </div>
          </TabsContent>

          {/* Security */}
          <TabsContent value="security" className="space-y-6">
            <Card className="p-6 shadow-soft border-safe/20 bg-safe/5">
              <div className="flex items-start gap-4 mb-6">
                <Shield className="h-8 w-8 text-safe flex-shrink-0" />
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">
                    Security & Privacy Architecture
                  </h3>
                  <p className="text-muted-foreground">
                    Multi-layered security ensuring user safety and data protection
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <SecuritySection
                  title="Privacy-First Design"
                  points={[
                    "Voice keyword: Fragment-based recognition, no continuous listening",
                    "On-device processing with TensorFlow Lite (no cloud dependency)",
                    "Recording only activates during confirmed emergencies",
                    "User controls all data retention and sharing settings",
                    "Anonymous safe zone ratings (no personal data exposed)"
                  ]}
                />

                <SecuritySection
                  title="Data Protection"
                  points={[
                    "End-to-end encryption for all evidence streams",
                    "Secure cloud storage with Firebase (SOC 2 compliant)",
                    "GDPR and data localization compliance",
                    "Automatic data expiration after case closure",
                    "User-initiated permanent deletion option"
                  ]}
                />

                <SecuritySection
                  title="Anti-Misuse Measures"
                  points={[
                    "GPS integrity checking prevents responder-attacker collusion",
                    "Suspicious location overlap triggers automatic investigation",
                    "Machine learning fraud detection on response patterns",
                    "Multi-factor verification for responder accounts",
                    "Real-time monitoring dashboard for authorities",
                    "Penalty system: Account suspension and legal action for abuse"
                  ]}
                />

                <SecuritySection
                  title="Communication Security"
                  points={[
                    "Encrypted SMS via Twilio with fallback delivery",
                    "Secure WebSocket connections for real-time updates",
                    "JWT-based API authentication with token rotation",
                    "Rate limiting and DDoS protection",
                    "Geographic routing for optimal latency"
                  ]}
                />
              </div>
            </Card>

            {/* Implementation Notes */}
            <Card className="p-6 shadow-soft">
              <h3 className="text-xl font-bold text-foreground mb-4">Implementation Priorities</h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <div className="flex gap-3">
                  <span className="text-primary font-bold">Phase 1:</span>
                  <span>Core SOS system, cancel timer, basic GPS tracking</span>
                </div>
                <div className="flex gap-3">
                  <span className="text-primary font-bold">Phase 2:</span>
                  <span>Voice activation, auto-recording, Firebase integration</span>
                </div>
                <div className="flex gap-3">
                  <span className="text-primary font-bold">Phase 3:</span>
                  <span>Responder network, KYC verification, reward system</span>
                </div>
                <div className="flex gap-3">
                  <span className="text-primary font-bold">Phase 4:</span>
                  <span>Safe zone network, Google Maps integration, ML fraud detection</span>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

// Component definitions
const StatBox = ({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) => (
  <div className="flex items-center gap-3 p-4 bg-card border border-border rounded-lg shadow-soft">
    <div className="gradient-hero p-2 rounded-lg text-white">
      {icon}
    </div>
    <div>
      <div className="text-2xl font-bold text-foreground">{value}</div>
      <div className="text-sm text-muted-foreground">{label}</div>
    </div>
  </div>
);

const FlowStep = ({ 
  number, 
  title, 
  description, 
  details, 
  color 
}: { 
  number: number; 
  title: string; 
  description: string; 
  details: string[];
  color: "primary" | "warning" | "accent" | "emergency" | "safe";
}) => {
  const colorClass = {
    primary: "bg-primary",
    warning: "bg-warning",
    accent: "bg-accent",
    emergency: "bg-emergency",
    safe: "bg-safe"
  }[color];

  return (
    <div className="flex gap-4">
      <div className={`flex-shrink-0 w-10 h-10 rounded-full ${colorClass} text-white flex items-center justify-center font-bold`}>
        {number}
      </div>
      <div className="flex-1">
        <h4 className="text-lg font-bold text-foreground mb-1">{title}</h4>
        <p className="text-muted-foreground mb-3">{description}</p>
        <ul className="space-y-1 text-sm text-muted-foreground">
          {details.map((detail, i) => (
            <li key={i} className="flex gap-2">
              <span>•</span>
              <span>{detail}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const JourneyNode = ({ text, type }: { text: string; type: "start" | "trigger" | "warning" | "action" | "success" | "end" }) => {
  const bgClass = {
    start: "bg-primary/10 border-primary",
    trigger: "bg-accent/10 border-accent",
    warning: "bg-warning/10 border-warning",
    action: "bg-secondary/10 border-secondary",
    success: "bg-safe/10 border-safe",
    end: "bg-muted border-border"
  }[type];

  return (
    <div className={`p-4 rounded-lg border-2 ${bgClass} text-center font-medium`}>
      {text}
    </div>
  );
};

const JourneyArrow = () => (
  <div className="flex justify-center">
    <div className="w-0.5 h-8 bg-border" />
  </div>
);

const JourneyBranch = ({ left, right }: { left: string; right: string }) => (
  <div className="flex items-center gap-4 text-sm text-muted-foreground">
    <div className="flex-1 text-right">{left}</div>
    <div className="text-2xl">⟵</div>
    <div className="w-4 h-4 rounded-full bg-warning" />
    <div className="text-2xl">⟶</div>
    <div className="flex-1">{right}</div>
  </div>
);

const TechCard = ({ 
  title, 
  icon, 
  technologies 
}: { 
  title: string; 
  icon: React.ReactNode; 
  technologies: Array<{ name: string; desc: string }>;
}) => (
  <Card className="p-6 shadow-soft">
    <div className="flex items-center gap-3 mb-4">
      <div className="gradient-hero p-2 rounded-lg text-white">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-foreground">{title}</h3>
    </div>
    <div className="space-y-3">
      {technologies.map((tech, i) => (
        <div key={i} className="border-l-2 border-primary/30 pl-3">
          <div className="font-medium text-foreground">{tech.name}</div>
          <div className="text-sm text-muted-foreground">{tech.desc}</div>
        </div>
      ))}
    </div>
  </Card>
);

const FeatureCard = ({ 
  icon, 
  title, 
  description, 
  features 
}: { 
  icon: React.ReactNode; 
  title: string; 
  description: string;
  features: string[];
}) => (
  <Card className="p-6 shadow-soft">
    <div className="flex items-start gap-4 mb-4">
      <div className="flex-shrink-0">
        {icon}
      </div>
      <div>
        <h3 className="text-xl font-bold text-foreground mb-1">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </div>
    <ul className="space-y-2 text-sm text-muted-foreground">
      {features.map((feature, i) => (
        <li key={i} className="flex gap-2">
          <span className="text-primary">✓</span>
          <span>{feature}</span>
        </li>
      ))}
    </ul>
  </Card>
);

const SecuritySection = ({ title, points }: { title: string; points: string[] }) => (
  <div>
    <h4 className="font-bold text-foreground mb-3">{title}</h4>
    <ul className="space-y-2 text-sm text-muted-foreground">
      {points.map((point, i) => (
        <li key={i} className="flex gap-2">
          <Shield className="h-4 w-4 text-safe flex-shrink-0 mt-0.5" />
          <span>{point}</span>
        </li>
      ))}
    </ul>
  </div>
);

export default Architecture;

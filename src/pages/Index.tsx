import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield, Zap, Users, MapPin, FileText } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden gradient-hero py-24 px-4 sm:px-6 lg:px-8 shadow-glow">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-black/30 backdrop-blur-sm border border-primary/30 px-4 py-2 rounded-full mb-6 shadow-glow">
              <Shield className="h-5 w-5 text-primary animate-pulse" />
              <span className="text-sm font-bold text-foreground">
                AI-Powered Emergency Response
              </span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6 leading-tight">
              Nirbhaya
            </h1>
            
            <p className="text-xl sm:text-2xl text-primary-foreground/90 mb-4 max-w-3xl mx-auto">
              Revolutionizing Women's Safety Through AI, IoT & Verified Community Response
            </p>
            
            <p className="text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              Bridging the critical 15-25 minute response gap with intelligent emergency detection,
              verified local responders, and real-time evidence preservation
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/dashboard">
                <Button size="lg" variant="secondary" className="shadow-soft">
                  <Zap className="mr-2 h-5 w-5" />
                  Launch SOS Dashboard
                </Button>
              </Link>
              <Link to="/architecture">
                <Button size="lg" variant="outline" className="bg-white/10 border-white/20 text-primary-foreground hover:bg-white/20">
                  <FileText className="mr-2 h-5 w-5" />
                  View Architecture
                </Button>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-1/2 -left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-1/2 -right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              How It Works
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Multi-layered protection system designed for critical moments
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon={<Zap className="h-8 w-8" />}
              title="Multi-Tap SOS"
              description="2-3 taps for standard alert, 4-5 taps activates auto-recording with 10-second cancel window"
              gradient="primary"
            />
            
            <FeatureCard
              icon={<Shield className="h-8 w-8" />}
              title="Voice Activation"
              description="Secret keyword triggers SOS when physical access is impossible, using on-device AI recognition"
              gradient="accent"
            />
            
            <FeatureCard
              icon={<Users className="h-8 w-8" />}
              title="Verified Responders"
              description="KYC-verified gig workers nearby respond before authorities arrive, earning rewards for authentic help"
              gradient="safe"
            />
            
            <FeatureCard
              icon={<MapPin className="h-8 w-8" />}
              title="Safe Zone Network"
              description="Color-coded map highlighting verified safe locations like cafes, metro stations, and stores"
              gradient="secondary"
            />
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <StatCard
              number="15-25"
              unit="minutes"
              label="Critical response gap we're closing"
            />
            <StatCard
              number="70%"
              unit=""
              label="Of assaults escalate before help arrives"
            />
            <StatCard
              number="100%"
              unit=""
              label="Evidence preserved with auto-recording"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-card">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
            Experience the Future of Safety
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Explore our interactive prototype demonstrating emergency flows, verified responder systems, and safe zone navigation
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/dashboard">
              <Button size="lg" className="shadow-glow">
                Try Interactive Demo
              </Button>
            </Link>
            <Link to="/safe-places">
              <Button size="lg" variant="outline">
                <MapPin className="mr-2 h-5 w-5" />
                View Safe Places Map
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

const FeatureCard = ({ 
  icon, 
  title, 
  description, 
  gradient 
}: { 
  icon: React.ReactNode; 
  title: string; 
  description: string;
  gradient: "primary" | "accent" | "safe" | "secondary";
}) => {
  const gradientClass = gradient === "primary" ? "gradient-hero" :
                        gradient === "safe" ? "gradient-safe" :
                        gradient === "accent" ? "bg-accent" :
                        "bg-secondary";
  
  return (
    <div className="bg-card rounded-xl p-6 shadow-soft hover:shadow-glow transition-smooth border border-border">
      <div className={`inline-flex p-3 rounded-lg mb-4 ${gradientClass}`}>
        <div className="text-white">
          {icon}
        </div>
      </div>
      <h3 className="text-xl font-bold text-foreground mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

const StatCard = ({ number, unit, label }: { number: string; unit: string; label: string }) => {
  return (
    <div className="text-center p-6 bg-card border border-border rounded-xl shadow-soft">
      <div className="text-5xl sm:text-6xl font-bold text-primary mb-2">
        {number}
        {unit && <span className="text-3xl sm:text-4xl ml-1">{unit}</span>}
      </div>
      <p className="text-lg text-foreground font-medium">{label}</p>
    </div>
  );
};

export default Index;

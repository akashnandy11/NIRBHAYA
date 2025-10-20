import { Link } from "react-router-dom";
import { ArrowLeft, MapPin, Shield, Coffee, Store, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const SafePlaces = () => {
  const safePlaces = [
    {
      id: 1,
      name: "Central Metro Station",
      type: "metro",
      distance: "0.3 km",
      rating: "High",
      verified: true,
      openNow: true,
      address: "Connaught Place, New Delhi"
    },
    {
      id: 2,
      name: "Cafe Coffee Day",
      type: "cafe",
      distance: "0.5 km",
      rating: "High",
      verified: true,
      openNow: true,
      address: "Block A, Connaught Place"
    },
    {
      id: 3,
      name: "Police Outpost - CP",
      type: "police",
      distance: "0.7 km",
      rating: "Maximum",
      verified: true,
      openNow: true,
      address: "Inner Circle, Connaught Place"
    },
    {
      id: 4,
      name: "24/7 Medical Store",
      type: "store",
      distance: "0.9 km",
      rating: "Medium",
      verified: true,
      openNow: true,
      address: "Janpath Market"
    },
    {
      id: 5,
      name: "Select Citywalk Mall",
      type: "mall",
      distance: "1.2 km",
      rating: "High",
      verified: true,
      openNow: true,
      address: "Saket District Centre"
    },
    {
      id: 6,
      name: "Starbucks - Safdarjung",
      type: "cafe",
      distance: "1.5 km",
      rating: "High",
      verified: true,
      openNow: true,
      address: "Safdarjung Enclave"
    }
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case "metro":
        return <Building2 className="h-5 w-5" />;
      case "cafe":
        return <Coffee className="h-5 w-5" />;
      case "police":
        return <Shield className="h-5 w-5" />;
      case "mall":
        return <Store className="h-5 w-5" />;
      default:
        return <MapPin className="h-5 w-5" />;
    }
  };

  const getRatingColor = (rating: string) => {
    switch (rating) {
      case "Maximum":
        return "bg-safe text-white";
      case "High":
        return "bg-safe/80 text-white";
      case "Medium":
        return "bg-warning text-white";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

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
            <h1 className="text-xl font-bold gradient-hero bg-clip-text text-transparent">
              Safe Places Network
            </h1>
            <div className="w-24" />
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Map Placeholder */}
        <Card className="mb-8 overflow-hidden shadow-soft">
          <div className="relative h-96 bg-gradient-to-br from-primary/5 to-secondary/5 flex items-center justify-center">
            <div className="absolute inset-0 opacity-10">
              <div className="grid grid-cols-8 grid-rows-6 h-full w-full">
                {Array.from({ length: 48 }).map((_, i) => (
                  <div key={i} className="border border-primary/20" />
                ))}
              </div>
            </div>
            
            <div className="relative z-10 text-center p-8">
              <MapPin className="h-16 w-16 mx-auto mb-4 text-primary" />
              <h3 className="text-xl font-bold text-foreground mb-2">
                Interactive Map View
              </h3>
              <p className="text-muted-foreground mb-4">
                Google Maps integration with color-coded safe zones
              </p>
              <div className="flex gap-4 justify-center">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-safe" />
                  <span className="text-sm text-muted-foreground">High Safety</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-warning" />
                  <span className="text-sm text-muted-foreground">Medium Safety</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-emergency" />
                  <span className="text-sm text-muted-foreground">Avoid Area</span>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Safe Places List */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground">Nearby Safe Locations</h2>
              <p className="text-muted-foreground">KYC-verified safe zones within 2 km radius</p>
            </div>
            <Button variant="outline">
              <MapPin className="mr-2 h-4 w-4" />
              Navigate to Nearest
            </Button>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {safePlaces.map((place) => (
              <Card key={place.id} className="p-6 shadow-soft hover:shadow-glow transition-smooth">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg ${
                      place.rating === "Maximum" ? "gradient-safe" : "bg-primary/10"
                    }`}>
                      <div className={place.rating === "Maximum" ? "text-white" : "text-primary"}>
                        {getIcon(place.type)}
                      </div>
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground mb-1">{place.name}</h3>
                      <p className="text-sm text-muted-foreground">{place.address}</p>
                    </div>
                  </div>
                  {place.verified && (
                    <Shield className="h-5 w-5 text-safe flex-shrink-0" />
                  )}
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge className={getRatingColor(place.rating)}>
                    {place.rating} Safety
                  </Badge>
                  {place.openNow && (
                    <Badge variant="outline" className="border-safe text-safe">
                      Open Now
                    </Badge>
                  )}
                  <Badge variant="secondary">
                    {place.distance}
                  </Badge>
                </div>

                <Button className="w-full" variant="outline" size="sm">
                  <MapPin className="mr-2 h-4 w-4" />
                  Get Directions
                </Button>
              </Card>
            ))}
          </div>
        </div>

        {/* Info Section */}
        <Card className="p-6 bg-primary/5 border-primary/20 shadow-soft">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg gradient-hero flex items-center justify-center flex-shrink-0">
              <Shield className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-foreground mb-2">How Safe Zones Work</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex gap-2">
                  <span>•</span>
                  <span>All locations are KYC-verified and monitored for safety standards</span>
                </li>
                <li className="flex gap-2">
                  <span>•</span>
                  <span>Color-coded ratings based on surveillance, lighting, and foot traffic</span>
                </li>
                <li className="flex gap-2">
                  <span>•</span>
                  <span>Real-time updates on operating hours and crowd density</span>
                </li>
                <li className="flex gap-2">
                  <span>•</span>
                  <span>Integrated with emergency responder network for faster assistance</span>
                </li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SafePlaces;

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Key, RefreshCw, BarChart3, Target, Bell } from "lucide-react";

const features = [
  {
    icon: Key,
    title: "Easy Subscriptions",
    description: "Simple one-click subscription management with secure payment processing"
  },
  {
    icon: RefreshCw,
    title: "Flexible Upgrades/Downgrades",
    description: "Seamlessly modify your plans without hassle or downtime"
  },
  {
    icon: BarChart3,
    title: "Real-time Analytics",
    description: "Comprehensive insights and reports for admins to track performance"
  },
  {
    icon: Target,
    title: "Personalized Recommendations",
    description: "AI-powered suggestions tailored to user needs and usage patterns"
  },
  {
    icon: Bell,
    title: "Smart Notifications",
    description: "Stay informed with timely alerts about renewals, upgrades, and updates"
  }
];

const FeaturesSection = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Why Choose Lumen Subscriptions?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Powerful features designed to make subscription management effortless
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="group hover:shadow-card transition-all duration-300 border-0 bg-card">
                <CardHeader className="text-center">
                  <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl text-foreground">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
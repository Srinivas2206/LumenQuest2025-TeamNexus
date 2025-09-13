import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LogIn, Settings, BarChart3 } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: LogIn,
    title: "Sign In",
    description: "Choose your role (User/Admin) and access your personalized dashboard"
  },
  {
    number: "02", 
    icon: Settings,
    title: "Manage Plans",
    description: "Subscribe, modify, or create plans with our intuitive interface"
  },
  {
    number: "03",
    icon: BarChart3,
    title: "Track & Analyze",
    description: "View usage, analytics, and get personalized recommendations"
  }
];

const HowItWorksSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            How It Works
          </h2>
          <p className="text-xl text-muted-foreground">
            Get started in just three simple steps
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="relative">
                {/* Connection line */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-primary to-primary/30 transform translate-x-4 -translate-y-1/2" />
                )}
                
                <Card className="text-center relative z-10 hover:shadow-card transition-all duration-300">
                  <CardHeader>
                    <div className="mx-auto w-16 h-16 bg-gradient-brand rounded-full flex items-center justify-center mb-4 relative">
                      <Icon className="h-8 w-8 text-white" />
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-brand-blue rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-bold">{step.number}</span>
                      </div>
                    </div>
                    <CardTitle className="text-xl text-foreground">{step.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{step.description}</p>
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
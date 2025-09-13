import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import lumenLogo from "@/assets/lumen-logo.png";
import { ArrowRight, User, UserCheck, Settings, BarChart3, Key, RefreshCw, Target, Bell, LogIn, Github, Twitter, Linkedin } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <nav className="bg-card shadow-card border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <img src={lumenLogo} alt="Lumen" className="h-8 w-auto" />
              <span className="text-xl font-bold text-foreground">Subscriptions</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#home" className="text-foreground hover:text-primary transition-colors">Home</a>
              <a href="#about" className="text-foreground hover:text-primary transition-colors">About</a>
              <a href="#features" className="text-foreground hover:text-primary transition-colors">Features</a>
              <a href="#contact" className="text-foreground hover:text-primary transition-colors">Contact</a>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="ghost">Login</Button>
              <Button variant="hero">Sign Up</Button>
            </div>
          </div>
        </div>
      </nav>

      <main>
        {/* Hero Section */}
        <section className="relative bg-gradient-hero py-20 lg:py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
                Seamless Subscription
                <span className="text-primary"> Management</span>
                <br />
                for Everyone
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-3xl mx-auto">
                Whether you're a customer or a service provider, manage subscriptions, 
                plans, and analytics in one place.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button variant="hero" size="lg" className="group">
                  Login as User
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
                <Button variant="outline" size="lg" className="group">
                  Login as Admin
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Role Cards */}
        <section className="py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Choose Your Portal
              </h2>
              <p className="text-xl text-muted-foreground">
                Access tailored features designed for your role
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <Card className="relative group hover:shadow-elevated transition-all duration-300 transform hover:-translate-y-2">
                <CardHeader className="text-center pb-6">
                  <div className="mx-auto w-16 h-16 bg-gradient-brand rounded-full flex items-center justify-center mb-4">
                    <User className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl text-foreground">End-User Portal</CardTitle>
                  <CardDescription className="text-lg">
                    Browse, subscribe, upgrade/downgrade, or cancel your plans easily.
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center text-muted-foreground">
                      <UserCheck className="h-5 w-5 text-primary mr-3" />
                      <span>Easy subscription management</span>
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <Settings className="h-5 w-5 text-primary mr-3" />
                      <span>Flexible plan modifications</span>
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <BarChart3 className="h-5 w-5 text-primary mr-3" />
                      <span>Usage tracking & insights</span>
                    </div>
                  </div>
                  <Button variant="hero" className="w-full">
                    Explore as User
                  </Button>
                </CardContent>
              </Card>

              <Card className="relative group hover:shadow-elevated transition-all duration-300 transform hover:-translate-y-2">
                <CardHeader className="text-center pb-6">
                  <div className="mx-auto w-16 h-16 bg-gradient-brand rounded-full flex items-center justify-center mb-4">
                    <Settings className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl text-foreground">Admin Portal</CardTitle>
                  <CardDescription className="text-lg">
                    Create, update, and analyze subscription plans with full control.
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center text-muted-foreground">
                      <Settings className="h-5 w-5 text-primary mr-3" />
                      <span>Complete plan management</span>
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <BarChart3 className="h-5 w-5 text-primary mr-3" />
                      <span>Advanced analytics & reports</span>
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <User className="h-5 w-5 text-primary mr-3" />
                      <span>User management tools</span>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full">
                    Explore as Admin
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Features Section */}
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
              {[
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
              ].map((feature, index) => {
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

        {/* How It Works */}
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
              {[
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
              ].map((step, index) => {
                const Icon = step.icon;
                return (
                  <div key={index} className="relative">
                    {index < 2 && (
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
      </main>

      {/* Footer */}
      <footer className="bg-card border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <img src={lumenLogo} alt="Lumen" className="h-8 w-auto" />
                <span className="text-xl font-bold text-foreground">Subscriptions</span>
              </div>
              <p className="text-muted-foreground mb-4 max-w-md">
                Seamless subscription management for everyone. Whether you're a customer 
                or service provider, manage everything in one place.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  <Github className="h-5 w-5" />
                </a>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  <Linkedin className="h-5 w-5" />
                </a>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#about" className="text-muted-foreground hover:text-primary transition-colors">About</a></li>
                <li><a href="#features" className="text-muted-foreground hover:text-primary transition-colors">Features</a></li>
                <li><a href="#contact" className="text-muted-foreground hover:text-primary transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Terms of Service</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-8 text-center">
            <p className="text-muted-foreground">
              © 2024 Lumen Subscriptions. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { User, UserCheck, BarChart3, Settings } from "lucide-react";

const RoleCards = () => {
  return (
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
          {/* User Portal Card */}
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

          {/* Admin Portal Card */}
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
  );
};

export default RoleCards;
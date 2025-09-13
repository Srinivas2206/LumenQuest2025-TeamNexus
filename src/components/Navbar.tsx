import { Button } from "@/components/ui/button";
import lumenLogo from "@/assets/lumen-logo.png";

const Navbar = () => {
  return (
    <nav className="bg-card shadow-card border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <img src={lumenLogo} alt="Lumen" className="h-8 w-auto" />
            <span className="text-xl font-bold text-foreground">Subscriptions</span>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#home" className="text-foreground hover:text-primary transition-colors">
              Home
            </a>
            <a href="#about" className="text-foreground hover:text-primary transition-colors">
              About
            </a>
            <a href="#features" className="text-foreground hover:text-primary transition-colors">
              Features
            </a>
            <a href="#contact" className="text-foreground hover:text-primary transition-colors">
              Contact
            </a>
          </div>

          {/* Login/Sign Up */}
          <div className="flex items-center space-x-3">
            <Button variant="ghost">Login</Button>
            <Button variant="hero">Sign Up</Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
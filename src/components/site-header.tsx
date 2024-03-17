import Logo from "./logo";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const SiteHeader = () => {
  return (
    <header className="bg-custom-secondary py-1 border-b-2 shadow-lg border-b-custom-accent">
      <div className="container flex items-center justify-between py-2">
        <Logo />
        <div>
          <Button>
            GitHub
            <ArrowUpRight className="w-4 h-4" />
            <span className="sr-only">GitHub</span>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default SiteHeader;

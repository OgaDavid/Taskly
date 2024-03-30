import Logo from "./logo";
import { ArrowUpRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

const SiteHeader = () => {
  return (
    <header className="bg-custom-secondary py-1 border-b-2 shadow-lg border-b-custom-accent">
      <div className="wrapper flex items-center justify-between py-2">
        <Logo />
        <div>
          <a
            target="_blank"
            className={buttonVariants({
              variant: "default",
            })}
            href=""
          >
            GitHub
            <ArrowUpRight className="w-4 h-4" />
            <span className="sr-only">GitHub</span>
          </a>
        </div>
      </div>
    </header>
  );
};

export default SiteHeader;

import { cn } from "@/lib/utils";
import { Icons } from "./icons";
import { buttonVariants } from "./ui/button";

const SiteHeader = () => {
  return (
    <header>
      <Icons.logo />
      Hello
      <div
        className={cn(
          buttonVariants({
            variant: "ghost",
          }),
          "w-9 px-0"
        )}
      >
        <Icons.gitHub className="h-4 w-4" />
        <span className="sr-only">GitHub</span>
      </div>
    </header>
  );
};

export default SiteHeader;

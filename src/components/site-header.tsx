import { Icons } from "./icons";

const SiteHeader = () => {
  return (
    <header>
      <Icons.logo />
      <div>
        <Icons.gitHub className="h-4 w-4" />
        <span className="sr-only">GitHub</span>
      </div>
    </header>
  );
};

export default SiteHeader;

import SiteHeader from "@/components/site-header";
import { ModalProvider } from "./providers/modal-provider";
import Greeting from "./components/greeting";

function App() {
  return (
    <div>
      <SiteHeader />
      <div className="container pt-10">
        <Greeting />
      </div>
      <ModalProvider />
    </div>
  );
}

export default App;

import { createRoot } from "react-dom/client";
import KollectyveWelcome from "@repo/ui/kollectvye"

const App = () => {
  return (
    <>
    <h1> Kallama PWA App</h1> 
    <KollectyveWelcome /> 
    </>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
import { AppProviders } from "@/app/providers";
import { WelcomePage } from "@/pages/welcome";

function App() {
  return (
    <AppProviders>
      <WelcomePage />
    </AppProviders>
  );
}

export default App;

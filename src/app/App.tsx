import { AppProviders } from "@/app/providers";
import { router } from "@/app/routing";
import { RouterProvider } from "react-router-dom";

function App() {
  return (
    <AppProviders>
      <RouterProvider router={router} />
    </AppProviders>
  );
}

export default App;

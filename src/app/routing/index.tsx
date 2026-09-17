import { WelcomePage } from "@/pages/welcome";
import { createBrowserRouter } from "react-router-dom";
// fsd-cli:route-imports:start
// fsd-cli:route-imports:end

export const router = createBrowserRouter([
  { path: "/", element: <WelcomePage /> },
  // fsd-cli:routes:start
  // fsd-cli:routes:end
]);

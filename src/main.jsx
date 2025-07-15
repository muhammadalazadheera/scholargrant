import { RouterProvider } from "react-router";
import { createRoot } from "react-dom/client";
import "../src/assets/css/style.css";
import router from "./routes/routes.jsx";
import AuthProvider from "./providers/AuthProvider";
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </QueryClientProvider>
);

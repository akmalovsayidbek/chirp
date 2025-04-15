import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import Login from "./pages/Login.tsx";
import Signup from "./pages/SignUp.tsx";
import Home from "./pages/Home.tsx";
import { HeroUIProvider } from "@heroui/react";
import AppContainer from "./components/AppContainer.tsx";
import { Toaster } from "react-hot-toast";
import queryClient from "./config/queryClient.ts";
import { ThemeProvider } from "next-themes";
import NotFound from "./pages/NotFound.tsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route element={<AppContainer />}>
        <Route index element={<Home />} />
        <Route path="/*" element={<NotFound />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Route>
  )
);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <HeroUIProvider>
        <ThemeProvider attribute="class" defaultTheme="dark">
          <RouterProvider router={router} />
          <Toaster />
        </ThemeProvider>
      </HeroUIProvider>
    </QueryClientProvider>
  </StrictMode>
);

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import Index from "./pages/Index";
import Technologies from "./pages/Technologies";
import Skills from "./pages/Skills";
import Profiles from "./pages/Profiles";
import Grades from "./pages/Grades";
import SkillMatrix from "./pages/SkillMatrix";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <MainLayout>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/technologies" element={<Technologies />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/profiles" element={<Profiles />} />
            <Route path="/grades" element={<Grades />} />
            <Route path="/matrix" element={<SkillMatrix />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </MainLayout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

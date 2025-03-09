import { Outlet } from 'react-router-dom';
import { ModeToggle } from "@/components/mode-toggle";
import { Toaster } from "@/components/ui/sonner";
import { useTheme } from "@/components/theme-provider";

function ThemeToaster() {
  const { theme } = useTheme();
  return <Toaster position="top-center" theme={theme as "light" | "dark"} />;
}

export default function RootLayout() {
  return (
    <>
      <div className="fixed top-4 right-4">
        <ModeToggle />
      </div>
      <Outlet />
      <ThemeToaster />
    </>
  );
} 
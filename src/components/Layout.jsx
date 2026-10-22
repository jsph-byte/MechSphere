import React, { useEffect, useState } from "react";
import { NavLink, Outlet, Link } from "react-router-dom";
import {
  LayoutDashboard, FlaskConical, Layers, Wrench, Trophy, Award, Settings,
  Sun, Moon, Menu, X, Wifi, WifiOff,
} from "lucide-react";
import { useTheme } from "@/lib/theme";
import { cn } from "@/lib/utils";

const MAIN_NAV = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/lab", label: "Experiment Lab", icon: FlaskConical },
  { to: "/materials", label: "Material Explorer", icon: Layers },
  { to: "/toolkit", label: "Toolkit", icon: Wrench },
];

const MORE_NAV = [
  { to: "/challenge", label: "Challenge", icon: Trophy },
  { to: "/progress", label: "My Progress", icon: Award },
  { to: "/settings", label: "Settings", icon: Settings },
];

function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2.5 group">
      <div className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-orange-500 to-cyan-500 text-white font-heading font-bold shadow-sm">
        M
        <span className="absolute inset-0 rounded-lg ring-1 ring-inset ring-white/20" />
      </div>
      <div className="leading-tight">
        <div className="font-heading font-bold tracking-tight text-foreground">MechSphere</div>
        <div className="text-[10px] uppercase tracking-[0.18em] text-cyan-400">Explore · Experiment · Engineer</div>
      </div>
    </Link>
  );
}

function OfflineBadge() {
  const [online, setOnline] = useState(typeof navigator !== "undefined" ? navigator.onLine : true);
  useEffect(() => {
    const on = () => setOnline(true);
    const off = () => setOnline(false);
    window.addEventListener("online", on);
    window.addEventListener("offline", off);
    return () => { window.removeEventListener("online", on); window.removeEventListener("offline", off); };
  }, []);
  if (online) return null;
  return (
    <div className="flex items-center gap-1.5 rounded-md bg-amber-500/15 px-2.5 py-1 text-xs font-medium text-amber-500">
      <WifiOff className="h-3.5 w-3.5" />
      Offline — core tools still work
    </div>
  );
}

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  return (
    <button
      onClick={toggleTheme}
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      className="flex h-9 w-9 items-center justify-center rounded-md border border-border bg-card text-muted-foreground transition-colors hover:text-foreground hover:border-ring"
    >
      {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  );
}

function SidebarLink({ to, label, icon: Icon, onClick }) {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        cn(
          "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
          isActive
            ? "bg-orange-500/10 text-orange-400 ring-1 ring-inset ring-orange-500/30"
            : "text-muted-foreground hover:bg-secondary hover:text-foreground"
        )
      }
    >
      <Icon className="h-4 w-4 shrink-0" />
      {label}
    </NavLink>
  );
}

export default function Layout() {
  const [moreOpen, setMoreOpen] = useState(false);
  const allNav = [...MAIN_NAV, ...MORE_NAV];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r border-border bg-card/60 px-4 py-5 backdrop-blur md:flex">
        <Logo />
        <nav className="mt-8 flex flex-1 flex-col gap-1">
          {allNav.map((n) => <SidebarLink key={n.to} {...n} />)}
        </nav>
        <div className="mt-4 flex items-center justify-between gap-2 border-t border-border pt-4">
          <OfflineBadge />
          <ThemeToggle />
        </div>
      </aside>

      {/* Mobile top bar */}
      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-border bg-card/80 px-4 py-3 backdrop-blur md:hidden">
        <Logo />
        <div className="flex items-center gap-2">
          <OfflineBadge />
          <ThemeToggle />
        </div>
      </header>

      <main className="px-4 pb-28 pt-6 md:ml-64 md:px-10 md:pb-12 md:pt-8">
        <div className="mx-auto w-full max-w-5xl">
          <Outlet />
        </div>
      </main>

      {/* Mobile bottom nav */}
      <nav className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-card/95 backdrop-blur md:hidden">
        <div className="grid grid-cols-5">
          {MAIN_NAV.map((n) => (
            <BottomLink key={n.to} {...n} />
          ))}
          <button
            onClick={() => setMoreOpen((o) => !o)}
            aria-label="More sections"
            className={cn(
              "flex flex-col items-center justify-center gap-1 py-2.5 text-[11px] font-medium",
              moreOpen ? "text-orange-400" : "text-muted-foreground"
            )}
          >
            {moreOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            More
          </button>
        </div>
        {moreOpen && (
          <div className="border-t border-border bg-popover px-3 py-2">
            {MORE_NAV.map((n) => (
              <SidebarLink key={n.to} {...n} onClick={() => setMoreOpen(false)} />
            ))}
          </div>
        )}
      </nav>
    </div>
  );
}

function BottomLink({ to, label, icon: Icon }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cn(
          "flex flex-col items-center justify-center gap-1 py-2.5 text-[11px] font-medium",
          isActive ? "text-orange-400" : "text-muted-foreground"
        )
      }
    >
      <Icon className="h-5 w-5" />
      {label === "Experiment Lab" ? "Lab" : label === "Material Explorer" ? "Materials" : label}
    </NavLink>
  );
}
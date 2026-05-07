import { useState } from "react";
import {
  LayoutDashboard,
  Settings,
  CreditCard,
  User,
  Users,
  ChevronLeft,
  Menu,
} from "lucide-react";
import { useUiStore } from "@/stores/uiStore";
import { Button } from "@/components/ui/Button";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: Settings, label: "Settings", href: "/settings" },
  { icon: CreditCard, label: "Billing", href: "/billing" },
  { icon: User, label: "Profile", href: "/profile" },
  { icon: Users, label: "Members", href: "/members" },
];

export function Sidebar() {
  const { sidebarOpen, setSidebarOpen } = useUiStore();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed top-0 left-0 z-40 h-screen bg-background border-r border-border transition-all duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          ${collapsed ? "w-[64px]" : "w-[240px]"}
        `}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between h-16 px-4 border-b border-border">
            {!collapsed && (
              <span className="text-lg font-semibold">Acme Inc</span>
            )}
            <Button
              variant="ghost"
              size="icon"
              className="hidden lg:flex"
              onClick={() => setCollapsed(!collapsed)}
            >
              {collapsed ? <Menu className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setSidebarOpen(false)}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
          </div>

          <nav className="flex-1 overflow-y-auto py-4">
            <ul className="space-y-1 px-2">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors
                      hover:bg-accent hover:text-accent-foreground
                      ${collapsed ? "justify-center" : ""}
                    `}
                  >
                    <item.icon className="w-4 h-4 shrink-0" />
                    {!collapsed && <span>{item.label}</span>}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </aside>
    </>
  );
}

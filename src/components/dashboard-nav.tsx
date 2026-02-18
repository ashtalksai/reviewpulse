"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, Home, Star, Tags, Settings, LogOut, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut } from "next-auth/react";
import { cn } from "@/lib/utils";

interface User {
  name?: string | null;
  email?: string | null;
  image?: string | null;
}

const navItems = [
  { href: "/dashboard", icon: Home, label: "Dashboard" },
  { href: "/reviews", icon: Star, label: "Reviews" },
  { href: "/themes", icon: Tags, label: "Themes" },
  { href: "/respond", icon: MessageSquare, label: "Respond" },
  { href: "/settings", icon: Settings, label: "Settings" },
];

export function DashboardNav({ user }: { user: User }) {
  const pathname = usePathname();

  return (
    <header className="border-b bg-white sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-lg flex items-center justify-center">
              <Bell className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-xl hidden sm:block">ReviewPulse</span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Button
                key={item.href}
                variant="ghost"
                size="sm"
                asChild
                className={cn(
                  "gap-2",
                  pathname === item.href && "bg-slate-100"
                )}
              >
                <Link href={item.href}>
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </Link>
              </Button>
            ))}
          </nav>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="gap-2">
              <Avatar className="w-7 h-7">
                <AvatarImage src={user.image || undefined} />
                <AvatarFallback>{user.name?.[0] || "U"}</AvatarFallback>
              </Avatar>
              <span className="hidden sm:block">{user.name}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem disabled>
              <span className="text-sm text-muted-foreground">{user.email}</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/settings">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => signOut({ callbackUrl: "/" })}>
              <LogOut className="w-4 h-4 mr-2" />
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Mobile nav */}
      <nav className="md:hidden flex items-center justify-around border-t py-2">
        {navItems.slice(0, 5).map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex flex-col items-center gap-1 text-xs text-muted-foreground",
              pathname === item.href && "text-violet-600"
            )}
          >
            <item.icon className="w-5 h-5" />
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}

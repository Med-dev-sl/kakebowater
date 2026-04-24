import { Gauge, type LucideIcon, MessagesSquare } from "lucide-react";

export type SiteConfig = typeof siteConfig;
export type Navigation = {
  icon: LucideIcon;
  name: string;
  href: string;
};

export const siteConfig = {
  title: "WAFAMS Software",
  description: "Water Factory Management System (WAFAMS)",
};

export const navigations: Navigation[] = [
  {
    icon: Gauge,
    name: "Dashboard",
    href: "/",
  },
  {
    icon: MessagesSquare,
    name: "Ticket",
    href: "/ticket",
  },
];

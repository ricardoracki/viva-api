import { Bell, BookOpen, CalendarCog, Cog, House, Users2 } from "lucide-react";
import { NavItem } from "../_components/nav-item";

export const Nav = () => (
  <nav className="hidden lg:flex h-full w-[216px] border border-transparent border-r-gray-700 flex-col p-3 gap-2">
    <NavItem label="Dashboard" Icon={House} href="#" active />
    <NavItem label="Eventos" Icon={CalendarCog} href="#" />
    <NavItem label="Estudos" Icon={BookOpen} href="#" />
    <NavItem label="Notificações" Icon={Bell} href="#" />
    <NavItem label="Usuários" Icon={Users2} href="#" />
    <div className="flex-1" />
    <NavItem label="Configurações" Icon={Cog} href="#" />
  </nav>
);

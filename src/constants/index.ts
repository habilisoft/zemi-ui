import {
  Book,
  Construction,
  DollarSign,
  Users,
  Boxes,
  BarChartBigIcon, BadgeDollarSign, HandCoins
} from "lucide-react";

export const MODULES = [
  {
    title: "Contabilidad",
    icon: Book,
    path: "/accounting",
  },
  {
    title: "Nómina",
    icon: Users,
    path: "/payroll",
  },
  {
    title: "Préstamos",
    icon: DollarSign,
    path: "/loans",
  },
  {
    title: "Constructora",
    icon: Construction,
    path: "/construction",
  },
  {
    title: "Catálogo de Productos",
    icon: Boxes,
    path: "/catalog",
  },
  {
    title: "Ventas",
    path: "/sales",
    icon: BarChartBigIcon
  },
  {
    title: "Rentas",
    path: "/rents",
    icon: HandCoins
  },
  {
    title: "Configuración Fiscal",
    path: "/fiscal-settings",
    icon: BadgeDollarSign
  }
];

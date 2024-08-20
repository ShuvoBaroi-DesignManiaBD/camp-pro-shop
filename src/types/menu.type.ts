import { ReactNode } from "react";

export type menuItem = {
  key: string;
  label: string;
  url: string;
  icon?: ReactNode;
  children?: [menuItem];
};

export type sidebarMenuItem = {
  key: string;
  label: string | ReactNode;
  url: string;
  icon?: ReactNode;
  children?: [sidebarMenuItem];
};

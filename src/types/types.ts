import type { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type User = {
  email: string;
  name: string;
};

export type TicketMetric = {
  date: string;
  type: "created" | "resolved";
  count: number;
};

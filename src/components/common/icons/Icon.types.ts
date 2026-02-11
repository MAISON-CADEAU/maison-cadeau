import { SVGAttributes } from "react";

export interface IIconProps extends SVGAttributes<SVGElement> {
  size?: number | string;
  color?: string;
}

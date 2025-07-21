import React from 'react';
import { CgSpinner } from 'react-icons/cg';

import classNames from "classnames";

type SpinnerType = {
  color?: Color,
  className?: string,
  sizeClass?: string
}

enum Color {
  DEFAULT = "#2564eb",
  WHITE = "white",
  YELLOW = "#fbbf24",
  GRAY = "gray"
}

const Spinner : React.FC<SpinnerType> = (
  { color = Color.YELLOW,
    className = "",
    sizeClass = "h-7 w-7"
  }) => <CgSpinner color={color} className={classNames("animate-spin", className, sizeClass)}/>;

export default Spinner;
export { Color };

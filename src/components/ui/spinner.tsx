import React from 'react';
import { CgSpinner } from 'react-icons/cg';

import classNames from "classnames";

type SpinnerType = {
  color?: Color,
  className?: string
}

enum Color {
  DEFAULT = "#2564eb",
  WHITE = "white"
}

const Spinner : React.FC<SpinnerType> = ({ color = Color.DEFAULT, className = "" }) => <CgSpinner color={color} className={classNames("animate-spin h-6 w-6", className)}/>;

export default Spinner;
export { Color };

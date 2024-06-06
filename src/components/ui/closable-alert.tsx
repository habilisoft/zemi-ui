import React, { useEffect, useRef, useState } from "react";
import {
  HiInformationCircle,
  HiExclamation,
  HiXCircle,
  HiX,
  HiCheckCircle
} from 'react-icons/hi';

type Type = {
  color: Color,
  hide?(): void,
  autoClose?: number
  className?: string
  closable?: boolean,
  children: React.ReactNode
}

export type Color = "success" | "info" | "warning" | "danger";

function getColorClass(color: Color): string {
  switch (color) {
    case "success":
      return "green";
    case "info":
      return "blue";
    case "warning":
      return "yellow";
    case "danger":
      return "red";
    default:
      return "green";
  }
}

function Icon({ color }: { color: Color }): JSX.Element {
  switch (color) {
    case "success":
      return <HiCheckCircle className="h-5 w-5 text-green-400"/>;
    case "info":
      return <HiInformationCircle className="h-5 w-5 text-blue-400"/>;
    case "warning":
      return <HiExclamation className="h-5 w-5 text-yellow-400"/>;
    case "danger":
      return <HiXCircle className="h-5 w-5 text-red-400"/>;
    default:
      return <HiInformationCircle className="h-5 w-5 text-blue-400"/>;
  }
}

const ClosableAlert: React.FC<Type> = ({
                                 children,
                                 closable =true,
                                  autoClose,
                                 color,
                                 hide,
                                 className
                               }) => {
  const [colorClass,] = useState<string>(getColorClass(color));
  const [running, setRunning] = useState(false);
  const [progress, setProgress] = useState(100);
  const intervalRef = useRef<number>();

  useEffect(() => {
    if(!autoClose) {
      return;
    }
    setRunning(true);
  },[autoClose])

  useEffect(() => {
    if (running) {
      intervalRef.current = window.setInterval(() => {
        setProgress((prev) => prev - 1);
      }, 50);
    } else {
      window.clearInterval(intervalRef.current);
    }
  }, [running]);

  useEffect(() => {
    if (progress === 0) {
      setRunning(false);
      clearInterval(intervalRef.current);
      if(hide) {
        hide()
      }
    }
  }, [progress]);


  return <div className={`bg-${colorClass}-50`}>
    {autoClose && <div style={{width: `${progress}%`}} className={`h-1 bg-${colorClass}-600 transition-all`}/>}
    <div className={` rounded-md border-${colorClass}-600 p-4 ${className}`}>
      <div className="flex">
        <div className="flex-shrink-0">
          <Icon color={color}/>
        </div>
        <div className="ml-3">
          <p className={`text-sm text-${colorClass}-700`}>
            {children}
          </p>
        </div>
        {closable && <div className="ml-auto pl-3">
          <div className="-mx-1.5 -my-1.5">
            <button
              onClick={hide}
              type="button"
              className={`inline-flex rounded-md bg-${colorClass}-50 p-1.5 text-${colorClass}-500 hover:bg-${colorClass}-100 focus:outline-none focus:ring-2 focus:ring-${colorClass}-600 focus:ring-offset-2 focus:ring-offset-${colorClass}-50`}
            >
              <span className="sr-only">Dismiss</span>
              <HiX className="h-5 w-5" aria-hidden="true"/>
            </button>
          </div>
        </div>}
        <span
          className="text-yellow-500 text-yellow-700 bg-green-600 bg-red-600 bg-yellow-600 hidden bg-red-50 bg-yellow-50 bg-green-50 bg-blue-50 text-green-700 text-red-700 text-green-500 border-green-600 border-blue-600 border-yellow-600 border-red-600"/>
      </div>
    </div>
  </div>
};

export default ClosableAlert

import { ReactNode } from 'react';

type Props = {
  title: ReactNode | string;
  children: ReactNode | string;
  bg?: "gray" | "white";
}

export function FactRow(
  {
    title,
    children,
    bg = "gray"
  }: Props
) {

  const bgClass = bg === "gray" ? "bg-gray-50" : "bg-white";

  return (
    <div className={`px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3 ${bgClass}`}>
      <dt className="text-sm font-bold leading-6 text-gray-900">{title}</dt>
      <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{children}</dd>
    </div>
  );
}

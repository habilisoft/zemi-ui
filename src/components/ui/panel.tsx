import { ReactNode } from 'react';

type Props = {
  children: ReactNode
  title: string | ReactNode
}

export default function Panel(
  {
    children,
    title
  }: Props

) {
  return (
    <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow">
      <div className="px-4 py-2 sm:px-6 bg-muted border-gray-200">
        <h2 className="text-sm font-bold text-gray-900">{title}</h2>
      </div>
      <div className="px-4 py-5 sm:p-6">
        {children}
      </div>
    </div>
  )
}

import { ReactNode } from 'react';
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from '@/lib/utils.ts';

const variants = cva(
  "",
  {
    variants: {
      padding: {
        none: "",
        default: "px-4 py-5 sm:p-6",
        narrow: "px-4 py-1 sm:px-6",
      }
    },
    defaultVariants: {
      padding: "default"
    }
  }
)

export interface PanelProps extends VariantProps<typeof variants> {
  children: ReactNode
  title: string | ReactNode
}

export default function Panel(
  {
    children,
    title,
    padding = "default",
  }: PanelProps

) {
  return (
    <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white border ">
      <div className="px-4 py-2 sm:px-6 bg-gray-50 border-gray-200">
        <h2 className="text-sm font-bold text-gray-900">{title}</h2>
      </div>
        <div
          className={cn(variants({ padding }))}>
          {children}
        </div>
    </div>
  )
}

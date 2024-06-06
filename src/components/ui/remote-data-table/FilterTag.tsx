import { HiX } from "react-icons/hi";

type Props = {
  remove: () => void,
  label: string,
  value: string
}

export default function FilterTag({remove, label, value} : Props) {
  return (
    <div className="rounded-md bg-blue-50 p-1">
      <div className="flex">
        <div className="ml-3">
          <p className="text-sm font-medium text-blue-800">
            {label}: {value}
          </p>
        </div>
        <div className="ml-auto pl-3">
          <div className="-mx-1 -my-1">
            <button
              type="button"
              onClick={remove}
              className="inline-flex bg-blue-50 rounded-md p-1.5 text-blue-500 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-50 focus:ring-blue-600"
            >
              <span className="sr-only">Dismiss</span>
              <HiX className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

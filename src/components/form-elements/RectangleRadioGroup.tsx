import { Radio, RadioGroup } from '@headlessui/react';
import { CircleCheck } from 'lucide-react';

type Props = {
  value: string,
  onChange: (value: string) => void,
  options: {label: string, value: string}[]
}


export const RectangleRadioGroup = ({
  value,
  onChange,
  options,
                                    } : Props) => {

  return (
    <RadioGroup
      value={value}
      onChange={onChange}
      className="flex gap-y-6 sm:gap-x-4 gap-x-2"
    >
      {options.map((option) => (
        <Radio
          key={option.value}
          value={option.value}
          aria-label={option.label}
          className="group relative flex cursor-pointer rounded-lg border border-gray-300 bg-white py-2 px-3 shadow-sm focus:outline-none data-[focus]:border-gray-800 data-[focus]:ring-2 data-[focus]:ring-gray-800"
        >
          <span className="flex flex-1 ">
              <span className="flex flex-col">
                <span className="block text-sm font-bold text-gray-900">{option.label}</span>
              </span>
            </span>
          <CircleCheck
            aria-hidden="true"
            className="ml-4 h-5 w-5 text-gray-800 [.group:not([data-checked])_&]:invisible"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -inset-px rounded-lg border-2 border-transparent group-data-[focus]:border group-data-[checked]:border-gray-800"
          />
        </Radio>
      ))}
    </RadioGroup>
  )

}

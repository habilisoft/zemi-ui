import { FC } from 'react';
import cn from 'classnames';

import { Transition, TransitionChild } from "@headlessui/react";
import { LoaderCircle } from 'lucide-react';

type OverlayType = {
  show: boolean,
  text?: string,
  center?: boolean
}

const Overlay: FC<OverlayType> = ({ show, text, center = false }) => (
  <Transition show={show}>
    <TransitionChild
      enter="ease-in-out duration-500"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="ease-in-out duration-500"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      {() => (
        <div className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity z-10 flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
             aria-hidden="true">
                            <span className="hidden sm:inline-block sm:align-middle sm:h-screen"
                                  aria-hidden="true"/>
          <div
            className="inline-block align-bottom px-4 pt-5 pb-4 text-left overflow-hidden transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
            <h3 className="text-xl leading-6 font-medium text-white">
              <LoaderCircle className={cn("mr-4 h-4 w-4 animate-spin",{"mx-auto": center})} />
              {text}
            </h3>
          </div>
        </div>

      )}
    </TransitionChild>
  </Transition>
)

export default Overlay;

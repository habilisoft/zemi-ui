import * as Tooltip from '@radix-ui/react-tooltip';
import { IoInformationCircleOutline } from 'react-icons/io5';
import './styles.css';

type Props = {
  text: string;
}

export function FormHelpIcon(
  {
    text
  }: Props
) {

  return (
    <div>
      <Tooltip.Provider delayDuration={0}>
        <Tooltip.Root>
          <Tooltip.Trigger asChild>
            <div>
              <IoInformationCircleOutline
                className="cursor-pointer font-bold hover:text-gray-700 text-gray-500 text-lg"/>
            </div>
          </Tooltip.Trigger>
          <Tooltip.Portal>
            <Tooltip.Content className="TooltipContent" sideOffset={5}>
              {text}
              <Tooltip.Arrow className="TooltipArrow"/>
            </Tooltip.Content>
          </Tooltip.Portal>
        </Tooltip.Root>
      </Tooltip.Provider>
    </div>
  )
}

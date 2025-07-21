import React, { Ref } from 'react';
import { Input, InputProps } from '@/components/ui/input.tsx';
import * as Tooltip from '@radix-ui/react-tooltip';

interface TooltipValidatedInputProps extends InputProps {
  validationError: string
  required?: boolean
}

const TooltipValidatedInput:
  React.FC<TooltipValidatedInputProps & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>> = React.forwardRef((props, ref: Ref<HTMLInputElement>) => {

  const {
    type = 'text',
    required,
    validationError = "",
    ...op
  } = props;

  return (
    <Tooltip.Provider delayDuration={0}>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <Input
            type={type}
            aria-invalid={(!!validationError)}
            ref={ref}
            {...op}/>
        </Tooltip.Trigger>

        {validationError && <Tooltip.Portal>
          <Tooltip.Content className="TooltipContent" sideOffset={5}>
            {validationError}
            <Tooltip.Arrow className="TooltipArrow"/>
          </Tooltip.Content>
        </Tooltip.Portal>}
      </Tooltip.Root>
    </Tooltip.Provider>)
});

export default TooltipValidatedInput;

import * as React from 'react';
import { Button, ButtonProps } from '@/components/ui/button.tsx';
import { LoaderCircle } from 'lucide-react';

type Props = {
  busy: boolean
} & ButtonProps;

const AsyncActionButton = React.forwardRef<HTMLButtonElement, Props>(props => {
  const { busy, children, ...rest } = props;
  return (
    <Button {...rest} disabled={busy}>
      {busy && (
        <LoaderCircle className="mr-2 h-4 w-4 animate-spin"/>
      )}
      {children}
    </Button>
  );
})

export default AsyncActionButton;

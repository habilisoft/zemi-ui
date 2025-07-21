import { Button } from '@/components/ui/button.tsx';

type Props = {
  message: string;
  buttonText: string;
  onClick: () => void;
  illustration: string;
}

export const NoDataPlaceholder = (
  {
    message,
    buttonText,
    onClick,
    illustration
  }: Props
) => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full gap-4 transition">
      <img src={illustration} alt="illustration" className="h-48"/>
      <p className="text-lg font-bold">{message}</p>
      <Button onClick={onClick}>
        {buttonText}
      </Button>
    </div>
  )
}

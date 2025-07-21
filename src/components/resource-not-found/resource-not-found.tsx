import { Button } from '@/components/ui/button.tsx';
import NotFound from '@/assets/illustrations/not-found.svg';
import { useNavigate } from 'react-router-dom';

type Props = {
  message?: string;
  buttonText?: string;
  onClick?: () => void;
}

export const ResourceNotFound = (
  {
    message = "Recurso no encontrado",
    buttonText = "Volver atrás",
    onClick,
  }: Props
) => {
  const navigate = useNavigate();
  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      navigate(-1);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center w-full h-full gap-4 transition">
      <img src={NotFound} alt="illustration" className="h-48"/>
      <p className="text-lg font-bold">{message}</p>
      <Button onClick={handleClick}>
        {buttonText}
      </Button>
    </div>
  )
}

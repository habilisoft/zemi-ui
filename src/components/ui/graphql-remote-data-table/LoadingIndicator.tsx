import Spinner from '@/components/ui/spinner';

function LoadingIndicator() {
  return <div className="w-full max-w-container mx-auto py-4 text-center flex items-center justify-center border-t"> <Spinner/> <span className="ml-2 text-sm text-gray-700">Cargando registros...</span></div>;
}

export default LoadingIndicator;

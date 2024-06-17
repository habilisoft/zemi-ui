import Spinner, { Color } from '@/components/ui/spinner.tsx';

function PageLoader() {
  return (
    <div className="page-loader flex h-screen">
      <div className="m-auto">
        <Spinner className="h-10 w-10" color={Color.YELLOW}/>
      </div>
    </div>
  );
}

export { PageLoader };

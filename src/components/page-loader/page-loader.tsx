import Spinner, { Color } from '@/components/ui/spinner.tsx';

function PageLoader() {
  return (
    <div className="page-loader flex h-screen">
      <div className="m-auto">
        <Spinner className="h-7 w-7" color={Color.YELLOW}/>
      </div>
    </div>
  );
}

export { PageLoader };

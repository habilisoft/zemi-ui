export const HalfScreenContainer = ({ children } : { children: React.ReactNode }) => {
  return (
    <div className="sm:max-w-md max-w-full">
        {children}
    </div>
  );
}

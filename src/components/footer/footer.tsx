import { ExchangeRate } from "@/components/exchange-rate";

export const Footer = () => {
  return (
    <footer className="bg-neutral-900 py-2 px-10 flex justify-end text-sm">
      <ExchangeRate />
    </footer>
  );
};

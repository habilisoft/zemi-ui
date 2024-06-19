import { Info, AlertTriangle } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "../ui/button";
import { ExchangeRateService } from "@/services/exchange-rate.service";
import { useEffect, useState } from 'react';
import { IExchangeRateResponse } from '@/types';
import { Messages } from '@/lib/constants.tsx';
import ClosableAlert from '@/components/ui/closable-alert.tsx';
import Spinner, { Color } from '@/components/ui/spinner.tsx';
import Formats from '@/lib/formatters.ts';

export function ExchangeRate() {
  const service  = new ExchangeRateService();
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true);
  const [setting, setSetting] = useState(false);
  const [changingSource, setChangingSource] = useState(false);
  const [exchangeRate, setExchangeRate] = useState<IExchangeRateResponse>({} as IExchangeRateResponse);
  const [sources, setSources] = useState<Record<string, string>[]>([]);

  useEffect(() => {
   refresh();
   loadSources();
  }, []);

  function loadSources() {
    service.getSources()
      .then((data) => {
        setSources(data)
      })
      .catch(({response}) => {
        console.error(response?.data?.message || Messages.UNEXPECTED_ERROR);
      });
  }

  function changeSource(newSource: string) {
    setChangingSource(true);
    service.changeSource({from: 'USD', to: 'DOP', source: newSource})
      .then((data) => {
        setExchangeRate(data);
        setSetting(false)
      })
      .catch(({response}) => {
        setError(response?.data?.message || Messages.UNEXPECTED_ERROR);
      })
      .finally(() => {
        setChangingSource(false);
      });
  }

  function refresh() {
    setError(null);
    setLoading(true);
    service.getExchangeRate({from: 'USD', to: 'DOP'})
      .then((data) => {
        setExchangeRate(data);
      })
      .catch(({response}) => {
        setError(response?.data?.message || Messages.UNEXPECTED_ERROR);
      })
      .finally(() => {
        setTimeout(()=>{
          setLoading(false)
        }, 300)
      });
  }

  useEffect(() => {
    if(!open) {
      setTimeout(()=>setSetting(false),300);
    }
  }, [open]);

  useEffect(() => {
    setError(null);
  }, [setting]);

  return (
    <Popover
      open={open}
      onOpenChange={setOpen}>
      <PopoverTrigger
        className="flex items-center gap-2 text-white hover:text-amber-400">
        Tasa de Cambio:
        {(!loading && !error) && <>
          {Formats.currency({ currency: exchangeRate.to, value: exchangeRate.buy})}
          <Info size={14} />
        </>}
        {(loading && !open ) && <Spinner color={Color.YELLOW} />}
        {(error && !open) && <AlertTriangle className="text-red-900"/>}

      </PopoverTrigger>
      <PopoverContent
        align="end"
        className="w-[300px] bg-neutral-900 border-neutral-700 text-white"
      >
        {setting && <Setting
          currentSource={exchangeRate.source.name}
          setSetting={setSetting}
          sources={sources}
          error={error}
          changeSource={changeSource}
          changingSource={changingSource}/>}
        {!setting && <Viewing
          error={error}
          loading={loading}
          setSetting={setSetting}
          exchangeRate={exchangeRate}
          refresh={refresh}/>}
      </PopoverContent>
    </Popover>
  );
}

function Setting(
  {
    setSetting,
    sources,
    changeSource,
    changingSource,
    currentSource,
    error
  }: {
    setSetting: (value: boolean) => void
    sources: Record<string, string>[],
    changeSource: (newSource: string) => void,
    changingSource: boolean,
    currentSource: string,
    error: string | null
  }
){
  const [source, setSource] = useState('');
  return (
    <div>
      {error && <ClosableAlert color="danger">{error}</ClosableAlert>}
      <div className="text-white">
        <p className="text-xs">Fuente</p>
        <select
          onChange={(e) => setSource(e.target.value)}
          defaultValue={currentSource}
          className="w-full bg-neutral-800 text-white p-2 rounded-md">
          {sources.map((source) => <option key={source.name} value={source.name}>{source.displayName}</option>)}
        </select>
      </div>
      <div className="flex items-center justify-between pt-8">
        <Button
          disabled={changingSource || source === currentSource}
          onClick={() => changeSource(source)}
          variant="secondary">
          {changingSource && <Spinner color={Color.YELLOW} className="mr-2"/>} Guardar
        </Button>
        <Button
          disabled={changingSource}
          onClick={() => setSetting(false)}
          variant="secondary">Cancelar</Button>
      </div>
    </div>
  )
}

function Viewing(
  { error, loading, exchangeRate, refresh, setSetting }
    : {
    error: string | null,
    loading: boolean,
    exchangeRate: IExchangeRateResponse,
    refresh: () => void,
    setSetting: (value: boolean) => void
  }
) {
  return (
    <>
      {error && <ClosableAlert color="danger">{error}</ClosableAlert>}
      {loading && <div className=""><Spinner color={Color.YELLOW} className="mx-auto"/></div>}
      {(!error && !loading) && <div className="p-4 space-y-2">
        <div className="text-white">
          <p className="text-lg">Tasa de Dólar</p>
        </div>
        <div className="text-white">
          <p className="text-xs">Compra</p>
          <p className="text-lg text-amber-400">{Formats.currency({ currency: exchangeRate.to, value: exchangeRate.buy})}</p>
        </div>
        <div className="text-white">
          <p className="text-xs">Venta</p>
          <p className="text-lg text-amber-400">{Formats.currency({ currency: exchangeRate.to, value: exchangeRate.sell})}</p>
        </div>
        <div className="text-white">
          <p className="text-xs">Fuente</p>
          <p className="text-lg text-amber-400">{exchangeRate.source.displayName}</p>
        </div>
      </div>}
      <div className="flex items-center justify-between pt-8">
        <Button
          disabled={loading}
          onClick={refresh}
          variant="secondary">
          {loading && <Spinner  color={Color.YELLOW} className="mr-2"/>} Actualizar
        </Button>
        <Button
          onClick={() => setSetting(true)}
          variant="secondary">Configurar</Button>
      </div>
    </>
  )
}

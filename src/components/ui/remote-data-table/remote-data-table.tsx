import {
  useState,
  useEffect,
  ChangeEvent, MutableRefObject
} from "react";
import { Search } from "lucide-react";
import InfiniteScroll from 'react-infinite-scroll-component';

import axios from "axios";
import Spinner from "@/components/ui/spinner";

import LoadingIndicator from './LoadingIndicator';
import { Messages } from '@/lib/constants';
import ClosableAlert from '@/components/ui/closable-alert';
import './styles.css';
import { Checkbox } from '@/components/ui/checkbox.tsx';
import cn from 'classnames';

export type Column = {
  header?: string,
  style?: Record<string, unknown>,
  width?: string,
  render?(cell: unknown, row: Record<string, unknown> | unknown): string | number | JSX.Element,
  onClick?(cell: unknown, record: Record<string, string | number>): void,
  field: string
}

type Props = {
  path: string,
  columns: Column[],
  isSearchable?: boolean,
  hover?: boolean,
  useOr?: boolean
  reload?: boolean,
  gridChanged: boolean,
  searchFields?: unknown[],
  filters?: Record<string, unknown>[],
  placeholder?: string,
  actionColumnWidth?: number,
  cardProps?: Record<string, unknown>,
  ref?: MutableRefObject<unknown>,
  onRowClick?(record: Record<string, string | number>): void,
  updateData?(): void
  clearFilters?(): void,
  style: Record<string, string> | undefined,
  defaultPageSize: number,
  onSelect?(record: string): void,
  selected?: string[],
  idColumn?: string
}

type Pagination = {
  page: number,
  size: number,
  totalPages: number,
  totalElements: number,
  last: boolean,
  scrolling: boolean,
  reload: boolean
}

const RemoteDataTable = ({
                           reload,
                           gridChanged = true,
                           columns,
                           isSearchable = true,
                           useOr = true,
                           searchFields,
                           filters,
                           updateData,
                           defaultPageSize = 15,
                           path,
                           cardProps,
                           onRowClick,
                           style = {},
                           placeholder = "Buscar",
                           onSelect,
                           selected = [],
                           idColumn = "id",
                         }: Props) => {
  const [pagination, setPagination] = useState<Pagination>({
    page: 0,
    size: defaultPageSize,
    reload: false
  } as Pagination);
  const [busy, setBusy] = useState<boolean>(true);
  const [records, setRecords] = useState<[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [error, setError] = useState(undefined);

  /* const filterChange = (e) => {

    let state = this.state;f
    state.filters[e.target.name] = e.target.value;
    state.pageable.page = 0;

    if (filterTimeout !== "undefined") {
      clearTimeout(filterTimeout);
    }
    const ft = setTimeout(() => {
      search();
    }, 500);

    setFilterTimeout(ft);

  }; */

  /* const handleSelection = (e) => {
    this.props.handleSelection(e);
    this.props.close();
  } */

  const search = () => {
    let query = "?";

    if (searchFields) {
      searchFields.forEach((field) => {
        if (searchTerm) {
          query += `${field}${useOr ? `~` : ''}=${encodeURIComponent(searchTerm)}&`;
        }
      });
    }

    if (filters) {
      filters.forEach((filter) => {
        query += `${filter.field}${useOr ? `~` : ''}=${filter.value}&`;
      });
    }

    query += `_page=${pagination.page}&_size=${pagination.size}`;
    setBusy(true);
    setError(undefined);
    axios
      .get(`${path}${query}`)
      .then(({ data }) => {
        setRecords(pagination.scrolling ? records.concat(data.content || []) : data.content || []);
        setPagination({
          page: data.number,
          totalElements: data.totalElements,
          totalPages: data.totalPages,
          size: data.size,
          last: data.last,
          scrolling: false,
          reload: pagination.reload
        });
        if (typeof updateData === "function") {
          updateData();
        }
      })
      .catch(({ response }) => {
        setError(response?.data?.message || Messages.UNEXPECTED_ERROR)
        setBusy(false);
      })
      .finally(() => {
        setBusy(false)
      });
  };

  const searchTermChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setPagination({ ...pagination, page: 0 });
  };

  const next = () => {
    if (pagination.last) {
      return;
    }
    setPagination({ ...pagination, page: pagination.page + 1, scrolling: true });
  };

  useEffect(() => {
    setPagination({ ...pagination, page: 0, reload: !pagination.reload });
    setSearchTerm("");
  }, [filters]);

  useEffect(() => {
    const ft = setTimeout(() => {
      search();
    }, 500);

    return () => {
      clearTimeout(ft);
    }
    // eslint-disable-next-line
  }, [reload, pagination.page, searchTerm, pagination.reload]);

  useEffect(() => {
    setPagination({ page: 0, size: defaultPageSize, reload: false, totalElements: 0 } as Pagination)
    setBusy(true);
    setRecords([])
  }, [gridChanged])

  return (<div className="shadow ring-1 ring-black ring-opacity-5 md:rounded-lg" data-toggle="lists" {...cardProps}>

    {isSearchable && <div className="align-items-center">
      { /* <form className="row align-items-center">
            <div className="col-auto pr-0">
              {busy
                ? <Spinner size="sm" className="text-muted"/>
                : <span className="fe fe-search text-muted"/>}
            </div>
            <div className="col">
              <input onChange={searchTermChange} type="search"
                // eslint-disable-next-line
                     autoFocus
                     className="form-control form-control-flush search"
                     placeholder={placeholder}/>
            </div>
          </form> */}
      <div className="flex-1 min-w-0 ">
        <label htmlFor="search" className="sr-only">Buscar</label>
        <div className="relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {busy ? <Spinner/> : <Search className="h-5 w-5 text-gray-400"/>}
          </div>
          <input type="search"
                 value={searchTerm}
                 onChange={searchTermChange}
                 className="focus:outline-none focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-3 pr-4"
                 placeholder={placeholder}/>
        </div>
      </div>
    </div>}

    {/*    {(filters && filters.length) > 0 && <div className="p-2 flex space-x-1">
      {filters.map((f,i) => <FilterTag key={i}
                                       value={f.displayValue}
                                       label={f.displayLabel}
                                       remove={()=>clearFilters && clearFilters(f)}/>)}
      </div>}*/}

    <div className="table-responsive overflow-auto data-grid"
         style={style}
         id="grid-container">
      <InfiniteScroll
        style={{ overflow: "unset" }}
        next={next}
        hasMore={!pagination.last}
        hasChildren={!busy}
        loader={<LoadingIndicator/>}
        scrollableTarget="grid-container"
        dataLength={records.length}>
        <table className="data-grid-table">
          <thead className="bg-gray-50 sticky top-0">
          <tr>
            {onSelect && <th style={{ width: "40px" }}></th>}
            {columns && columns.map((column, index) => (<th style={column.style}
                                                            key={index}>{column.header}</th>))}
          </tr>
          </thead>
          <tbody>
          {records && records.map((record, i) => {
            const isSelected = selected?.includes(record[idColumn]);
            return (<tr key={i}
                        style={{ cursor: (typeof onRowClick === "function" || typeof onSelect === 'function') ? "pointer" : "" }}
                        className={cn({"selected": isSelected})}
                        onClick={() => {
                          if (typeof onRowClick === "function") {
                            onRowClick(record)
                            return;
                          }
                          if(typeof onSelect === 'function') {
                            onSelect(record[idColumn])
                          }
                        }}>
              {onSelect && <th style={{ width: "40px" }}>
                <Checkbox
                  checked={isSelected}
                  onCheckedChange={() => onSelect(record[idColumn])}
                />
              </th>}
              {columns && columns.map((column, j) => (<td key={j}
                                                          onClick={(e) => {
                                                            if (!column.onClick) {
                                                              return
                                                            }
                                                            e.stopPropagation();
                                                            column.onClick(record[column.field], record)
                                                          }}
                                                          style={column.style}>
                {column.render ? column.render(record[column.field], record) : record[column.field]}
              </td>))}
            </tr>)
          })}

          {(!busy && !error && (!records || records.length < 1)) && <tr>
            <td style={{ padding: 0 }} colSpan={columns.length + (onSelect ? 1 : 0)}><ClosableAlert closable={false} color="warning">No se
              encontraron registros</ClosableAlert></td>
          </tr>}
          {(!busy && error) && <tr>
            <td style={{ padding: 0 }} colSpan={columns.length + (onSelect ? 1 : 0) }><ClosableAlert closable={false}
                                                                               color="danger">{error}</ClosableAlert>
            </td>
          </tr>}
          </tbody>
        </table>
      </InfiniteScroll>
    </div>
    <nav className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6"
         aria-label="Pagination">
      <div className="block">
        <p className="text-sm text-gray-700">
          Mostrando &nbsp;
          <span className="font-medium">{records.length}</span>
          &nbsp; de &nbsp;
          <span className="font-medium">{pagination.totalElements}</span>
          &nbsp; resultados
        </p>
      </div>
    </nav>
  </div>);
}

export { RemoteDataTable };

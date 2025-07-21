import {
  useState,
  useEffect,
  ChangeEvent, MutableRefObject, ReactNode, JSX
} from "react";
import { Search } from "lucide-react";
import InfiniteScroll from 'react-infinite-scroll-component';

import Spinner from "@/components/ui/spinner";

import LoadingIndicator from './LoadingIndicator';
import { Messages } from '@/lib/constants';
import ClosableAlert from '@/components/ui/closable-alert';
import './styles.css';
import { Checkbox } from '@/components/ui/checkbox.tsx';
import cn from 'classnames';
import { DocumentNode } from 'graphql/language';
import { ApolloError, useQuery } from '@apollo/client';
import { IEdge, IPageInfo } from '@/types';

export type Column = {
  header?: string,
  style?: Record<string, unknown>,
  width?: string,
  render?(cell: unknown, row: Record<string, unknown> | unknown): string | number | ReactNode,
  onClick?(cell: unknown, record: Record<string, string | number>): void,
  field: string
}

type Props = {
  query: DocumentNode,
  collectionName: string
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
  onRowClick?(record: unknown): void,
  updateData?(): void
  clearFilters?(): void,
  style: Record<string, string> | undefined,
  defaultPageSize: number,
  onSelect?(record: string): void,
  selected?: string[],
  idColumn?: string,
  noDataPlaceholder?: JSX.Element | undefined
}
const GraphQLRemoteDataTable = ({
                                  columns,
                                  isSearchable = true,
                                  defaultPageSize = 20,
                                  query,
                                  cardProps,
                                  onRowClick,
                                  style = {},
                                  placeholder = "Buscar",
                                  onSelect,
                                  selected = [],
                                  idColumn = "id",
                                  collectionName,
                                  noDataPlaceholder
                                }: Props) => {
  const [pageInfo, setPageInfo] = useState<IPageInfo>({
    startCursor: "",
    endCursor: "",
    hasNextPage: false,
    hasPreviousPage: false
  });

  const [busy, setBusy] = useState<boolean>(true);
  const [records, setRecords] = useState<never[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [error, setError] = useState<string | undefined>();
  const [hasLoaded, setHasLoaded] = useState(false);
  const [scrolling, setScrolling] = useState(true);

  const { data, loading, fetchMore } = useQuery(query, {
    variables: {
      first: defaultPageSize,
    }
  });

  useEffect(() => {
    setBusy(loading);
  }, [loading]);

  useEffect(() => {
    if (!data) {
      return;
    }
    setRecords(data[collectionName].edges.map((edge: IEdge<any>) => edge.node));
    setPageInfo(data[collectionName].pageInfo as IPageInfo);
    setHasLoaded(true);
  }, [data]);

  const next = () => {
    if (!pageInfo.hasNextPage) {
      return;
    }
    setScrolling(true);
  };

  useEffect(() => {
    if(!scrolling){
      return;
    }
    doSearch();
  }, [scrolling]);

  const doSearch = () => {
    const variables: Record<string, any> = {
      first: defaultPageSize
    }

    if(pageInfo.endCursor && scrolling) {
      variables.after = pageInfo.endCursor;
    }

    if(searchTerm) {
      variables['name'] = searchTerm
    }

    fetchMore({
      variables,
      updateQuery: (_, { fetchMoreResult }) => {
        const newRecords = fetchMoreResult[collectionName].edges.map((edge: IEdge<any>) => edge.node);
        setRecords(scrolling ? records.concat(newRecords || []) : newRecords || []);
        setPageInfo(fetchMoreResult[collectionName].pageInfo as IPageInfo);
        setHasLoaded(false);
      },
    }).catch((reason: ApolloError) => {
      setError(reason.networkError ? Messages.UNEXPECTED_ERROR
        : reason.message || Messages.UNEXPECTED_ERROR);
    }).finally(() => setScrolling(false))
  }

  const searchTermChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setPageInfo({ ...pageInfo, after: undefined } as IPageInfo);
    setScrolling(false);
  };

  useEffect(() => {
    const ft = setTimeout(() => {
      doSearch();
    }, 500);

    return () => {
      clearTimeout(ft);
    }
  }, [searchTerm]);

  if (noDataPlaceholder && !hasLoaded && busy) {
    return <Spinner/>
  }

  if (noDataPlaceholder && records.length < 1 && hasLoaded) {
    return noDataPlaceholder;
  }

  return (<div className="shadow ring-1 ring-black ring-opacity-5 md:rounded-lg" data-toggle="lists" {...cardProps}>

    {isSearchable && <div className="align-items-center">
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
    <div className="table-responsive overflow-auto data-grid"
         style={style}
         id="grid-container">
      <InfiniteScroll
        style={{ overflow: "unset" }}
        next={next}
        hasMore={pageInfo.hasNextPage}
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
                        className={cn({ "selected": isSelected })}
                        onClick={() => {
                          if (typeof onRowClick === "function") {
                            onRowClick(record)
                            return;
                          }
                          if (typeof onSelect === 'function') {
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
            <td style={{ padding: 0 }} colSpan={columns.length + (onSelect ? 1 : 0)}><ClosableAlert closable={false}
                                                                                                    color="warning">No
              se
              encontraron registros</ClosableAlert></td>
          </tr>}
          {(!busy && error) && <tr>
            <td style={{ padding: 0 }} colSpan={columns.length + (onSelect ? 1 : 0)}><ClosableAlert closable={false}
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
          &nbsp;resultados
        </p>
      </div>
    </nav>
  </div>);
}

export { GraphQLRemoteDataTable };

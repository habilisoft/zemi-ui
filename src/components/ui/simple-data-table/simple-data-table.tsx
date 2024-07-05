import ClosableAlert from '@/components/ui/closable-alert';
import './styles.css';
import { Checkbox } from '@/components/ui/checkbox.tsx';
import cn from 'classnames';
import { CheckedState } from '@radix-ui/react-checkbox';

export type Column = {
  header?: string,
  style?: Record<string, unknown>,
  width?: string,
  render?(cell: unknown, row: Record<string, unknown> | unknown): string | number | JSX.Element,
  onClick?(cell: unknown, record: Record<string, string | number>): void,
  field: string
}

type Props = {
  columns: Column[],
  selectedRecords?: string[],
  idColumn?: string,
  hover?: boolean,
  placeholder?: string,
  actionColumnWidth?: number,
  cardProps?: Record<string, unknown>,
  onRowClick?(record: Record<string, string | number>): void,
  style: Record<string, string> | undefined,
  records: [],
  setSelectedRecords?(records: string[]): void,
}

const SimpleDataTable = ({

                           columns,
                           cardProps,
                           onRowClick,
                           records,
                           setSelectedRecords,
                           selectedRecords = [],
                           idColumn = "id",
                           style = {},
                         }: Props) => {


  function handleSelect(selected: string) {
    if(!setSelectedRecords) return;
    if (selected == "all") {
      setSelectedRecords(records.map((record: Record<string, string | number>) => record[idColumn] as string));
      return
    }
    if (selected == "none") {
      setSelectedRecords([]);
      return
    }

    const index = selectedRecords.indexOf(selected);
    if (index > -1) {
      setSelectedRecords(selectedRecords.filter((r) => r !== selected));
    } else {
      setSelectedRecords([...selectedRecords, selected]);
    }
  }

  return (<div className="shadow ring-1 ring-black ring-opacity-5 md:rounded-lg" data-toggle="lists" {...cardProps}>

    <div className="table-responsive overflow-auto data-grid"
         style={style}
         id="grid-container">
      <table className="data-grid-table">
        <thead className="bg-gray-50 sticky top-0">
        <tr>
          {setSelectedRecords && <th style={{ width: "40px" }}>
            <Checkbox
              checked={selectedRecords?.length === records.length}
              onCheckedChange={(checked: CheckedState) => {
                if (checked) {
                  handleSelect("all")
                } else {
                  handleSelect("none")
                }
              }}
            />
          </th>}
          {columns && columns.map((column, index) => (<th style={column.style}
                                                          key={index}>{column.header}</th>))}
        </tr>
        </thead>
        <tbody>
        {records && records.map((record, i) => {
          const isSelected = selectedRecords?.includes(record[idColumn]);
          return (<tr key={i}
                      className={cn({ "selected": isSelected })}
                      style={{ cursor: (typeof onRowClick === "function" || typeof setSelectedRecords === 'function') ? "pointer" : "" }}
                      onClick={() => {
                        if (typeof onRowClick === "function") {
                          onRowClick(record)
                          return;
                        }
                        if (typeof setSelectedRecords === 'function') {
                          handleSelect(record[idColumn])
                        }
                      }}>
            {setSelectedRecords && <th style={{ width: "40px" }}>
              <Checkbox
                checked={isSelected}
                onCheckedChange={() => handleSelect(record[idColumn])}
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
        {(!records || records.length < 1) && <tr>
          <td style={{ padding: 0 }} colSpan={columns.length + (setSelectedRecords ? 1 : 0)}><ClosableAlert closable={false}
                                                                                                  color="warning">No se
            encontraron registros</ClosableAlert></td>
        </tr>}
        </tbody>
      </table>

    </div>
    <nav className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6"
         aria-label="Pagination">
      <div className="block">
        <p className="text-sm text-gray-700">
          <span className="font-medium">{records.length}</span>
          &nbsp; registros
        </p>
      </div>
    </nav>
  </div>);
}

export { SimpleDataTable };

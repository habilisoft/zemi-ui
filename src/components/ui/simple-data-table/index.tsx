import ClosableAlert from '@/components/ui/closable-alert';
import './styles.css';

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
  hover?: boolean,
  placeholder?: string,
  actionColumnWidth?: number,
  cardProps?: Record<string, unknown>,
  onRowClick?(record: Record<string, string | number>): void,
  style: Record<string, string> | undefined,
  records: []
}

const SimpleDataTable = ({

                           columns,
                           cardProps,
                           onRowClick,
                           records,
                           style = {},
                         }: Props) => {


  return (<div className="shadow ring-1 ring-black ring-opacity-5 md:rounded-lg" data-toggle="lists" {...cardProps}>

    <div className="table-responsive overflow-auto data-grid"
         style={style}
         id="grid-container">
        <table className="data-grid-table">
          <thead className="bg-gray-50 sticky top-0">
          <tr>
            {columns && columns.map((column, index) => (<th style={column.style}
                                                            key={index}>{column.header}</th>))}
          </tr>
          </thead>
          <tbody>
          {records && records.map((record, i) => (<tr key={i}
                                                      style={{ cursor: typeof onRowClick === "function" ? "pointer" : "" }}
                                                      className={`${i % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-gray-100`}
                                                      onClick={() => {
                                                        if (typeof onRowClick === "function") {
                                                          onRowClick(record)
                                                        }
                                                      }}>
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
          </tr>))}
          {(!records || records.length < 1) && <tr>
            <td style={{ padding: 0 }} colSpan={columns.length}><ClosableAlert closable={false} color="warning">No se
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

export default SimpleDataTable;

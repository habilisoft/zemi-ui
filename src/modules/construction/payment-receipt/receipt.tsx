const invoice = {
  subTotal: '$8,800.00',
  tax: '$1,760.00',
  total: '$10,560.00',
  items: [
    {
      id: 1,
      title: 'Logo redesign',
      description: 'New logo and digital asset playbook.',
      hours: '20.0',
      rate: '$100.00',
      price: '$2,000.00',
    },
    {
      id: 2,
      title: 'Website redesign',
      description: 'Design and program new company website.',
      hours: '52.0',
      rate: '$100.00',
      price: '$5,200.00',
    },
    {
      id: 3,
      title: 'Business cards',
      description: 'Design and production of 3.5" x 2.0" business cards.',
      hours: '12.0',
      rate: '$100.00',
      price: '$1,200.00',
    },
    {
      id: 4,
      title: 'T-shirt design',
      description: 'Three t-shirt design concepts.',
      hours: '4.0',
      rate: '$100.00',
      price: '$400.00',
    },
  ],
}


export function Receipt() {
  return (
    <>
      <main className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">

          {/* Invoice */}
          <div
            className="-mx-4 px-4 py-8 shadow-sm ring-1 ring-gray-900/5 sm:mx-0 sm:rounded-lg sm:px-8 sm:pb-14 lg:col-span-2 lg:row-span-2 lg:row-end-2 xl:px-16 xl:pb-20 xl:pt-16">
            <h2 className="text-base font-semibold leading-6 text-gray-900">Invoice</h2>
            <dl className="mt-6 grid grid-cols-1 text-sm leading-6 sm:grid-cols-2">
              <div className="sm:pr-4">
                <dt className="inline text-gray-500">Issued on</dt>
                {' '}
                <dd className="inline text-gray-700">
                  <time dateTime="2023-23-01">January 23, 2023</time>
                </dd>
              </div>
              <div className="mt-2 sm:mt-0 sm:pl-4">
                <dt className="inline text-gray-500">Due on</dt>
                {' '}
                <dd className="inline text-gray-700">
                  <time dateTime="2023-31-01">January 31, 2023</time>
                </dd>
              </div>
              <div className="mt-6 border-t border-gray-900/5 pt-6 sm:pr-4">
                <dt className="font-semibold text-gray-900">From</dt>
                <dd className="mt-2 text-gray-500">
                  <span className="font-medium text-gray-900">Acme, Inc.</span>
                  <br/>
                  7363 Cynthia Pass
                  <br/>
                  Toronto, ON N3Y 4H8
                </dd>
              </div>
              <div className="mt-8 sm:mt-6 sm:border-t sm:border-gray-900/5 sm:pl-4 sm:pt-6">
                <dt className="font-semibold text-gray-900">To</dt>
                <dd className="mt-2 text-gray-500">
                  <span className="font-medium text-gray-900">Tuple, Inc</span>
                  <br/>
                  886 Walter Street
                  <br/>
                  New York, NY 12345
                </dd>
              </div>
            </dl>
            <table className="mt-16 w-full whitespace-nowrap text-left text-sm leading-6">
              <colgroup>
                <col className="w-full"/>
                <col/>
                <col/>
                <col/>
              </colgroup>
              <thead className="border-b border-gray-200 text-gray-900">
              <tr>
                <th scope="col" className="px-0 py-3 font-semibold">
                  Projects
                </th>
                <th scope="col" className="hidden py-3 pl-8 pr-0 text-right font-semibold sm:table-cell">
                  Hours
                </th>
                <th scope="col" className="hidden py-3 pl-8 pr-0 text-right font-semibold sm:table-cell">
                  Rate
                </th>
                <th scope="col" className="py-3 pl-8 pr-0 text-right font-semibold">
                  Price
                </th>
              </tr>
              </thead>
              <tbody>
              {invoice.items.map((item) => (
                <tr key={item.id} className="border-b border-gray-100">
                  <td className="max-w-0 px-0 py-5 align-top">
                    <div className="truncate font-medium text-gray-900">{item.title}</div>
                    <div className="truncate text-gray-500">{item.description}</div>
                  </td>
                  <td className="hidden py-5 pl-8 pr-0 text-right align-top tabular-nums text-gray-700 sm:table-cell">
                    {item.hours}
                  </td>
                  <td className="hidden py-5 pl-8 pr-0 text-right align-top tabular-nums text-gray-700 sm:table-cell">
                    {item.rate}
                  </td>
                  <td className="py-5 pl-8 pr-0 text-right align-top tabular-nums text-gray-700">{item.price}</td>
                </tr>
              ))}
              </tbody>
              <tfoot>
              <tr>
                <th scope="row" className="px-0 pb-0 pt-6 font-normal text-gray-700 sm:hidden">
                  Subtotal
                </th>
                <th
                  scope="row"
                  colSpan={3}
                  className="hidden px-0 pb-0 pt-6 text-right font-normal text-gray-700 sm:table-cell"
                >
                  Subtotal
                </th>
                <td className="pb-0 pl-8 pr-0 pt-6 text-right tabular-nums text-gray-900">{invoice.subTotal}</td>
              </tr>
              <tr>
                <th scope="row" className="pt-4 font-normal text-gray-700 sm:hidden">
                  Tax
                </th>
                <th
                  scope="row"
                  colSpan={3}
                  className="hidden pt-4 text-right font-normal text-gray-700 sm:table-cell"
                >
                  Tax
                </th>
                <td className="pb-0 pl-8 pr-0 pt-4 text-right tabular-nums text-gray-900">{invoice.tax}</td>
              </tr>
              <tr>
                <th scope="row" className="pt-4 font-semibold text-gray-900 sm:hidden">
                  Total
                </th>
                <th
                  scope="row"
                  colSpan={3}
                  className="hidden pt-4 text-right font-semibold text-gray-900 sm:table-cell"
                >
                  Total
                </th>
                <td className="pb-0 pl-8 pr-0 pt-4 text-right font-semibold tabular-nums text-gray-900">
                  {invoice.total}
                </td>
              </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </main>
    </>
  )
}

import React from 'react';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from '@tanstack/react-table';
import moment from 'moment';

const Table = ({ data }) => {
  const columns = [
    {
      header: 'Data',
      accessorKey: 'date',
      cell: info => moment(info.getValue()).format('DD/MM/YYYY'),
    },
    {
      header: 'Montante (MZN)',
      accessorKey: 'amount',
      cell: info => `${info.getValue()} MZN`,
    },
    {
      header: 'Categoria',
      accessorKey: 'category',
    },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className='mt-6 overflow-x-auto'>
      <table className='min-w-full bg-white border border-gray-200 rounded-md shadow-sm'>
        <thead className='bg-green-100'>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th
                  key={header.id}
                  className='text-left text-sm font-semibold text-green-900 px-4 py-2 border-b'
                >
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id} className='hover:bg-green-50'>
              {row.getVisibleCells().map(cell => (
                <td
                  key={cell.id}
                  className='text-sm text-gray-800 px-4 py-2 border-b'
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;

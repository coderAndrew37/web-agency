import { ReactNode } from "react";

interface TableProps<T> {
  headers: string[];
  data: T[];
  actions?: (row: T) => ReactNode; // Function to render action buttons
}

const Table = <T,>({ headers, data, actions }: TableProps<T>) => {
  return (
    <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
      <table className="min-w-full border-collapse">
        <thead className="bg-gray-800 text-white">
          <tr>
            {headers.map((header, index) => (
              <th key={index} className="py-3 px-6 text-left border-b">
                {header}
              </th>
            ))}
            {actions && (
              <th className="py-3 px-6 text-left border-b">Actions</th>
            )}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={headers.length + (actions ? 1 : 0)}
                className="text-center py-4"
              >
                No data available
              </td>
            </tr>
          ) : (
            data.map((row, rowIndex) => (
              <tr key={rowIndex} className="border-b hover:bg-gray-100">
                {headers.map((header, colIndex) => (
                  <td key={colIndex} className="py-3 px-6">
                    {String(row[header as keyof T])} {/* Type-safe access */}
                  </td>
                ))}
                {actions && <td className="py-3 px-6">{actions(row)}</td>}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;

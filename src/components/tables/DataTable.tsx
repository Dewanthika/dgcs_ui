"use client"

import type { ReactNode } from "react"
import { ArrowUpDown } from "lucide-react"

interface Column<T> {
  header: string
  accessor: keyof T | ((item: T) => ReactNode)
  sortable?: boolean
  sortKey?: string
}

interface DataTableProps<T> {
  columns: Column<T>[]
  data: T[]
  keyExtractor: (item: T) => string | number
  onSort?: (field: string) => void
  sortField?: string
  sortDirection?: "asc" | "desc"
  emptyMessage?: string
}

function DataTable<T>({
  columns,
  data,
  keyExtractor,
  onSort,
  sortField,
  sortDirection,
  emptyMessage = "No data found.",
}: DataTableProps<T>) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="bg-gray-50">
            {columns.map((column, index) => (
              <th key={index} className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                {column.sortable && onSort ? (
                  <button className="flex items-center" onClick={() => onSort(column.sortKey || String(column.header))}>
                    {column.header}
                    <ArrowUpDown className="ml-1 h-4 w-4" />
                  </button>
                ) : (
                  column.header
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y">
          {data?.length > 0 ? (
            data?.map((item) => (
              <tr key={keyExtractor(item)} className="hover:bg-gray-50">
                {columns.map((column, columnIndex) => (
                  <td key={columnIndex} className="px-4 py-3 text-sm">
                    {typeof column.accessor === "function"
                      ? column.accessor(item)
                      : (item[column.accessor] as ReactNode)}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} className="px-4 py-6 text-center text-gray-500">
                {emptyMessage}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default DataTable


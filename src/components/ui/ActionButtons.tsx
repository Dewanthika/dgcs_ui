"use client"

import { Edit, Trash2, Eye } from "lucide-react"
import { Link } from "react-router-dom"

interface ActionButtonsProps {
  viewPath?: string
  editPath?: string
  onDelete?: () => void
  onEdit?: () => void
  onView?: () => void
}

const ActionButtons = ({ viewPath, editPath, onDelete, onEdit, onView }: ActionButtonsProps) => {
  return (
    <div className="flex space-x-2">
      {viewPath ? (
        <Link to={viewPath} className="text-blue-600 hover:text-blue-900" title="View">
          <Eye className="w-5 h-5" />
        </Link>
      ) : onView ? (
        <button onClick={onView} className="text-blue-600 hover:text-blue-900" title="View">
          <Eye className="w-5 h-5" />
        </button>
      ) : null}

      {editPath ? (
        <Link to={editPath} className="text-green-600 hover:text-green-900" title="Edit">
          <Edit className="w-5 h-5" />
        </Link>
      ) : onEdit ? (
        <button onClick={onEdit} className="text-green-600 hover:text-green-900" title="Edit">
          <Edit className="w-5 h-5" />
        </button>
      ) : null}

      {onDelete && (
        <button onClick={onDelete} className="text-red-600 hover:text-red-900" title="Delete">
          <Trash2 className="w-5 h-5" />
        </button>
      )}
    </div>
  )
}

export default ActionButtons


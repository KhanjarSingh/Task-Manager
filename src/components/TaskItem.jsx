"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { formatDistanceToNow } from "date-fns"
import { motion } from "framer-motion"

const TaskItem = ({ task, onStatusChange, onDelete }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString)
      return formatDistanceToNow(date, { addSuffix: true })
    } catch (error) {
      return dateString
    }
  }

  const getCategoryColor = (category) => {
    switch (category) {
      case "Work":
        return "bg-blue-100 text-blue-800"
      case "Personal":
        return "bg-green-100 text-green-800"
      case "Health":
        return "bg-red-100 text-red-800"
      case "Study":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const handleDelete = () => {
    setIsDeleting(true)
    // Add a small delay to show the animation
    setTimeout(() => {
      onDelete(task._id || task.id)
    }, 300)
  }

  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: isDeleting ? 0 : 1, y: isDeleting ? 20 : 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
      className="mb-4 last:mb-0"
    >
      <div className="bg-white rounded-2xl shadow-md px-6 py-5 flex flex-col gap-2 hover:shadow-lg transition-all border border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <input
              type="checkbox"
              checked={task.status === "completed"}
              onChange={(e) => onStatusChange(task._id || task.id, e.target.checked ? "completed" : "pending")}
              className="h-5 w-5 text-purple-600 focus:ring-purple-500 border-gray-300 rounded-full accent-purple-600"
            />
            <div>
              <h3
                className={`text-lg font-bold ${task.status === "completed" ? "text-gray-400 line-through" : "text-gray-900"}`}
              >
                {task.title}
              </h3>
              <div className="flex flex-wrap items-center mt-2 gap-2">
                <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getCategoryColor(task.category)} shadow-sm`}>{task.category}</span>
                {task.priority && (
                  <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getPriorityColor(task.priority)} shadow-sm`}>
                    {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                  </span>
                )}
                <span className="px-3 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-600 shadow-sm">
                  Due {formatDate(task.dueDate)}
                </span>
                <span className={`px-3 py-1 text-xs font-semibold rounded-full ${task.status === "completed" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"} shadow-sm`}>
                  {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                </span>
              </div>
            </div>
          </div>
          <div className="flex space-x-2 items-center">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-gray-400 hover:text-purple-600 transition"
              title={isExpanded ? "Collapse" : "Expand"}
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isExpanded ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                )}
              </svg>
            </motion.button>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Link to={`/tasks/edit/${task._id || task.id}`} className="text-indigo-600 hover:text-indigo-900 transition" title="Edit Task">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </Link>
            </motion.div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleDelete}
              className="text-red-600 hover:text-red-800 transition"
              title="Delete Task"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </motion.button>
          </div>
        </div>
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: isExpanded ? "auto" : 0, opacity: isExpanded ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <div className="mt-4 ml-2 p-4 bg-gray-50 rounded-xl border border-gray-100">
            <p className="text-base text-gray-700 font-medium">{task.description || "No description provided."}</p>
          </div>
        </motion.div>
      </div>
    </motion.li>
  )
}

export default TaskItem

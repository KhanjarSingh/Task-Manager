"use client"

import TaskItem from "./TaskItem"
import { motion } from "framer-motion"

const TaskList = ({ tasks, onStatusChange, onDelete }) => {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <ul className="divide-y divide-gray-200">
        {tasks.length === 0 ? (
          <li className="px-4 py-6 text-center text-gray-500">No tasks found with the current filters.</li>
        ) : (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
          >
            {tasks.map((task) => (
              <TaskItem key={task._id || task.id} task={task} onStatusChange={onStatusChange} onDelete={onDelete} />
            ))}
          </motion.div>
        )}
      </ul>
    </div>
  )
}

export default TaskList

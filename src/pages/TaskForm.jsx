"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { tasksAPI } from "../utils/api"
import { motion } from "framer-motion"
import { GoogleGenerativeAI } from "@google/generative-ai"

const GEMINI_API_KEY = "AIzaSyCH573WOoBUInJDJDqZlMcpfAgsH-xSg7Q"
const ai = new GoogleGenerativeAI(GEMINI_API_KEY)

const categories = ["Work", "Personal", "Health", "Study", "Other"]
const priorities = ["low", "medium", "high"]

const TaskForm = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(id ? true : false)
  const [error, setError] = useState("")
  const [aiLoading, setAiLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dueDate: "",
    category: "Work",
    priority: "medium",
    status: "pending",
  })

  useEffect(() => {
    if (id) {
      const fetchTask = async () => {
        try {
          setLoading(true)
          const response = await tasksAPI.getTask(id)

          if (response.success) {
            // Format the date for the input field (YYYY-MM-DD)
            const task = response.data
            const formattedDate = task.dueDate ? new Date(task.dueDate).toISOString().split("T")[0] : ""

            setFormData({
              ...task,
              dueDate: formattedDate,
            })
          } else {
            setError(response.error || "Failed to fetch task")
          }
        } catch (err) {
          setError("An error occurred while fetching the task")
          console.error(err)
        } finally {
          setLoading(false)
        }
      }

      fetchTask()
    }
  }, [id])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleAIDescription = async () => {
    setAiLoading(true)
    try {
      const prompt = `Given the following task details, write a clear, helpful, and concise description that explains what needs to be done for this task. The description should be in plain English, with no formatting, markdown, or extra explanation. Return only the description sentence.

Title: "${formData.title}"
Category: "${formData.category}"
Priority: "${formData.priority}"`
      const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" })
      const result = await model.generateContent([prompt])
      const aiText = result?.response?.candidates?.[0]?.content?.parts?.[0]?.text || ""
      setFormData((prev) => ({ ...prev, description: aiText }))
    } catch (err) {
      alert("AI failed to generate a description. Please try again.")
    } finally {
      setAiLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validate form
    if (!formData.title.trim()) {
      return setError("Title is required")
    }

    if (!formData.dueDate) {
      return setError("Due date is required")
    }

    try {
      setLoading(true)
      setError("")

      let response

      if (id) {
        response = await tasksAPI.updateTask(id, formData)
      } else {
        response = await tasksAPI.createTask(formData)
      }

      if (response.success) {
        navigate("/dashboard")
      } else {
        setError(response.error || "Failed to save task")
      }
    } catch (err) {
      setError("An error occurred while saving the task")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto py-10 px-2">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white shadow-2xl rounded-2xl overflow-hidden border border-gray-100"
      >
        <div className="px-6 py-8 bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center gap-3">
          <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
          </svg>
          <h1 className="text-2xl font-bold text-white tracking-wide">
            {id ? "Edit Task" : "Create New Task"}
          </h1>
        </div>
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-red-50 border-l-4 border-red-500 p-4 m-6 rounded-lg"
          >
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700 font-medium">{error}</p>
              </div>
            </div>
          </motion.div>
        )}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="px-6 py-8">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
              <div className="col-span-2">
                <label htmlFor="title" className="block text-base font-semibold text-gray-700 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="block w-full rounded-xl border border-gray-300 py-3 px-4 text-lg shadow-sm focus:ring-2 focus:ring-purple-400 focus:border-transparent transition"
                  placeholder="Task title"
                  required
                />
              </div>
              <div className="col-span-2">
                <label htmlFor="description" className="block text-base font-semibold text-gray-700 mb-2 flex items-center">
                  Description
                  <button
                    type="button"
                    onClick={handleAIDescription}
                    className="ml-2 px-2 py-1 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-lg text-xs flex items-center gap-1 hover:from-purple-600 hover:to-indigo-600 transition"
                    disabled={aiLoading}
                    title="Let AI suggest a description"
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    {aiLoading ? "Thinking..." : "AI Assist"}
                  </button>
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows="4"
                  value={formData.description}
                  onChange={handleChange}
                  className="block w-full rounded-xl border border-gray-300 py-3 px-4 text-lg shadow-sm focus:ring-2 focus:ring-purple-400 focus:border-transparent transition"
                  placeholder="Task description"
                ></textarea>
              </div>
              <div>
                <label htmlFor="dueDate" className="block text-base font-semibold text-gray-700 mb-2">
                  Due Date
                </label>
                <input
                  type="date"
                  name="dueDate"
                  id="dueDate"
                  value={formData.dueDate}
                  onChange={handleChange}
                  className="block w-full rounded-xl border border-gray-300 py-3 px-4 text-lg shadow-sm focus:ring-2 focus:ring-purple-400 focus:border-transparent transition"
                  required
                />
              </div>
              <div>
                <label htmlFor="category" className="block text-base font-semibold text-gray-700 mb-2">
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="block w-full rounded-xl border border-gray-300 py-3 px-4 text-lg shadow-sm focus:ring-2 focus:ring-purple-400 focus:border-transparent transition"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="priority" className="block text-base font-semibold text-gray-700 mb-2">
                  Priority
                </label>
                <select
                  id="priority"
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                  className="block w-full rounded-xl border border-gray-300 py-3 px-4 text-lg shadow-sm focus:ring-2 focus:ring-purple-400 focus:border-transparent transition"
                >
                  {priorities.map((priority) => (
                    <option key={priority} value={priority}>
                      {priority.charAt(0).toUpperCase() + priority.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
              {id && (
                <div>
                  <label htmlFor="status" className="block text-base font-semibold text-gray-700 mb-2">
                    Status
                  </label>
                  <select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="block w-full rounded-xl border border-gray-300 py-3 px-4 text-lg shadow-sm focus:ring-2 focus:ring-purple-400 focus:border-transparent transition"
                  >
                    <option value="pending">Pending</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
              )}
            </div>
            <div className="mt-10 flex items-center justify-end space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="button"
                onClick={() => navigate("/dashboard")}
                className="inline-flex items-center px-6 py-3 border border-gray-300 shadow-sm text-base font-semibold rounded-xl text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition"
              >
                <svg className="h-5 w-5 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
                Cancel
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                disabled={loading}
                className="inline-flex items-center px-8 py-3 border border-transparent text-base font-bold rounded-xl shadow-md text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition gap-2"
              >
                {loading && (
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                  </svg>
                )}
                {id ? "Update Task" : "Create Task"}
              </motion.button>
            </div>
          </form>
        )}
      </motion.div>
    </div>
  )
}

export default TaskForm

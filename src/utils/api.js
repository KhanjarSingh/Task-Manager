import axios from "axios"

const API_URL = "https://task-manager-backend-mdxa.onrender.com/api"

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

// Add request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem("user"))
    if (user && user.token) {
      config.headers.Authorization = `Bearer ${user.token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// Auth API calls
export const authAPI = {
  register: async (userData) => {
    try {
      const response = await api.post("/users", userData)
      return { success: true, data: response.data }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || "Registration failed",
      }
    }
  },

  login: async (email, password) => {
    try {
      const response = await api.post("/users/login", { email, password })
      return { success: true, data: response.data }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || "Login failed",
      }
    }
  },

  getUserProfile: async () => {
    try {
      const response = await api.get("/users/profile")
      return { success: true, data: response.data }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || "Failed to get user profile",
      }
    }
  },
}

// Tasks API calls
export const tasksAPI = {
  getTasks: async () => {
    try {
      const response = await api.get("/tasks")
      return { success: true, data: response.data }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || "Failed to get tasks",
      }
    }
  },

  getTask: async (id) => {
    try {
      const response = await api.get(`/tasks/${id}`)
      return { success: true, data: response.data }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || "Failed to get task",
      }
    }
  },

  createTask: async (taskData) => {
    try {
      const response = await api.post("/tasks", taskData)
      return { success: true, data: response.data }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || "Failed to create task",
      }
    }
  },

  updateTask: async (id, taskData) => {
    try {
      const response = await api.put(`/tasks/${id}`, taskData)
      return { success: true, data: response.data }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || "Failed to update task",
      }
    }
  },

  deleteTask: async (id) => {
    try {
      await api.delete(`/tasks/${id}`)
      return { success: true }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || "Failed to delete task",
      }
    }
  },
}

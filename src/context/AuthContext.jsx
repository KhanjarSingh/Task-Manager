"use client"

import { createContext, useState, useContext, useEffect } from "react"
import { authAPI } from "../utils/api"

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Check if user is logged in from localStorage
    const user = localStorage.getItem("user")
    if (user) {
      setCurrentUser(JSON.parse(user))
    }
    setLoading(false)
  }, [])

  // Register function
  const register = async (userData) => {
    setLoading(true)
    setError(null)

    const response = await authAPI.register(userData)

    if (response.success) {
      localStorage.setItem("user", JSON.stringify(response.data))
      setCurrentUser(response.data)
      setLoading(false)
      return true
    } else {
      setError(response.error)
      setLoading(false)
      return false
    }
  }

  // Login function
  const login = async (email, password) => {
    setLoading(true)
    setError(null)

    const response = await authAPI.login(email, password)

    if (response.success) {
      localStorage.setItem("user", JSON.stringify(response.data))
      setCurrentUser(response.data)
      setLoading(false)
      return true
    } else {
      setError(response.error)
      setLoading(false)
      return false
    }
  }

  // Logout function
  const logout = () => {
    localStorage.removeItem("user")
    setCurrentUser(null)
  }

  const value = {
    currentUser,
    login,
    register,
    logout,
    loading,
    error,
  }

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>
}

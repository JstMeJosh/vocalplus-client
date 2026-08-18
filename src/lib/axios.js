import axios from "axios"

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers:{
        "Content-Type": "application/json"
    }
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token")
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status
    const url = error.config?.url || ""
    const isAuthRoute = url.includes("/auth/")
    // Auto-logout only when an *authenticated* request is rejected for a
    // missing/expired token. Never on the login/signup screens — there a 401
    // just means "wrong credentials" and we want to show it inline instead of
    // wiping the page.
    if (status === 401 && !isAuthRoute && localStorage.getItem("token")) {
      localStorage.removeItem("token")
      window.location.href = "/login"
    }
    return Promise.reject(error)
  }
)

export default api
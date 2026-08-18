import { create } from "zustand"
import { jwtDecode } from "jwt-decode"

// Safely decode a JWT from localStorage. Returns null (and clears the stored
// token) if it's missing, malformed, or expired — so a bad token can never
// crash the app at load or leave a stale "logged in" state behind.
const parseToken = (token) => {
  if (!token) return null
  try {
    const decoded = jwtDecode(token)
    if (decoded.exp && decoded.exp * 1000 < Date.now()) {
      localStorage.removeItem("token")
      return null
    }
    return decoded
  } catch {
    localStorage.removeItem("token")
    return null
  }
}

const storedToken = localStorage.getItem("token")
const storedUser = parseToken(storedToken)

const authContext = create((set) => ({
  // If the stored token was expired/invalid, storedUser is null and we treat
  // the session as logged-out even though a string may still be in storage.
  token: storedUser ? storedToken : null,
  user: storedUser,

  login: (token) => {
    localStorage.setItem("token", token)
    set({ token, user: parseToken(token) })
  },

  logout: () => {
    localStorage.removeItem("token")
    set({ token: null, user: null })
  },
}))

export default authContext

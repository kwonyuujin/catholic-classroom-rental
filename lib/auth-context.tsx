"use client"

import { createContext, useContext, useState, type ReactNode, useEffect } from "react"

interface Reservation {
  id: string
  roomId: number
  roomName: string
  date: string
  startTime: string
  endTime: string
  building: string
  createdAt?: number
}

interface AuthContextType {
  isLoggedIn: boolean
  userId: string | null
  userName: string | null
  reservations: Reservation[]
  login: (userId: string, password: string) => Promise<boolean>
  logout: () => void
  addReservation: (reservation: Omit<Reservation, "id">) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const DEMO_ACCOUNTS = [
  { userId: "student001@cuk.edu", password: "password123" },
  { userId: "student002@cuk.edu", password: "password123" },
  { userId: "test@cuk.edu", password: "test1234" },
]

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userId, setUserId] = useState<string | null>(null)
  const [userName, setUserName] = useState<string | null>(null)
  const [reservations, setReservations] = useState<Reservation[]>([])
  const [isHydrated, setIsHydrated] = useState(false)

  // 로컬 스토리지에서 로그인 상태 복구
  useEffect(() => {
    const savedAuth = localStorage.getItem("auth")
    if (savedAuth) {
      try {
        const { userId, userName } = JSON.parse(savedAuth)
        setUserId(userId)
        setUserName(userName)
        setIsLoggedIn(true)
      } catch (e) {
        console.log("[v0] Failed to parse saved auth")
      }
    }
    const savedReservations = localStorage.getItem("reservations")
    if (savedReservations) {
      try {
        setReservations(JSON.parse(savedReservations))
      } catch (e) {
        console.log("[v0] Failed to parse saved reservations")
      }
    }
    setIsHydrated(true)
  }, [])

  const login = async (userId: string, password: string) => {
    console.log("[v0] Login attempt with userId:", userId)

    // 테스트 계정 확인
    const isValidAccount = DEMO_ACCOUNTS.some((account) => account.userId === userId && account.password === password)

    if (isValidAccount) {
      const userName = userId.split("@")[0]
      setUserId(userId)
      setUserName(userName)
      setIsLoggedIn(true)
      localStorage.setItem("auth", JSON.stringify({ userId, userName }))
      console.log("[v0] Login successful")
      return true
    }

    console.log("[v0] Login failed - invalid credentials")
    return false
  }

  const logout = () => {
    setIsLoggedIn(false)
    setUserId(null)
    setUserName(null)
    localStorage.removeItem("auth")
  }

  const addReservation = (reservation: Omit<Reservation, "id">) => {
    const newReservation = {
      ...reservation,
      id: `RES-${Date.now()}`,
      createdAt: Date.now(),
    }
    const updated = [...reservations, newReservation]
    setReservations(updated)
    localStorage.setItem("reservations", JSON.stringify(updated))

    if ((window as any).__addNotification) {
      ;(window as any).__addNotification(
        reservation.roomName,
        reservation.building,
        reservation.startTime,
        reservation.date,
      )
    }
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, userId, userName, reservations, login, logout, addReservation }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within AuthProvider")
  }
  return context
}

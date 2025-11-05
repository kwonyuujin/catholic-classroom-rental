"use client"

import { useEffect, useRef, useState } from "react"
import { User, LogOut, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"

export function ProfileDropdown() {
  const { isLoggedIn, userName, logout, reservations } = useAuth()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
      return () => document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen])

  if (!isLoggedIn) return null

  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  const upcomingCount = reservations.filter((r) => new Date(r.date) >= new Date()).length

  return (
    <div ref={dropdownRef} className="relative">
      <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
        <User className="h-5 w-5" />
      </Button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-56 bg-card border border-border rounded-lg shadow-lg z-50">
          <div className="border-b px-4 py-4">
            <p className="text-xs text-muted-foreground">계정</p>
            <p className="font-semibold mt-1">{userName}</p>
          </div>

          <div className="px-4 py-3 border-b">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">예약 현황</span>
              </div>
              <span className="text-sm font-bold text-primary">{upcomingCount}</span>
            </div>
            <p className="text-xs text-muted-foreground mt-2">예정된 강의실 예약</p>
          </div>

          <div className="p-2 space-y-2">
            <Button
              variant="ghost"
              className="w-full justify-start gap-2"
              onClick={() => {
                router.push("/my-reservations")
                setIsOpen(false)
              }}
            >
              <BookOpen className="h-4 w-4" />
              예약 내역
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start gap-2 text-destructive hover:text-destructive hover:bg-destructive/10"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4" />
              로그아웃
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

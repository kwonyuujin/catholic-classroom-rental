"use client"

import { useEffect, useRef, useState } from "react"
import { Bell, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Notification {
  id: string
  roomName: string
  building: string
  startTime: string
  date: string
  timestamp: number
}

export function NotificationDropdown() {
  const [isOpen, setIsOpen] = useState(false)
  const [notifications, setNotifications] = useState<Notification[]>([])
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const saved = localStorage.getItem("notifications")
    if (saved) {
      try {
        setNotifications(JSON.parse(saved))
      } catch (e) {
        console.log("[v0] Failed to parse notifications")
      }
    }
  }, [])

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

  const addNotification = (roomName: string, building: string, startTime: string, date: string) => {
    const newNotification = {
      id: `NOTIF-${Date.now()}`,
      roomName,
      building,
      startTime,
      date,
      timestamp: Date.now(),
    }
    const updated = [newNotification, ...notifications].slice(0, 10) // Keep last 10
    setNotifications(updated)
    localStorage.setItem("notifications", JSON.stringify(updated))
  }

  const deleteNotification = (id: string) => {
    const updated = notifications.filter((n) => n.id !== id)
    setNotifications(updated)
    localStorage.setItem("notifications", JSON.stringify(updated))
  }

  const clearAll = () => {
    setNotifications([])
    localStorage.removeItem("notifications")
  }

  useEffect(() => {
    ;(window as any).__addNotification = addNotification
  }, [notifications])

  return (
    <div ref={dropdownRef} className="relative">
      <Button variant="ghost" size="icon" className="relative" onClick={() => setIsOpen(!isOpen)}>
        <Bell className="h-5 w-5" />
        {notifications.length > 0 && (
          <span className="absolute top-1.5 right-1.5 h-5 w-5 rounded-full bg-red-500 flex items-center justify-center text-white text-xs font-semibold">
            {notifications.length > 9 ? "9+" : notifications.length}
          </span>
        )}
      </Button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-96 bg-card border border-border rounded-lg shadow-lg z-50">
          <div className="border-b px-4 py-3 flex items-center justify-between">
            <h3 className="font-semibold">알림</h3>
            {notifications.length > 0 && (
              <button
                onClick={clearAll}
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                모두 삭제
              </button>
            )}
          </div>

          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="px-4 py-8 text-center text-muted-foreground">
                <p className="text-sm">알림이 없습니다</p>
              </div>
            ) : (
              <div className="divide-y">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className="px-4 py-3 hover:bg-muted/50 transition-colors flex items-start justify-between gap-3 group"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{notification.roomName}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {notification.building} • {notification.date} {notification.startTime}
                      </p>
                      <p className="text-xs text-green-600 font-medium mt-1">✓ 예약이 완료되었습니다</p>
                    </div>
                    <button
                      onClick={() => deleteNotification(notification.id)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"
                    >
                      <Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

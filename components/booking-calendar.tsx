"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react"
import { cn } from "@/lib/utils"
import { classSchedules, reservations } from "@/lib/room-data"
import { useAuth } from "@/lib/auth-context"
import { BookingConfirmModal } from "./booking-confirm-modal"

interface Room {
  id: number
  name: string
  building: string
}

const generateSchedule = (roomId: number) => {
  const days = ["월", "화", "수", "목", "금", "토", "일"]
  const hours = Array.from({ length: 14 }, (_, i) => i + 9) // 9:00 - 22:00

  return {
    days,
    hours,
    classes: classSchedules[roomId] || [],
    reservations: reservations[roomId] || [],
  }
}

export function BookingCalendar({ room }: { room: Room }) {
  const { isLoggedIn } = useAuth()
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [selectedSlot, setSelectedSlot] = useState<{ day: number; hour: number } | null>(null)
  const [showConfirmModal, setShowConfirmModal] = useState(false)

  const schedule = generateSchedule(room.id)
  const currentWeek = getCurrentWeek(selectedDate)

  function getCurrentWeek(date: Date) {
    const week = []
    const current = new Date(date)
    const day = current.getDay()
    const diff = current.getDate() - day + (day === 0 ? -6 : 1)

    for (let i = 0; i < 7; i++) {
      const weekDate = new Date(current.setDate(diff + i))
      week.push({
        date: weekDate.getDate(),
        month: weekDate.getMonth() + 1,
        dayName: schedule.days[i],
      })
    }
    return week
  }

  function isSlotOccupied(dayIndex: number, hour: number) {
    const hasClass = schedule.classes.some((cls) => cls.day === dayIndex && hour >= cls.startHour && hour < cls.endHour)
    const hasReservation = schedule.reservations.some(
      (res) => res.day === dayIndex && hour >= res.startHour && hour < res.endHour,
    )
    return { hasClass, hasReservation }
  }

  function getSlotInfo(dayIndex: number, hour: number) {
    const classInfo = schedule.classes.find((cls) => cls.day === dayIndex && hour === cls.startHour)
    const reservationInfo = schedule.reservations.find((res) => res.day === dayIndex && hour === res.startHour)
    return { classInfo, reservationInfo }
  }

  function goToPreviousWeek() {
    const newDate = new Date(selectedDate)
    newDate.setDate(newDate.getDate() - 7)
    setSelectedDate(newDate)
  }

  function goToNextWeek() {
    const newDate = new Date(selectedDate)
    newDate.setDate(newDate.getDate() + 7)
    setSelectedDate(newDate)
  }

  const handleBooking = () => {
    if (!isLoggedIn) {
      alert("로그인이 필요합니다.")
      return
    }
    setShowConfirmModal(true)
  }

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              예약 가능 시간
            </CardTitle>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" onClick={goToPreviousWeek}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-sm font-medium min-w-[120px] text-center">
                {selectedDate.getFullYear()}년 {selectedDate.getMonth() + 1}월
              </span>
              <Button variant="outline" size="icon" onClick={goToNextWeek}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="flex gap-4 text-xs pt-2">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-muted border-2 border-border" />
              <span>이용 가능</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-destructive/20 border-2 border-destructive" />
              <span>수업 중</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-primary/20 border-2 border-primary" />
              <span>예약됨</span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <div className="min-w-[600px]">
              <div className="grid grid-cols-8 gap-1 mb-2">
                <div className="text-xs font-medium text-muted-foreground p-2">시간</div>
                {currentWeek.map((day, idx) => (
                  <div key={idx} className="text-center p-2">
                    <div className="text-xs font-medium">{day.dayName}</div>
                    <div className="text-xs text-muted-foreground">
                      {day.month}/{day.date}
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-1">
                {schedule.hours.map((hour) => (
                  <div key={hour} className="grid grid-cols-8 gap-1">
                    <div className="text-xs text-muted-foreground p-2 flex items-center">{hour}:00</div>
                    {currentWeek.map((_, dayIndex) => {
                      const { hasClass, hasReservation } = isSlotOccupied(dayIndex, hour)
                      const { classInfo, reservationInfo } = getSlotInfo(dayIndex, hour)
                      const isAvailable = !hasClass && !hasReservation
                      const isSelected = selectedSlot?.day === dayIndex && selectedSlot?.hour === hour

                      return (
                        <button
                          key={dayIndex}
                          onClick={() => isAvailable && setSelectedSlot({ day: dayIndex, hour })}
                          disabled={!isAvailable}
                          className={cn(
                            "p-2 rounded-md text-xs font-medium transition-all relative min-h-[60px]",
                            "hover:scale-105 disabled:hover:scale-100",
                            isAvailable && "bg-muted border-2 border-border hover:border-primary cursor-pointer",
                            hasClass && "bg-destructive/20 border-2 border-destructive cursor-not-allowed",
                            hasReservation && "bg-primary/20 border-2 border-primary cursor-not-allowed",
                            isSelected && "ring-2 ring-primary ring-offset-2",
                          )}
                        >
                          {classInfo && (
                            <div className="text-[10px] leading-tight">
                              <div className="font-semibold">수업</div>
                              <div className="text-destructive">{classInfo.title}</div>
                            </div>
                          )}
                          {reservationInfo && (
                            <div className="text-[10px] leading-tight">
                              <div className="font-semibold">예약완료</div>
                              <div className="text-primary">{reservationInfo.user}</div>
                            </div>
                          )}
                        </button>
                      )
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {selectedSlot && (
            <div className="mt-6 p-4 rounded-lg bg-primary/10 border border-primary/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold">선택한 시간</p>
                  <p className="text-sm text-muted-foreground">
                    {currentWeek[selectedSlot.day].month}월 {currentWeek[selectedSlot.day].date}일 (
                    {currentWeek[selectedSlot.day].dayName}) {selectedSlot.hour}:00 - {selectedSlot.hour + 1}:00
                  </p>
                </div>
                <Button onClick={handleBooking}>예약하기</Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {selectedSlot && (
        <BookingConfirmModal
          isOpen={showConfirmModal}
          room={room}
          selectedSlot={selectedSlot}
          currentWeek={currentWeek}
          onClose={() => setShowConfirmModal(false)}
          onConfirm={() => {
            setShowConfirmModal(false)
            setSelectedSlot(null)
          }}
        />
      )}
    </>
  )
}

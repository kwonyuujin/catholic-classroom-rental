"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { CheckCircle, Calendar, MapPin, Clock } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { useToast } from "@/components/toast-notification"

interface BookingConfirmModalProps {
  isOpen: boolean
  room: { id: number; name: string; building: string }
  selectedSlot: { day: number; hour: number }
  currentWeek: Array<{ date: number; month: number; dayName: string }>
  onClose: () => void
  onConfirm: () => void
}

export function BookingConfirmModal({
  isOpen,
  room,
  selectedSlot,
  currentWeek,
  onClose,
  onConfirm,
}: BookingConfirmModalProps) {
  const { addReservation } = useAuth()
  const { showToast } = useToast()
  const [isCompleted, setIsCompleted] = useState(false)
  const [reservationId, setReservationId] = useState("")

  const handleConfirm = () => {
    const selectedDate = currentWeek[selectedSlot.day]
    const dateStr = `${selectedDate.month}/${selectedDate.date}`
    const timeStr = `${selectedSlot.hour}:00 - ${selectedSlot.hour + 1}:00`

    const reservation = {
      roomId: room.id,
      roomName: room.name,
      date: dateStr,
      startTime: `${selectedSlot.hour}:00`,
      endTime: `${selectedSlot.hour + 1}:00`,
      building: room.building,
    }

    addReservation(reservation)
    const newReservationId = `RES-${Date.now()}`
    setReservationId(newReservationId)
    setIsCompleted(true)

    showToast({
      type: "success",
      message: `${room.building} ${room.name} 예약이 완료되었습니다!`,
      duration: 4000,
    })
  }

  const handleClose = () => {
    if (isCompleted) {
      onConfirm()
      setIsCompleted(false)
    } else {
      onClose()
    }
  }

  const selectedDate = currentWeek[selectedSlot.day]

  if (!isOpen) return null

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        {!isCompleted ? (
          <>
            <DialogHeader>
              <DialogTitle>예약 확인</DialogTitle>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-muted-foreground">강의실</p>
                    <p className="font-semibold">
                      {room.building} / {room.name}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-muted-foreground">날짜</p>
                    <p className="font-semibold">
                      {selectedDate.month}월 {selectedDate.date}일 ({selectedDate.dayName})
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-muted-foreground">시간</p>
                    <p className="font-semibold">
                      {selectedSlot.hour}:00 - {selectedSlot.hour + 1}:00
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <p className="text-xs text-blue-700">
                  <strong>안내:</strong> 예약 확정 후 강의실 접근이 가능합니다. 사용 후 반드시 문을 닫아주세요.
                </p>
              </div>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" onClick={onClose} className="flex-1 bg-transparent">
                취소
              </Button>
              <Button onClick={handleConfirm} className="flex-1">
                예약 확정
              </Button>
            </div>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>예약 완료</DialogTitle>
            </DialogHeader>

            <div className="flex flex-col items-center justify-center py-8 space-y-4">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-green-100">
                <CheckCircle className="h-10 w-10 text-green-600" />
              </div>

              <div className="text-center space-y-2">
                <h3 className="font-semibold text-lg">예약이 완료되었습니다!</h3>
                <p className="text-sm text-muted-foreground">예약 번호: {reservationId}</p>
              </div>

              <div className="bg-slate-50 rounded-lg p-4 w-full space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">강의실:</span>
                  <span className="font-medium">
                    {room.building} / {room.name}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">날짜:</span>
                  <span className="font-medium">
                    {selectedDate.month}월 {selectedDate.date}일 ({selectedDate.dayName})
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">시간:</span>
                  <span className="font-medium">
                    {selectedSlot.hour}:00 - {selectedSlot.hour + 1}:00
                  </span>
                </div>
              </div>

              <div className="text-xs text-muted-foreground text-center">
                <p>마이페이지에서 예약 내역을 확인하실 수 있습니다.</p>
                <p>예약 취소는 사용 시간 1시간 전까지 가능합니다.</p>
              </div>
            </div>

            <Button onClick={handleClose} className="w-full">
              완료
            </Button>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}

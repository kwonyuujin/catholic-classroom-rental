"use client"

import { Header } from "@/components/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { Calendar, Clock, MapPin, Trash2, CheckCircle, AlertCircle } from "lucide-react"

export default function MyReservationsPage() {
  const { isLoggedIn, reservations } = useAuth()
  const router = useRouter()

  if (!isLoggedIn) {
    router.push("/login")
    return null
  }

  const now = new Date()
  const upcomingReservations = reservations
    .filter((r) => new Date(r.date) >= now)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
  const completedReservations = reservations
    .filter((r) => new Date(r.date) < now)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  const getTodayReservations = () => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return upcomingReservations.filter((r) => {
      const resDate = new Date(r.date)
      resDate.setHours(0, 0, 0, 0)
      return resDate.getTime() === today.getTime()
    })
  }

  const todayCount = getTodayReservations().length
  const totalReservations = reservations.length

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold">예약 내역</h1>
              <p className="text-muted-foreground">나의 강의실 및 공간 예약 현황을 확인하세요</p>
            </div>

            {totalReservations > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
                  <CardContent className="pt-6">
                    <div className="text-center space-y-2">
                      <div className="text-3xl font-bold text-primary">{totalReservations}</div>
                      <p className="text-xs text-muted-foreground font-medium">총 예약 건수</p>
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-blue-500/5 to-blue-500/10 border-blue-500/20">
                  <CardContent className="pt-6">
                    <div className="text-center space-y-2">
                      <div className="text-3xl font-bold text-blue-600">{upcomingReservations.length}</div>
                      <p className="text-xs text-muted-foreground font-medium">예정된 예약</p>
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-green-500/5 to-green-500/10 border-green-500/20">
                  <CardContent className="pt-6">
                    <div className="text-center space-y-2">
                      <div className="text-3xl font-bold text-green-600">{completedReservations.length}</div>
                      <p className="text-xs text-muted-foreground font-medium">이용 완료</p>
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-orange-500/5 to-orange-500/10 border-orange-500/20">
                  <CardContent className="pt-6">
                    <div className="text-center space-y-2">
                      <div className="text-3xl font-bold text-orange-600">{todayCount}</div>
                      <p className="text-xs text-muted-foreground font-medium">오늘 예약</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>

          {totalReservations === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12 space-y-4">
                <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-muted-foreground" />
                </div>
                <div className="text-center space-y-2">
                  <p className="font-semibold">예약 내역이 없습니다</p>
                  <p className="text-sm text-muted-foreground">강의실을 예약하여 공간을 활용해보세요</p>
                </div>
                <Button onClick={() => router.push("/")}>강의실 둘러보기</Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-8">
              {upcomingReservations.length > 0 && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <div className="h-1 w-1 rounded-full bg-blue-500" />
                    <h2 className="text-lg font-semibold">예정된 예약</h2>
                    <span className="text-xs font-medium px-2 py-1 bg-blue-100 text-blue-700 rounded-full">
                      {upcomingReservations.length}건
                    </span>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {upcomingReservations.map((reservation) => (
                      <Card
                        key={reservation.id}
                        className="hover:shadow-md transition-shadow overflow-hidden border-l-4 border-l-blue-500"
                      >
                        <CardHeader className="pb-3">
                          <div className="flex items-start justify-between gap-4">
                            <div className="space-y-1 flex-1">
                              <CardTitle className="text-lg">{reservation.roomName}</CardTitle>
                              <p className="text-sm text-muted-foreground">{reservation.building}</p>
                            </div>
                            <div className="flex items-center gap-1 px-2 py-1 bg-blue-100 rounded-full">
                              <CheckCircle className="h-3 w-3 text-blue-600" />
                              <span className="text-xs text-blue-700 font-medium">확정</span>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="flex items-center gap-2 text-sm">
                            <Calendar className="h-4 w-4 text-primary flex-shrink-0" />
                            <span className="font-medium">{reservation.date}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Clock className="h-4 w-4 text-primary flex-shrink-0" />
                            <span className="font-medium">
                              {reservation.startTime} ~ {reservation.endTime}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <MapPin className="h-4 w-4 flex-shrink-0" />
                            <span className="text-xs">예약 1시간 전까지 취소 가능</span>
                          </div>

                          <div className="pt-3 border-t">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="w-full text-destructive hover:text-destructive hover:bg-destructive/10"
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              예약 취소
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {completedReservations.length > 0 && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <div className="h-1 w-1 rounded-full bg-green-500" />
                    <h2 className="text-lg font-semibold">이용 완료</h2>
                    <span className="text-xs font-medium px-2 py-1 bg-green-100 text-green-700 rounded-full">
                      {completedReservations.length}건
                    </span>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {completedReservations.map((reservation) => (
                      <Card
                        key={reservation.id}
                        className="hover:shadow-md transition-shadow overflow-hidden border-l-4 border-l-green-500 opacity-75"
                      >
                        <CardHeader className="pb-3">
                          <div className="flex items-start justify-between gap-4">
                            <div className="space-y-1 flex-1">
                              <CardTitle className="text-lg">{reservation.roomName}</CardTitle>
                              <p className="text-sm text-muted-foreground">{reservation.building}</p>
                            </div>
                            <div className="flex items-center gap-1 px-2 py-1 bg-green-100 rounded-full">
                              <AlertCircle className="h-3 w-3 text-green-600" />
                              <span className="text-xs text-green-700 font-medium">이용완료</span>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="flex items-center gap-2 text-sm">
                            <Calendar className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                            <span className="font-medium text-muted-foreground">{reservation.date}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Clock className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                            <span className="font-medium text-muted-foreground">
                              {reservation.startTime} ~ {reservation.endTime}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <MapPin className="h-4 w-4 flex-shrink-0" />
                            <span className="text-xs">이용이 완료되었습니다</span>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

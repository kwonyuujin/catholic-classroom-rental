import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Monitor, Projector, Clock, Phone, Building2, AlertCircle, Wifi, AirVent } from "lucide-react"

interface Room {
  capacity: number
  hasComputer: boolean
  hasProjector: boolean
  currentTime: string
  availableUntil: string
  contact: string
  department: string
}

export function RoomInfo({ room }: { room: Room }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>공간정보</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
            <Users className="h-5 w-5 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">수용인원</p>
              <p className="font-semibold">{room.capacity}명</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
            <Clock className="h-5 w-5 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">운영시간</p>
              <p className="font-semibold">{room.currentTime}</p>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium">시설정보</p>
          <div className="grid grid-cols-2 gap-2">
            {room.hasComputer && (
              <div className="flex items-center gap-2 px-3 py-2 rounded-md bg-primary/10 text-primary">
                <Monitor className="h-4 w-4" />
                <span className="text-sm font-medium">컴퓨터</span>
              </div>
            )}
            {room.hasProjector && (
              <div className="flex items-center gap-2 px-3 py-2 rounded-md bg-accent/10 text-accent">
                <Projector className="h-4 w-4" />
                <span className="text-sm font-medium">프로젝터</span>
              </div>
            )}
            <div className="flex items-center gap-2 px-3 py-2 rounded-md bg-muted">
              <Wifi className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Wi-Fi</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 rounded-md bg-muted">
              <AirVent className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">냉난방</span>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t space-y-3">
          <div className="flex items-center gap-3">
            <Building2 className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-sm text-muted-foreground">담당부서</p>
              <p className="font-medium">{room.department}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Phone className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-sm text-muted-foreground">담당자 연락처</p>
              <p className="font-medium">{room.contact}</p>
            </div>
          </div>
        </div>

        <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20 space-y-2">
          <div className="flex items-start gap-2">
            <AlertCircle className="h-4 w-4 text-destructive mt-0.5 flex-shrink-0" />
            <div className="space-y-1">
              <p className="text-sm font-semibold text-destructive">마감시간: {room.availableUntil}</p>
              <p className="text-xs text-muted-foreground">수업 종료 후 약 2시간 뒤 관리자가 강의실 문을 잠급니다</p>
            </div>
          </div>
        </div>

        <div className="p-4 rounded-lg bg-muted/50 space-y-2">
          <p className="text-sm font-semibold">이용 안내</p>
          <ul className="text-xs text-muted-foreground space-y-1">
            <li>• 이용 가능 인원: 최소 3인 이상</li>
            <li>• 이용 가능 시간: 최소 1시간, 최대 4시간</li>
            <li>• 사용 후 정리정돈 필수</li>
            <li>• 음식물 반입 금지 (음료 제외)</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}

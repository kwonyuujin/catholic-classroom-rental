import { Building2, Clock, Users } from "lucide-react"
import { rooms } from "@/lib/room-data"

export function StatsBar() {
  const availableRooms = rooms.filter((room) => room.status === "available").length
  const occupiedRooms = rooms.filter((room) => room.status === "occupied").length
  const reservedRooms = rooms.filter((room) => room.status === "reserved").length

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="flex items-center gap-3 p-4 rounded-lg bg-card border">
        <div className="p-2 rounded-lg bg-primary/10">
          <Building2 className="h-5 w-5 text-primary" />
        </div>
        <div>
          <p className="text-sm text-muted-foreground">현재 이용 가능</p>
          <p className="text-2xl font-bold">{availableRooms}개 강의실</p>
        </div>
      </div>

      <div className="flex items-center gap-3 p-4 rounded-lg bg-card border">
        <div className="p-2 rounded-lg bg-destructive/10">
          <Clock className="h-5 w-5 text-destructive" />
        </div>
        <div>
          <p className="text-sm text-muted-foreground">사용 중</p>
          <p className="text-2xl font-bold">{occupiedRooms}개 강의실</p>
        </div>
      </div>

      <div className="flex items-center gap-3 p-4 rounded-lg bg-card border">
        <div className="p-2 rounded-lg bg-amber-500/10">
          <Users className="h-5 w-5 text-amber-600" />
        </div>
        <div>
          <p className="text-sm text-muted-foreground">예약됨</p>
          <p className="text-2xl font-bold">{reservedRooms}개 강의실</p>
        </div>
      </div>
    </div>
  )
}

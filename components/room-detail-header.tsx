import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft } from "lucide-react"

interface Room {
  id: number
  name: string
  building: string
  floor: string
  status: "available" | "occupied" | "reserved"
}

export function RoomDetailHeader({ room }: { room: Room }) {
  const statusConfig = {
    available: {
      label: "이용 가능",
      color: "bg-success text-success-foreground",
    },
    occupied: {
      label: "사용 중",
      color: "bg-destructive text-destructive-foreground",
    },
    reserved: {
      label: "예약됨",
      color: "bg-warning text-warning-foreground",
    },
  }

  const config = statusConfig[room.status]

  return (
    <div className="space-y-4">
      <Link href="/">
        <Button variant="ghost" size="sm" className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          목록으로
        </Button>
      </Link>

      <div className="flex items-start justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold text-balance">{room.name}</h1>
            <Badge className={config.color}>{config.label}</Badge>
          </div>
          <p className="text-muted-foreground">
            {room.building} {room.floor}
          </p>
        </div>
      </div>
    </div>
  )
}

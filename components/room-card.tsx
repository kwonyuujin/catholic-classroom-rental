import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Clock, Users, Monitor, Projector } from "lucide-react"

interface Room {
  id: number
  name: string
  building: string
  floor: string
  capacity: number
  hasComputer: boolean
  hasProjector: boolean
  status: "available" | "occupied" | "reserved"
  availableUntil: string
  currentTime: string
  nextAvailable?: string
  image: string
}

interface RoomCardProps {
  room: Room
}

export function RoomCard({ room }: RoomCardProps) {
  const statusConfig = {
    available: {
      label: "이용 가능",
      color: "bg-success text-success-foreground",
      buttonText: "예약하기",
      buttonVariant: "default" as const,
    },
    occupied: {
      label: "사용 중",
      color: "bg-destructive text-destructive-foreground",
      buttonText: "대기 예약",
      buttonVariant: "secondary" as const,
    },
    reserved: {
      label: "예약됨",
      color: "bg-warning text-warning-foreground",
      buttonText: "대기 예약",
      buttonVariant: "secondary" as const,
    },
  }

  const config = statusConfig[room.status]

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-48 bg-muted">
        <Image src={room.image || "/placeholder.svg"} alt={room.name} fill className="object-cover opacity-20" />
        <div className="absolute top-3 right-3">
          <Badge className={config.color}>{config.label}</Badge>
        </div>
        {room.nextAvailable && (
          <div className="absolute bottom-3 left-3 right-3">
            <div className="bg-card/95 backdrop-blur-sm rounded-md px-3 py-2 text-xs">
              <Clock className="inline h-3 w-3 mr-1" />
              다음 이용 가능: {room.nextAvailable}
            </div>
          </div>
        )}
      </div>

      <CardContent className="p-4 space-y-3">
        <div>
          <h3 className="font-semibold text-lg text-balance leading-tight mb-1">{room.name}</h3>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <MapPin className="h-3 w-3" />
            {room.building} {room.floor}
          </div>
        </div>

        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span>{room.capacity}명</span>
          </div>
          {room.hasComputer && (
            <div className="flex items-center gap-1 text-primary">
              <Monitor className="h-4 w-4" />
              <span>PC</span>
            </div>
          )}
          {room.hasProjector && (
            <div className="flex items-center gap-1 text-accent">
              <Projector className="h-4 w-4" />
              <span>빔</span>
            </div>
          )}
        </div>

        <div className="pt-2 border-t">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">운영시간</span>
            <span className="font-medium">{room.currentTime}</span>
          </div>
          <div className="flex items-center justify-between text-sm mt-1">
            <span className="text-muted-foreground">마감시간</span>
            <span className="font-semibold text-destructive">{room.availableUntil}</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 gap-2">
        <Link href={`/rooms/${room.id}`} className="flex-1">
          <Button className="w-full" variant={config.buttonVariant}>
            {config.buttonText}
          </Button>
        </Link>
        <Link href={`/rooms/${room.id}#map`}>
          <Button variant="outline" size="icon">
            <MapPin className="h-4 w-4" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}

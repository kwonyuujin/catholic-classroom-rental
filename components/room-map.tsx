"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Navigation } from "lucide-react"
import Image from "next/image"

interface Room {
  name: string
  building: string
  coordinates: { lat: number; lng: number }
}

export function RoomMap({ room }: { room: Room }) {
  const handleGetDirections = () => {
    // 실제로는 카카오맵이나 네이버맵 API를 사용
    const url = `https://map.kakao.com/link/to/${room.building},${room.coordinates.lat},${room.coordinates.lng}`
    window.open(url, "_blank")
  }

  return (
    <Card className="sticky top-20" id="map">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          위치 안내
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative aspect-square rounded-lg overflow-hidden bg-muted">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-EUWqmWqdMAOE6aMYdnDgr7ixMqVtpK.png"
            alt="캠퍼스 지도"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-primary text-primary-foreground px-4 py-2 rounded-full shadow-lg font-semibold text-sm">
              {room.building}
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
            <MapPin className="h-5 w-5 text-primary mt-0.5" />
            <div className="flex-1">
              <p className="font-medium">{room.building}</p>
              <p className="text-sm text-muted-foreground">가톨릭대학교 성심교정</p>
            </div>
          </div>

          <Button className="w-full gap-2" onClick={handleGetDirections}>
            <Navigation className="h-4 w-4" />
            길찾기
          </Button>
        </div>

        <div className="text-xs text-muted-foreground space-y-1 pt-2 border-t">
          <p>• 도보로 이동 시 약 5-10분 소요</p>
          <p>• 건물 입구는 정문 방향입니다</p>
          <p>• 엘리베이터 이용 가능</p>
        </div>
      </CardContent>
    </Card>
  )
}

import { notFound } from "next/navigation"
import { Header } from "@/components/header"
import { RoomDetailHeader } from "@/components/room-detail-header"
import { BookingCalendar } from "@/components/booking-calendar"
import { RoomMap } from "@/components/room-map"
import { RoomInfo } from "@/components/room-info"
import { rooms } from "@/lib/room-data"

export default async function RoomDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const room = rooms.find((r) => r.id === Number.parseInt(id))

  if (!room) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-6 space-y-6">
        <RoomDetailHeader room={room} />

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <RoomInfo room={room} />
            <BookingCalendar room={room} />
          </div>

          <div className="lg:col-span-1">
            <RoomMap room={room} />
          </div>
        </div>
      </main>
    </div>
  )
}

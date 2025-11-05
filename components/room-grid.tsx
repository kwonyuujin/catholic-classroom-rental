import { RoomCard } from "@/components/room-card"
import { Search } from "lucide-react"
import { rooms } from "@/lib/room-data"

interface RoomGridProps {
  searchQuery: string
  filters: {
    hasComputer: boolean
    isEmpty: boolean
    hasProjector: boolean
  }
  selectedBuilding: string
}

export function RoomGrid({ searchQuery, filters, selectedBuilding }: RoomGridProps) {
  const filteredRooms = rooms.filter((room) => {
    // Search filter
    const matchesSearch =
      searchQuery === "" ||
      room.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      room.building.toLowerCase().includes(searchQuery.toLowerCase())

    // Computer filter
    const matchesComputer = !filters.hasComputer || room.hasComputer

    // Empty room filter (only available rooms)
    const matchesEmpty = !filters.isEmpty || room.status === "available"

    // Projector filter
    const matchesProjector = !filters.hasProjector || room.hasProjector

    const matchesBuilding = selectedBuilding === "all" || room.buildingId === selectedBuilding

    return matchesSearch && matchesComputer && matchesEmpty && matchesProjector && matchesBuilding
  })

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-muted-foreground">
          {filteredRooms.length > 0 ? (
            <>
              총 <span className="font-semibold text-foreground">{filteredRooms.length}개</span>의 공간이 있습니다
            </>
          ) : (
            <span className="text-destructive font-medium">검색 결과가 없습니다</span>
          )}
        </p>
      </div>

      {filteredRooms.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredRooms.map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
            <Search className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold mb-2">검색 결과가 없습니다</h3>
          <p className="text-sm text-muted-foreground max-w-md">다른 검색어를 입력하거나 필터를 조정해보세요</p>
        </div>
      )}
    </div>
  )
}

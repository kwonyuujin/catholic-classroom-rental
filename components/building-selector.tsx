"use client"

import { Button } from "@/components/ui/button"
import { Building2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { rooms } from "@/lib/room-data"

const buildings = [
  { id: "all", name: "전체", count: rooms.length },
  { id: "dasol", name: "다솔관", count: rooms.filter((r) => r.buildingId === "dasol").length },
  { id: "nichols", name: "니콜스관", count: rooms.filter((r) => r.buildingId === "nichols").length },
  { id: "maria", name: "마리아관", count: rooms.filter((r) => r.buildingId === "maria").length },
  { id: "bambino", name: "밤비노관", count: rooms.filter((r) => r.buildingId === "bambino").length },
  { id: "virtus", name: "비르투스관", count: rooms.filter((r) => r.buildingId === "virtus").length },
  { id: "seongsim", name: "성심관", count: rooms.filter((r) => r.buildingId === "seongsim").length },
  { id: "student", name: "학생회관", count: rooms.filter((r) => r.buildingId === "student").length },
  { id: "kim", name: "김수환관", count: rooms.filter((r) => r.buildingId === "kim").length },
  { id: "michael", name: "미카엘관", count: rooms.filter((r) => r.buildingId === "michael").length },
  { id: "library", name: "도서관", count: rooms.filter((r) => r.buildingId === "library").length },
]

interface BuildingSelectorProps {
  selectedBuilding: string
  onSelectBuilding: (buildingId: string) => void
}

export function BuildingSelector({ selectedBuilding, onSelectBuilding }: BuildingSelectorProps) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2">
      <Building2 className="h-4 w-4 text-muted-foreground flex-shrink-0" />
      {buildings.map((building) => (
        <Button
          key={building.id}
          variant={selectedBuilding === building.id ? "default" : "outline"}
          size="sm"
          onClick={() => onSelectBuilding(building.id)}
          className={cn("flex-shrink-0 gap-2", selectedBuilding === building.id && "shadow-md")}
        >
          {building.name}
          <span
            className={cn(
              "px-1.5 py-0.5 rounded-full text-xs font-semibold",
              selectedBuilding === building.id
                ? "bg-primary-foreground/20 text-primary-foreground"
                : "bg-muted text-muted-foreground",
            )}
          >
            {building.count}
          </span>
        </Button>
      ))}
    </div>
  )
}

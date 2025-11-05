"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { SearchFilters } from "@/components/search-filters"
import { RoomGrid } from "@/components/room-grid"
import { StatsBar } from "@/components/stats-bar"
import { BuildingSelector } from "@/components/building-selector"

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filters, setFilters] = useState({
    hasComputer: false,
    isEmpty: false,
    hasProjector: false,
  })
  const [selectedBuilding, setSelectedBuilding] = useState("all")

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-6 space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-balance">공간대여신청</h1>
          <p className="text-muted-foreground text-pretty">스터디 활동, 학생 활동 등을 위한 공간이 준비되어 있어요!</p>
        </div>

        <StatsBar />
        <BuildingSelector selectedBuilding={selectedBuilding} onSelectBuilding={setSelectedBuilding} />
        <SearchFilters
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          filters={filters}
          setFilters={setFilters}
        />
        <RoomGrid searchQuery={searchQuery} filters={filters} selectedBuilding={selectedBuilding} />
      </main>
    </div>
  )
}

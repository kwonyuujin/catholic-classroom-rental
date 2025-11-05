"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, SlidersHorizontal, Monitor, Users, Projector, X } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface SearchFiltersProps {
  searchQuery: string
  setSearchQuery: (query: string) => void
  filters: {
    hasComputer: boolean
    isEmpty: boolean
    hasProjector: boolean
  }
  setFilters: (filters: { hasComputer: boolean; isEmpty: boolean; hasProjector: boolean }) => void
}

export function SearchFilters({ searchQuery, setSearchQuery, filters, setFilters }: SearchFiltersProps) {
  const activeFilterCount = Object.values(filters).filter(Boolean).length

  const clearAllFilters = () => {
    setFilters({
      hasComputer: false,
      isEmpty: false,
      hasProjector: false,
    })
    setSearchQuery("")
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="강의실 이름, 건물명을 검색하세요..." 
            className="pl-10" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-2 bg-transparent relative">
              <SlidersHorizontal className="h-4 w-4" />
              필터
              {activeFilterCount > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                  {activeFilterCount}
                </span>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>시설 조건</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuCheckboxItem
              checked={filters.hasComputer}
              onCheckedChange={(checked) => setFilters({ ...filters, hasComputer: checked })}
            >
              <Monitor className="mr-2 h-4 w-4" />
              컴퓨터 있음
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={filters.isEmpty}
              onCheckedChange={(checked) => setFilters({ ...filters, isEmpty: checked })}
            >
              <Users className="mr-2 h-4 w-4" />
              빈 강의실만
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={filters.hasProjector}
              onCheckedChange={(checked) => setFilters({ ...filters, hasProjector: checked })}
            >
              <Projector className="mr-2 h-4 w-4" />
              프로젝터 있음
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {(activeFilterCount > 0 || searchQuery) && (
          <Button variant="ghost" onClick={clearAllFilters} className="gap-2">
            <X className="h-4 w-4" />
            초기화
          </Button>
        )}
      </div>

      {(filters.hasComputer || filters.isEmpty || filters.hasProjector) && (
        <div className="flex flex-wrap gap-2">
          {filters.hasComputer && (
            <button
              onClick={() => setFilters({ ...filters, hasComputer: false })}
              className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm hover:bg-primary/20 transition-colors"
            >
              <Monitor className="h-3 w-3" />
              컴퓨터 있음
              <X className="h-3 w-3 ml-1" />
            </button>
          )}
          {filters.isEmpty && (
            <button
              onClick={() => setFilters({ ...filters, isEmpty: false })}
              className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-success/10 text-success text-sm hover:bg-success/20 transition-colors"
            >
              <Users className="h-3 w-3" />
              빈 강의실만
              <X className="h-3 w-3 ml-1" />
            </button>
          )}
          {filters.hasProjector && (
            <button
              onClick={() => setFilters({ ...filters, hasProjector: false })}
              className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-accent/10 text-accent text-sm hover:bg-accent/20 transition-colors"
            >
              <Projector className="h-3 w-3" />
              프로젝터 있음
              <X className="h-3 w-3 ml-1" />
            </button>
          )}
        </div>
      )}
    </div>
  )
}

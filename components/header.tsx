"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { NotificationDropdown } from "./notification-dropdown"
import { ProfileDropdown } from "./profile-dropdown"

export function Header() {
  const router = useRouter()
  const { isLoggedIn, userName, logout } = useAuth()

  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  const handleLoginClick = () => {
    router.push("/login")
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => router.push("/")}>
          <div className="relative h-10 w-40">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-6eBaEzXJjiAj27pe1xbIXO0dkN5tM0.png"
              alt="가톨릭대학교"
              fill
              className="object-contain"
              priority
            />
          </div>
          <div className="h-6 w-px bg-border" />
          <span className="text-sm font-medium">강의실 대여 시스템</span>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          <a href="#" className="text-sm font-medium hover:text-primary transition-colors">
            학생지원서비스
          </a>
          <a href="#" className="text-sm font-medium hover:text-primary transition-colors">
            지원서비스
          </a>
          <a href="#" className="text-sm font-medium text-primary">
            공간대여신청
          </a>
        </nav>

        <div className="flex items-center gap-2">
          <NotificationDropdown />
          <ProfileDropdown />
          {isLoggedIn && (
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">{userName}</span>
              <Button variant="outline" size="sm" onClick={handleLogout} className="gap-2 bg-transparent">
                <LogOut className="h-4 w-4" />
                로그아웃
              </Button>
            </div>
          )}
          {!isLoggedIn && (
            <Button onClick={handleLoginClick} className="hidden sm:inline-flex">
              Trinity 로그인
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}

"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { useAuth } from "@/lib/auth-context"
import { AlertCircle, Info } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const { login, isLoggedIn } = useAuth()
  const [userId, setUserId] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showDemoInfo, setShowDemoInfo] = useState(true)

  // 이미 로그인되어 있으면 대시보드로 리디렉션
  useEffect(() => {
    if (isLoggedIn) {
      router.push("/")
    }
  }, [isLoggedIn, router])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!userId || !password) {
      setError("ID와 비밀번호를 입력해주세요.")
      return
    }

    setIsLoading(true)

    try {
      console.log("[v0] Attempting login with:", userId)
      const success = await login(userId, password)
      if (success) {
        console.log("[v0] Login successful, redirecting...")
        router.push("/")
      } else {
        setError("사용자 ID 또는 비밀번호가 올바르지 않습니다.")
      }
    } catch (err) {
      console.log("[v0] Login error:", err)
      setError("로그인 중 오류가 발생했습니다.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleDemoLogin = async () => {
    setUserId("student001@cuk.edu")
    setPassword("password123")
    setIsLoading(true)

    try {
      const success = await login("student001@cuk.edu", "password123")
      if (success) {
        router.push("/")
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900">
      <div
        className="absolute inset-0 opacity-15"
        style={{
          backgroundImage:
            "url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-9yFWxrH4vbjk6TaWvePS3xVigMANWR.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      <div className="relative flex items-center justify-center min-h-screen px-4">
        <div className="flex items-center justify-center w-full max-w-md">
          <Card className="w-full shadow-2xl">
            <CardContent className="pt-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-slate-900">Member Login</h2>
                <p className="text-sm text-slate-500 mt-2">Trinity 계정으로 로그인하세요</p>
              </div>

              {showDemoInfo && (
                <div className="flex gap-2 p-3 bg-blue-50 border border-blue-200 rounded-lg mb-4">
                  <Info className="h-4 w-4 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div className="text-xs text-blue-700">
                    <p className="font-semibold mb-1">테스트 계정:</p>
                    <p>ID: student001@cuk.edu</p>
                    <p>비밀번호: password123</p>
                  </div>
                  <button onClick={() => setShowDemoInfo(false)} className="ml-auto text-blue-400 hover:text-blue-600">
                    ✕
                  </button>
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-4">
                {error && (
                  <div className="flex items-center gap-2 p-3 bg-destructive/10 border border-destructive/30 rounded-lg">
                    <AlertCircle className="h-4 w-4 text-destructive flex-shrink-0" />
                    <p className="text-sm text-destructive">{error}</p>
                  </div>
                )}

                <div>
                  <Input
                    placeholder="사용자 ID를 입력해주세요"
                    type="text"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    className="bg-slate-50 border-slate-200 placeholder:text-slate-400"
                  />
                </div>

                <div>
                  <Input
                    placeholder="비밀번호를 입력해주세요"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-slate-50 border-slate-200 placeholder:text-slate-400"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold py-2"
                >
                  {isLoading ? "로그인 중..." : "로그인"}
                </Button>

                <Button
                  type="button"
                  onClick={handleDemoLogin}
                  disabled={isLoading}
                  variant="outline"
                  className="w-full bg-transparent"
                >
                  테스트 계정으로 로그인
                </Button>
              </form>

              <div className="flex items-center justify-center gap-3 text-xs text-slate-500 mt-6 pt-6 border-t border-slate-200">
                <a href="#" className="hover:text-slate-700 transition-colors">
                  사용자ID찾기
                </a>
                <span>|</span>
                <a href="#" className="hover:text-slate-700 transition-colors">
                  비밀번호찾기
                </a>
                <span>|</span>
                <a href="#" className="hover:text-slate-700 transition-colors">
                  회원가입
                </a>
              </div>

              <div className="mt-6 pt-6 border-t border-slate-200 space-y-2 text-xs text-slate-500">
                <p className="font-medium">시스템관련문의</p>
                <p>영업 09-12시, 13-17시</p>
                <p>성심/성심교관: 02-2164-4160, 4812, 4162</p>
                <p className="text-[11px]">© The Catholic University of Korea. All rights reserved.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

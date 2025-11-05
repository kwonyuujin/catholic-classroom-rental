import type React from "react"
import type { Metadata } from "next"
import { Noto_Sans_KR } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { AuthProvider } from "@/lib/auth-context"
import { ToastContainer } from "@/components/toast-notification"
import "./globals.css"

const notoSansKR = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "가톨릭대학교 강의실 대여",
  description: "가톨릭대학교 강의실 및 공간 대여 시스템",
  generator: "Technologia",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko">
      <body className={`${notoSansKR.variable} font-sans antialiased`}>
        <AuthProvider>
          {children}
          <ToastContainer />
          <Analytics />
        </AuthProvider>
      </body>
    </html>
  )
}

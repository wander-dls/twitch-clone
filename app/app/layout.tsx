'use client'

import { DatabaseProvider } from "@/contexts/databaseContext"

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <DatabaseProvider>
      {children}
    </DatabaseProvider>
  )
}
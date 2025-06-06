// app/(auth)/login/layout.tsx

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-[#1b2c29] text-white">
      {children}
    </div>
  )
}

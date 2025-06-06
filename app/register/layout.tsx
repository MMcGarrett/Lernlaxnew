export default function RegisterLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body suppressHydrationWarning={true}>
        {children}
      </body>
    </html>
  )
}

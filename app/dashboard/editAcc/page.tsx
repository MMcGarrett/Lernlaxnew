import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import fs from 'fs'
import path from 'path'
import EditAccountForm from '@/components/EditAccountForm'
import HeaderLogo from '@/components/HeaderLogo'
import Footer from '@/components/Footer'
import Link from 'next/link'

export default async function EditAccountPage() {
  const cookieStore = await cookies()
  const session = cookieStore.get('session_user')?.value

  if (!session) redirect('/login')

  let userId: number
  try {
    userId = JSON.parse(session).id
  } catch {
    redirect('/login')
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      username: true,
      first_name: true,
      last_name: true,
      avatar_url: true,
    },
  })

  if (!user) redirect('/login')

  const folders = ['Avatare_D', 'Avatare_M', 'Avatare_W']
  const avatars: string[] = []
  const basePath = path.join(process.cwd(), 'public')

  for (const folder of folders) {
    const files = fs.readdirSync(path.join(basePath, folder))
    files.forEach(file => avatars.push(`/${folder}/${file}`))
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#1b2c29] text-white relative px-6 pt-8 pb-24">
      {/* Logo oben rechts */}
      <div className="absolute top-8 right-8 z-50">
        <HeaderLogo />
      </div>

      <main className="w-full max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-12">Mein Account – Accounteinstellungen</h1>

        <EditAccountForm
          initialData={{
            username: user.username,
            first_name: user.first_name,
            last_name: user.last_name,
            avatar_url: user.avatar_url ?? '/Avatare_M/Luca.png',
          }}
          avatarOptions={avatars}
        />

        <div className="text-center mt-12">
          <Link
            href="/dashboard"
            className="inline-block bg-gray-700 hover:bg-gray-600 text-white px-6 py-2 rounded-full transition"
          >
            Zurück zum Dashboard
          </Link>
        </div>
      </main>

      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  )
}

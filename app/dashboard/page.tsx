import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import HeaderLogo from '@/components/HeaderLogo';
import Footer from '@/components/Footer';
import DashboardTiles from '@/components/DashboardTiles';
import MoodTracker from '@/components/MoodTracker';
import LogoutButton from '@/components/LogoutButton';
import RetakeQuizButton from '@/components/RetakeQuizButton'

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const sessionRaw = cookieStore.get('session_user')?.value;

  if (!sessionRaw) {
    redirect('/login');
  }

  let sessionUser: { id: number };
  try {
    sessionUser = JSON.parse(sessionRaw);
    if (!sessionUser?.id) throw new Error();
  } catch {
    redirect('/login');
  }

  // Benutzer aus DB holen
  const dbUser = await prisma.user.findUnique({
    where: { id: sessionUser.id },
    select: {
      first_name: true,
      avatar_url: true,
    },
  });

  if (!dbUser) redirect('/login');

  const avatarUrl = `/${(dbUser.avatar_url || 'Avatare_M/Luca.png').replace(/^\/+/, '')}`;

  // Letzten Quiz-Ergebnistext holen
  const lastResult = await prisma.quizSession.findFirst({
    where: {
      user_id: sessionUser.id,
    },
    orderBy: {
      created_at: 'desc',
    },
    select: {
      result: {
        select: {
          resultText: true,
        },
      },
    },
  });

  return (
    <div className="min-h-screen flex flex-col bg-[#1b2c29] text-white relative px-6 pt-8 pb-24">
      {/* Logo oben rechts */}
      <div className="absolute top-8 right-8 z-50">
        <HeaderLogo />
      </div>

      <main className="w-full max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-12">Mein Account – Dashboard</h1>
        <h2 className="text-2xl font-bold mt-4">
          Hallo {dbUser.first_name}, viel Spaß heute im Dashboard!
        </h2>

        <DashboardTiles avatarUrl={avatarUrl} />
        <div className="h-16" />
        <MoodTracker firstName={dbUser.first_name} />

        <section className="mt-16">
          <h2 className="text-2xl font-bold mb-4">Dein persönlicher Tipp!</h2>
          <div className="text-sm space-y-4 text-gray-100 whitespace-pre-line">
            {lastResult?.result?.resultText ? (
              lastResult.result.resultText
            ) : (
              <p>Du hast noch kein Quiz gemacht. Starte eines in „Dein Weg“!</p>
            )}
          </div>
          <RetakeQuizButton />
        </section>
      </main>

      <div className="mt-auto">
        <Footer />
      </div>

      <LogoutButton />
    </div>
  );
}

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
  const cookieStore = await cookies(); // ✅ await hinzufügen
  const sessionUser = cookieStore.get('session_user');

  if (!sessionUser) {
    redirect('/login');
  }

  return (
    <main className="p-6 text-white">
      <h1 className="text-3xl font-bold">Willkommen im Dashboard!</h1>
    </main>
  );
}

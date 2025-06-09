import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcrypt';

export async function POST(req: Request) {
  const data = await req.json();
  const { email, username, firstname, lastname, password, confirmPassword } = data;

  if (!email || !username || !firstname || !lastname || !password || !confirmPassword) {
    return NextResponse.json({ error: 'Alle Felder sind erforderlich.' }, { status: 400 });
  }

  if (password !== confirmPassword) {
    return NextResponse.json({ error: 'Passwörter stimmen nicht überein.' }, { status: 400 });
  }

  const existingUser = await prisma.user.findFirst({
    where: {
      OR: [{ email }, { username }],
    },
  });

  if (existingUser) {
    return NextResponse.json({ error: 'Benutzer existiert bereits.' }, { status: 400 });
  }

  const password_hash = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      email,
      username,
      first_name: firstname,
      last_name: lastname,
      password_hash,
    },
  });

  return NextResponse.json({ success: true, userId: user.id });
}

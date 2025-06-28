import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { answers, userId } = body;

    if (!answers || !Array.isArray(answers)) {
      return NextResponse.json(
        { error: 'Ungültige Datenstruktur: answers fehlt oder ist kein Array.' },
        { status: 400 }
      );
    }

    const formattedAnswers = answers.map((a: { questionId: string; selectedIndex: number }, index: number) => {
      if (
        typeof a.questionId !== 'string' ||
        typeof a.selectedIndex !== 'number'
      ) {
        throw new Error(`Ungültiges Format in answers[${index}]`);
      }

      return {
        selected: a.selectedIndex,
        question: {
          connect: { id: a.questionId }
        }
      };
    });

    const session = await prisma.quizSession.create({
      data: {
        user_id: userId ?? null,
        answers: {
          create: formattedAnswers
        }
      },
      include: { answers: true }
    });

    // Cookie mit Session-ID setzen
    const response = NextResponse.json({ success: true, session });
    response.cookies.set('quiz_session_id', String(session.id), {
      path: '/',
      httpOnly: true, // Server-only Zugriff
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7 // 7 Tage gültig
    });

    return response;

  } catch (error) {
    console.error('[QUIZ API] Fehler beim Speichern der Antworten:', error);
    return NextResponse.json({ error: 'Fehler beim Speichern der Antworten.' }, { status: 500 });
  }
}

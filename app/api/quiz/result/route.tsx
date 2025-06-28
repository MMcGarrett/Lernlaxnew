// --- Datei: app/api/quiz/results/route.ts ---
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
  const sessionId = req.nextUrl.searchParams.get('sessionId');

  if (!sessionId) {
    return NextResponse.json({ error: 'sessionId fehlt' }, { status: 400 });
  }

  try {
    const session = await prisma.quizSession.findUnique({
      where: { id: parseInt(sessionId) },
      include: {
        answers: {
          include: {
            question: true,
          },
        },
      },
    });

    if (!session) {
      return NextResponse.json({ error: 'Session nicht gefunden' }, { status: 404 });
    }

    const result = session.answers.map((a) => ({
      questionId: a.question_id,
      questionText: a.question.text,
      selected: a.selected,
    }));

    return NextResponse.json({ result });
  } catch (error) {
    console.error('[LOAD RESULT API]', error);
    return NextResponse.json({ error: 'Serverfehler beim Laden' }, { status: 500 });
  }
}

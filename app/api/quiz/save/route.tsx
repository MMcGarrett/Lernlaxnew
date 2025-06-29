import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getResultText } from '@/lib/getResultText';

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

    // Ergebnistext erzeugen
    const resultText = answers
      .map((a: { questionId: string; selectedIndex: number }) =>
        getResultText(a.questionId, a.selectedIndex)
      )
      .filter(Boolean)
      .join('\n\n');

    // Session & Result speichern
    const session = await prisma.quizSession.create({
      data: {
        user_id: userId ?? null,
        answers: {
          create: formattedAnswers
        },
        result: {
          create: {
            resultText
          }
        }
      },
      include: { answers: true, result: true }
    });

    const response = NextResponse.json({ success: true, session });
    response.cookies.set('quizSessionId', '', {
      path: '/',
      maxAge: 0, // Cookie löschen
    });
    // Cookie mit Session-ID setzen
    response.cookies.set('quizSessionId', String(session.id), {
      path: '/',
      httpOnly: true,
      sameSite: 'lax',
      maxAge: 60 * 10,
    });

    return NextResponse.json({ success: true, session, resultText });

  } catch (error) {
    console.error('[QUIZ API] Fehler beim Speichern der Antworten:', error);
    return NextResponse.json({ error: 'Fehler beim Speichern der Antworten.' }, { status: 500 });
  }
}

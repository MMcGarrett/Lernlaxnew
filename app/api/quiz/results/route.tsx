import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const sessionId = searchParams.get('sessionId');

  if (!sessionId || isNaN(Number(sessionId))) {
    return NextResponse.json({ error: 'Ungültige oder fehlende sessionId' }, { status: 400 });
  }

  const session = await prisma.quizSession.findUnique({
    where: { id: Number(sessionId) },
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
}
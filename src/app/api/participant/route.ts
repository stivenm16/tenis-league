import db from '@/libs/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  const getAllParticipants = await db.participant.findMany()

  return NextResponse.json(getAllParticipants)
}

export async function POST(request) {
  const data = await request.json()
  try {
    const participant = await db.participant.create({
      data: {
        user: { connect: { id: data.userId } },
        tournament: { connect: { id: data.tournamentId } },
      },
    })

    console.log(participant, 'participant ')
    return NextResponse.json(participant)
  } catch (error) {
    console.error(error)
  }
}

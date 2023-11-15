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

    return NextResponse.json(participant)
  } catch (error) {
    console.error(error)
  }
}
export async function DELETE(request) {
  const data = await request.json()
  console.log(typeof data.tournamentId)
  try {
    const tournament = await db.tournament.findUnique({
      where: { id: data.tournamentId },
      include: { participants: true },
    })

    if (!tournament) {
      return NextResponse.json(
        {
          message: 'Tournament not found',
        },
        {
          status: 404,
        },
      )
    }

    const res = await db.participant.deleteMany({
      where: {
        userId: {
          in: data.participantIds,
        },
        tournamentId: data.tournamentId,
      },
    })

    console.log('Participants deleted successfully')

    return NextResponse.json(
      {
        message: 'Participants deleted successfully',
      },
      {
        status: 200,
      },
    )
  } catch (error) {
    console.error('Error deleting participants:', error)
    return NextResponse.json(
      {
        error: 'Internal Server Error',
      },
      {
        status: 500,
      },
    )
  }
}

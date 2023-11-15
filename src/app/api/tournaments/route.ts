import db from '@/libs/prisma'
import { NextResponse } from 'next/server'

export async function POST(request) {
  const data = await request.json()
  try {
    const tournament = await db.tournament.create({
      data: {
        name: data.name,
        date: data.date,
      },
    })

    return NextResponse.json(tournament)
  } catch (error) {
    console.error(error)
  }
}
export async function GET() {
  const getAllTournaments = await db.tournament.findMany()

  return NextResponse.json(getAllTournaments)
}

export async function PUT(request) {
  const data = await request.json()
  try {
    const existingTournament = await db.tournament.findUnique({
      where: { id: parseInt(data.tournamentId, 10) },
    })

    const updatedTournament = await db.tournament.update({
      where: { id: parseInt(data.tournamentId, 10) },
      data: {
        name: data.name,
      },
    })

    return NextResponse.json(updatedTournament)
  } catch (error) {
    return NextResponse.json({ message: 'Internal Server Error' })
  }
}

export async function DELETE(request) {
  try {
    const data = await request.json()

    const tournamentId = data.id

    const tournamentFound = await db.tournament.findUnique({
      where: {
        id: tournamentId,
      },
    })

    if (!tournamentFound) {
      return NextResponse.json(
        {
          message: 'Tournament not found',
        },
        {
          status: 404,
        },
      )
    }

    // Delete the user
    await db.tournament.delete({
      where: {
        id: tournamentId,
      },
    })

    return NextResponse.json(
      {
        message: 'Tournament deleted successfully',
      },
      {
        status: 200,
      },
    )
  } catch (error) {
    return NextResponse.json(
      {
        message: error.message,
      },
      {
        status: 500,
      },
    )
  }
}

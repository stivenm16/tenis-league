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

import db from '@/libs/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  const getAllUsers = await db.user.findMany()

  return NextResponse.json(getAllUsers)
}
export async function PUT(request) {
  const data = await request.json()

  try {
    const existingUser = await db.user.findUnique({
      where: { id: parseInt(data.userId, 10) },
    })

    const updatedUser = await db.user.update({
      where: { id: parseInt(data.userId, 10) },
      data: {
        userName: data.userName,
      },
    })

    return NextResponse.json(updatedUser)
  } catch (error) {
    return NextResponse.json({ message: 'Internal Server Error' })
  }
}
export async function DELETE(request) {
  try {
    const data = await request.json()

    const userId = data.id

    const userFound = await db.user.findUnique({
      where: {
        id: userId,
      },
    })

    if (!userFound) {
      return NextResponse.json(
        {
          message: 'User not found',
        },
        {
          status: 404,
        },
      )
    }

    await db.user.delete({
      where: {
        id: userId,
      },
    })

    return NextResponse.json(
      {
        message: 'User deleted successfully',
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

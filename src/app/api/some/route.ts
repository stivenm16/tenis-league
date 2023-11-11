import db from '@/libs/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  const getAllUsers = await db.user.findMany()

  return NextResponse.json(getAllUsers)
}
export async function DELETE(request) {
  try {
    const data = await request.json()

    // Assuming you pass the user ID in the request body
    const userEmail = data.email

    // Find the user by ID
    const userFound = await db.user.findUnique({
      where: {
        email: userEmail,
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

    // Delete the user
    await db.user.delete({
      where: {
        email: userEmail,
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

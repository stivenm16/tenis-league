import db from '@/libs/prisma'
import bcrypt from 'bcrypt'
import { NextResponse } from 'next/server'

export async function POST(request) {
  try {
    const data = await request.json()

    const userFound = await db.user.findUnique({
      where: {
        email: data.email,
      },
    })

    if (userFound) {
      return NextResponse.json(
        {
          message: 'Email already exists',
        },
        {
          status: 400,
        },
      )
    }

    const usernameFound = await db.user.findUnique({
      where: {
        userName: data.userName,
      },
    })

    if (usernameFound) {
      return NextResponse.json(
        {
          message: 'username already exists',
        },
        {
          status: 400,
        },
      )
    }

    const hashedPassword = await bcrypt.hash(data.password, 10)
    const newUser = await db.user.create({
      data: {
        userName: data.userName,
        email: data.email,
        password: hashedPassword,
      },
    })

    const { password: _, ...user } = newUser

    return NextResponse.json(user)
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

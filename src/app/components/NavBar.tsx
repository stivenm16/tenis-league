'use client'
import { useSession } from 'next-auth/react'
import Link from 'next/link'

function Navbar() {
  const { data: session, status } = useSession()

  return (
    <nav className="flex justify-between items-center bg-gray-950 text-white px-24 py-3">
      <h1 className="text-xl font-bold">Tenis League</h1>

      <ul className="flex gap-x-2">
        {!session?.user ? (
          <>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/auth/login">Iniciar sesión</Link>
            </li>
            <li>
              <Link href="/auth/register">Registro</Link>
            </li>
          </>
        ) : (
          <>
            <h1>{session.user.role}</h1>
            <li>
              <Link href="/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link href="/api/auth/signout">Cerrar sesión</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  )
}

export default Navbar

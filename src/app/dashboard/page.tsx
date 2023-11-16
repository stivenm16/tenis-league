'use client'
import { useSession } from 'next-auth/react'
import DashboardAdmin from '../components/DashboardAdmin'
import DashboardUser from '../components/DashboardUser'
import { UserRolesT } from '../types'

const DashBoardRoute = () => {
  const { data: session, status } = useSession()
  return session?.user ? (
    <>
      {session?.user.role === UserRolesT.ADMIN ? (
        <DashboardAdmin />
      ) : (
        <DashboardUser userId={session.user.userId} />
      )}
    </>
  ) : (
    'Loading...'
  )
}

function DashboardPage() {
  return (
    <section className="h-[calc(100vh-7rem)] flex justify-center items-center">
      <div>
        <h1 className="text-white text-5xl pt-10">Dashboard</h1>
        <DashBoardRoute />
      </div>
    </section>
  )
}
export default DashboardPage

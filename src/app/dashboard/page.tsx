'use client'
import { SessionProvider, signOut, useSession } from 'next-auth/react'
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
  // const deleteUser = async () => {
  //   const res = await deleteUser()
  //   const updatedUsers = users.filter((user) => user.id !== 1)
  //   setUsers(updatedUsers)
  // }

  return (
    <SessionProvider>
      <section className="h-[calc(100vh-7rem)] flex justify-center items-center">
        <div>
          <h1 className="text-white text-5xl">Dashboard</h1>
          <DashBoardRoute />

          <button
            className="bg-white text-black px-4 py-2 rounded-md mt-4 ml-2"
            onClick={() => signOut()}
          >
            Logout
          </button>
        </div>
      </section>
    </SessionProvider>
  )
}
export default DashboardPage

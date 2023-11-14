'use client'
import { getAllParticipants } from '@/services/participants.service'
import { createTournament } from '@/services/tournaments.service'
import { getAllUsers } from '@/services/users.service'
import { SessionProvider, signOut } from 'next-auth/react'
import { useEffect, useState } from 'react'
import DashboardAdmin from '../components/DashboardAdmin'
import DashboardUser from '../components/DashboardUser'

// const UserItem = ({ user, onDelete, onEdit }) => {
//   const [isEditing, setIsEditing] = useState(false)
//   const [editedUserName, setEditedUserName] = useState(user.userName)

//   const handleEdit = () => {
//     onEdit(user.id, editedUserName)
//     setIsEditing(false)
//   }

//   return (
//     <li className="bg-white text-black rounded-md p-4 my-4 flex justify-between items-center shadow-md">
//       <div>
//         {isEditing ? (
//           <div>
//             <input
//               type="text"
//               value={editedUserName}
//               onChange={(e) => setEditedUserName(e.target.value)}
//               className="border rounded-md px-2 py-1 mr-2"
//             />
//             <button
//               onClick={handleEdit}
//               className="bg-green-500 text-white px-4 py-2 rounded-md"
//             >
//               Guardar
//             </button>
//           </div>
//         ) : (
//           <div className="flex">
//             <span className="text-lg ">{user.userName}</span>
//             <div className="flex ml-4">
//               <button
//                 onClick={() => setIsEditing(true)}
//                 className="bg-blue-500 text-white px-3 py-1 rounded-md mr-2"
//               >
//                 Editar
//               </button>
//               <button
//                 onClick={() => onDelete(user.id)}
//                 className="bg-red-500 text-white px-3 py-1 rounded-md"
//               >
//                 Eliminar
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </li>
//   )
// }

function DashboardPage() {
  const [users, setUsers] = useState<any>()
  const [participant, setParticipant] = useState<any>()
  const deleteUser = async () => {
    const res = await deleteUser()
    const updatedUsers = users.filter((user) => user.id !== 1)
    setUsers(updatedUsers)
  }

  const editUser = async (userId, newUserName) => {
    console.log(`Editando usuario ${userId} con nuevo nombre: ${newUserName}`)
  }
  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllUsers()
      setUsers(data)
    }
    const fetchParticipants = async () => {
      const data = await getAllParticipants()
      setParticipant(data)
    }

    fetchParticipants()
    fetchData()
  }, [])
  return (
    <SessionProvider>
      <section className="h-[calc(100vh-7rem)] flex justify-center items-center">
        <div>
          <h1 className="text-white text-5xl">Dashboard</h1>
          <button
            className="bg-white text-black px-4 py-2 rounded-md mt-4"
            onClick={() => signOut()}
          >
            Logout
          </button>

          <DashboardAdmin />
          <DashboardUser />
          <button
            onClick={() => createTournament()}
            className="bg-white text-black px-4 py-2 rounded-md mt-4"
          >
            Create Tournament
          </button>
        </div>
      </section>
    </SessionProvider>
  )
}
export default DashboardPage

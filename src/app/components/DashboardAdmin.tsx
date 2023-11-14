import { createTournament } from '@/services/tournaments.service'
import { getAllUsers, updateUser } from '@/services/users.service'
import { useEffect, useState } from 'react'
import UserItem from './UserItem'

const DashboardAdmin = () => {
  const [tournamentName, setTournamentName] = useState('')
  const [isCreatingTournament, setIsCreatingTournament] = useState(false)
  const editUser = async (userId, newUserName) => {
    try {
      console.log(`Editando usuario ${userId} con nuevo nombre: ${newUserName}`)
      // Realiza la actualización en la base de datos
      const userUpdated = await updateUser({ userName: newUserName, userId })

      // Actualiza el estado local
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId ? { ...user, userName: newUserName } : user,
        ),
      )
    } catch (error) {
      console.log('Hubo un error')
    }
  }
  const handleCreateTournament = async () => {
    if (tournamentName.trim() !== '') {
      await createTournament(tournamentName)
      setTournamentName('')
      setIsCreatingTournament(false)
    }
  }
  const deleteUser = async () => {
    const res = await deleteUser()
    const updatedUsers = users.filter((user) => user.id !== 1)
    setUsers(updatedUsers)
  }
  const [users, setUsers] = useState<any>()

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllUsers()
      setUsers(data)
    }

    fetchData()
  }, [])

  return (
    <>
      <ul className="list-disc list-inside">
        {users &&
          users.map((user) => (
            <UserItem
              key={user.id}
              user={user}
              onDelete={deleteUser}
              onEdit={editUser}
            />
          ))}
      </ul>
      {isCreatingTournament ? (
        <div>
          <input
            type="text"
            placeholder="Enter Tournament Name"
            value={tournamentName}
            className="border rounded-md px-2 py-1 mr-2"
            onChange={(e) => setTournamentName(e.target.value)}
          />
          <button
            className="bg-white text-black mt-4 mx-3 py-1 rounded-md px-4"
            onClick={handleCreateTournament}
          >
            Create
          </button>
          <button onClick={() => setIsCreatingTournament(false)}>Cancel</button>
        </div>
      ) : (
        <button
          onClick={() => setIsCreatingTournament(true)}
          className="bg-white text-black px-4 py-2 rounded-md mt-4"
        >
          Create Tournament
        </button>
      )}
    </>
  )
}

export default DashboardAdmin

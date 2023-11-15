import {
  createTournament,
  deleteTournament,
  getAllTournaments,
  updateTournament,
} from '@/services/tournaments.service'
import { deleteUser, getAllUsers, updateUser } from '@/services/users.service'
import { useEffect, useState } from 'react'
import TournamentItem from './TournamentItem'
import UserItem from './UserItem'

const DashboardAdmin = () => {
  const [tournamentName, setTournamentName] = useState('')
  const [isCreatingTournament, setIsCreatingTournament] = useState(false)
  const [tournaments, setTournaments] = useState<any[]>([])
  const [users, setUsers] = useState<any>()
  const editUser = async (userId, newUserName) => {
    try {
      console.log(`Editando usuario ${userId} con nuevo nombre: ${newUserName}`)
      await updateUser({ userName: newUserName, userId })

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId ? { ...user, userName: newUserName } : user,
        ),
      )
    } catch (error) {
      console.log('Hubo un error')
    }
  }

  const handleEditTournament = async (tournamentId, newTournamentName) => {
    try {
      await updateTournament({ tournamentId, name: newTournamentName })
      setTournaments((prevTournaments) =>
        prevTournaments.map((tournament) =>
          tournament.tournamentId === tournamentId
            ? { ...tournament, tournamentName: newTournamentName }
            : tournament,
        ),
      )
    } catch (error) {
      console.log('Hubo un error al editar el torneo')
    }
  }
  const handleCreateTournament = async () => {
    if (tournamentName.trim() !== '') {
      await createTournament(tournamentName)
      setTournamentName('')
      setIsCreatingTournament(false)
    }
  }
  const handleDeleteTournament = async (id) => {
    await deleteTournament({ id })
    const updatedTournaments = tournaments.filter(
      (tournament) => tournament.id !== id,
    )
    setTournaments(updatedTournaments)
  }

  const handleDeleteUser = async (id) => {
    await deleteUser({ id })
    const updatedUsers = users.filter((user) => user.id !== id)
    setUsers(updatedUsers)
  }

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllUsers()
      const tournaments = await getAllTournaments()
      setTournaments(tournaments)
      setUsers(data)
    }

    fetchData()
  }, [])

  return (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <h2 className="text-white text-3xl mt-6">Usuarios</h2>
        <ul className="list-disc list-inside">
          {users &&
            users.map((user) => (
              <UserItem
                key={user.id}
                user={user}
                onDelete={handleDeleteUser}
                onEdit={editUser}
              />
            ))}
        </ul>
      </div>
      <div>
        <h2 className="text-white text-3xl mt-6">Torneos actuales</h2>
        <ul>
          {tournaments.length > 0 &&
            tournaments.map((tournament) => (
              <TournamentItem
                tournament={tournament}
                onEdit={handleEditTournament}
                key={tournament.id}
                onDelete={handleDeleteTournament}
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
              Crear
            </button>
            <button onClick={() => setIsCreatingTournament(false)}>
              Cancelar
            </button>
          </div>
        ) : (
          <button
            onClick={() => setIsCreatingTournament(true)}
            className="bg-white text-black px-4 py-2 rounded-md mt-4"
          >
            Crear torneo
          </button>
        )}
      </div>
    </div>
  )
}

export default DashboardAdmin

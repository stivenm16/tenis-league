import {
  deleteParticipants,
  getAllParticipants,
} from '@/app/services/participants.service'
import {
  createTournament,
  deleteTournament,
  getAllTournaments,
  updateTournament,
} from '@/app/services/tournaments.service'
import {
  deleteUser,
  getAllUsers,
  updateUser,
} from '@/app/services/users.service'
import { useEffect, useState } from 'react'
import TournamentItem from './TournamentItem'
import UserItem from './UserItem'

const DashboardAdmin = () => {
  const [tournamentName, setTournamentName] = useState('')
  const [isCreatingTournament, setIsCreatingTournament] = useState(false)
  const [tournaments, setTournaments] = useState<any[]>([])
  const [participants, setParticipants] = useState<any[]>([])
  const [users, setUsers] = useState<any>()

  const editUser = async (userId, newUserName) => {
    try {
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
          tournament.id === tournamentId
            ? { ...tournament, name: newTournamentName }
            : tournament,
        ),
      )
    } catch (error) {
      console.log('Hubo un error al editar el torneo')
    }
  }
  const handleCreateTournament = async () => {
    if (tournamentName.trim() !== '') {
      const newTournament = await createTournament(tournamentName)
      setTournamentName('')
      setIsCreatingTournament(false)
      setTournaments((prev) => [...prev, newTournament])
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

  const handleParticipants = async (userIds, tournamentId) => {
    await deleteParticipants({
      tournamentId: tournamentId,
      participantIds: userIds,
    })
  }

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllUsers()
      const tournaments = await getAllTournaments()
      const participants = await getAllParticipants()
      setTournaments(tournaments)
      setParticipants(participants)
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
                handleParticipants={handleParticipants}
                participants={participants
                  .filter((e) => e.tournamentId === tournament.id)
                  .map((e) => {
                    const userWithId = users.find(
                      (user) => user.id === e.userId,
                    )
                    const userName = userWithId
                      ? userWithId.userName
                      : 'Usuario no encontrado'

                    return { ...e, userName }
                  })}
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
            className="bg-white text-black px-4 py-2 rounded-md mt-6"
          >
            Crear torneo
          </button>
        )}
      </div>
    </div>
  )
}

export default DashboardAdmin

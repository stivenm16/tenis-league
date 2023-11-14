import {
  createParticipant,
  getAllParticipants,
} from '@/services/participants.service'
import { getAllTournaments } from '@/services/tournaments.service'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'

const DashboardUser = ({ userId }) => {
  const { data: session, status } = useSession()

  const deleteUser = async () => {
    const res = await deleteUser()
  }

  const joinTournamentHandler = async (tournamentId) => {
    try {
      const participant = await createParticipant({
        userId,
        tournamentId,
      })
      setParticipants((participants) => [...participants, participant])
      console.log(`Te has unido al torneo ${tournamentId}`)
    } catch (error) {
      console.error('Error al intentar unirse al torneo:', error)
    }
  }

  const [participants, setParticipants] = useState<any>()
  const [tournaments, setTournaments] = useState<any>()

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllTournaments()
      const participants = await getAllParticipants()
      setTournaments(data)
      setParticipants(participants)
    }
    fetchData()
  }, [tournaments])

  return (
    <ul className="list-disc list-inside">
      {tournaments &&
        tournaments.map((tournament) => (
          <li
            key={tournament.id}
            className="bg-white text-black rounded-md p-4 my-4 flex justify-between items-center shadow-md"
          >
            <span>{tournament.name}</span>
            {participants.some(
              (p) => p.userId === userId && p.tournamentId === tournament.id,
            ) ? (
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => console.log('Saliendo')}
              >
                Salirse
              </button>
            ) : (
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => joinTournamentHandler(tournament.id)}
              >
                Unirse
              </button>
            )}
          </li>
        ))}
    </ul>
  )
}

export default DashboardUser

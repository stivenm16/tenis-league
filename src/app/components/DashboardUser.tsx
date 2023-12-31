import {
  createParticipant,
  deleteParticipants,
  getAllParticipants,
} from '@/app/services/participants.service'
import { getAllTournaments } from '@/app/services/tournaments.service'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'

const DashboardUser = ({ userId }) => {
  const [participants, setParticipants] = useState<any>()
  const [tournaments, setTournaments] = useState<any>()
  const { data: session, status } = useSession()

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

  const handleLeaveTournament = async (tournamentId) => {
    await deleteParticipants({
      tournamentId,
      participantIds: [session?.user.userId],
    })
    const participantsUpdated = participants.filter(
      (participant) => participant.tournamentId !== tournamentId,
    )
    setParticipants(participantsUpdated)
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [tournamentsData, participantsData] = await Promise.all([
          getAllTournaments(),
          getAllParticipants(),
        ])
        setTournaments(tournamentsData)
        setParticipants(participantsData)
      } catch (error) {
        console.error('Error al obtener datos:', error)
      }
    }
    fetchData()
  }, [])

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
                onClick={() => handleLeaveTournament(tournament.id)}
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

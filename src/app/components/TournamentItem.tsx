import { deleteParticipants } from '@/services/participants.service'
import { useState } from 'react'

const TournamentItem = ({ tournament, onEdit, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editedTournamentName, setEditedTournamentName] = useState(
    tournament.name,
  )

  const handleEditTournament = async () => {
    try {
      await onEdit(tournament.id, editedTournamentName)
    } catch (error) {
      console.log('Hubo un error al editar el torneo')
    }
    setIsEditing(false)
  }

  const handleDeleteParticipants = async () => {
    const idsTest = [8, 4]
    const tournamentIdTest = 1
    await deleteParticipants({
      tournamentId: tournamentIdTest,
      participantIds: idsTest,
    })
    // const updatedTournaments = tournaments.filter(
    //   (tournament) => tournament.id !== id,
    // )
    // setTournaments(updatedTournaments)
  }
  return (
    <li className="bg-white text-black rounded-md p-4 my-4 flex justify-between items-center shadow-md">
      {isEditing ? (
        <div>
          <input
            type="text"
            value={editedTournamentName}
            onChange={(e) => setEditedTournamentName(e.target.value)}
            className="border rounded-md px-2 py-1 mr-2"
          />
          <button
            onClick={handleEditTournament}
            className="bg-green-500 text-white px-4 py-2 rounded-md"
          >
            Guardar
          </button>
        </div>
      ) : (
        <>
          <span>{tournament.name}</span>
          <div className="flex">
            <button
              onClick={() => setIsEditing(true)}
              className="bg-blue-500 text-white px-3 py-1 rounded-md mr-2"
            >
              Editar
            </button>
            <button
              onClick={() => onDelete(tournament.id)}
              className="bg-red-500 text-white px-3 py-1 rounded-md"
            >
              Eliminar
            </button>
            <button
              onClick={() => handleDeleteParticipants()}
              className="bg-red-500 text-white px-3 py-1 rounded-md"
            >
              Eliminar Participant prueba
            </button>
          </div>
        </>
      )}
    </li>
  )
}

export default TournamentItem

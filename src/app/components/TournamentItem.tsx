import { useState } from 'react'

const TournamentItem = ({
  tournament,
  onEdit,
  onDelete,
  handleParticipants,
  participants,
}) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editedTournamentName, setEditedTournamentName] = useState(
    tournament.name,
  )
  const [showModal, setShowModal] = useState(false)
  const [selectedParticipants, setSelectedParticipants] = useState([])

  const handleEditTournament = async () => {
    try {
      await onEdit(tournament.id, editedTournamentName)
    } catch (error) {
      console.log('Hubo un error al editar el torneo')
    }
    setIsEditing(false)
  }

  const toggleModal = () => {
    setShowModal(!showModal)
    setSelectedParticipants([])
  }
  const handleCheckboxChange = (userId) => {
    // Actualiza la lista de usuarios seleccionados
    if (selectedParticipants.includes(userId)) {
      setSelectedParticipants((prevSelected) =>
        prevSelected.filter((id) => id !== userId),
      )
    } else {
      setSelectedParticipants((prevSelected) => [...prevSelected, userId])
    }
  }
  const handleDeleteParticipants = async () => {
    if (selectedParticipants.length > 0) {
      handleParticipants(selectedParticipants, tournament.id)
      // Cierra el modal después de eliminar participantes
      setShowModal(false)
    }
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
              onClick={toggleModal}
              className="bg-red-500 text-white px-3 py-1 rounded-md"
            >
              Eliminar participantes
            </button>
          </div>
          {showModal && (
            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50">
              <div className="bg-white p-6 rounded-md">
                <h2 className="text-lg font-bold mb-4">
                  Seleccionar participantes a eliminar
                </h2>
                {/* Lista de usuarios con checkboxes */}
                {participants.map((participant) => (
                  <div key={participant.id} className="flex items-center mb-2">
                    <input
                      type="checkbox"
                      id={`participant-${participant.id}`}
                      checked={selectedParticipants.includes(participant.id)}
                      onChange={() => handleCheckboxChange(participant.id)}
                      className="mr-2"
                    />
                    <label
                      htmlFor={`participant-${participant.id}`}
                      className="text-black text-2xl"
                    >
                      {participant.id}
                    </label>
                  </div>
                ))}
                {/* Botón para eliminar */}
                <button
                  onClick={handleDeleteParticipants}
                  className="bg-red-500 text-white px-4 py-2 rounded-md mt-4"
                >
                  Eliminar seleccionados
                </button>
                <button
                  onClick={toggleModal}
                  className="bg-gray-500 text-white px-4 py-2 rounded-md mt-2 ml-2"
                >
                  Cerrar
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </li>
  )
}

export default TournamentItem

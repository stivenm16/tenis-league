export const createParticipant = async ({ userId, tournamentId }) => {
  const response = await fetch('/api/participant', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      userId,
      tournamentId, // Ajusta la fecha según tus necesidades
    }),
  })

  if (response.ok) {
    const participant = await response.json()
    console.log('Participante creado:', participant)
    return participant
  } else {
    console.error('Error al crear el torneo')
  }
}

export const getAllParticipants = async () => {
  try {
    const response = await fetch('/api/participant', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}

export const deleteParticipants = async (data) => {
  try {
    const res = await fetch('/api/participant', {
      method: 'DELETE',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    return res
  } catch (error) {
    console.log(error)
  }
}

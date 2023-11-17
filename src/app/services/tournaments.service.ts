import { dateNow } from '@/app/utils/funcs'

export const createTournament = async (name) => {
  const response = await fetch('/api/tournaments', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name,
      date: dateNow(),
    }),
  })

  if (response.ok) {
    const tournament = await response.json()
    console.log('Torneo creado:', tournament)
    return tournament
  } else {
    console.error('Error al crear el torneo')
  }
}

export const getAllTournaments = async () => {
  try {
    const response = await fetch('/api/tournaments', {
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

export const updateTournament = async (data) => {
  try {
    const res = await fetch('/api/tournaments', {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    return res
  } catch (error) {
    console.log(error)
    throw new error()
  }
}

export const deleteTournament = async (data) => {
  try {
    const res = await fetch('/api/tournaments', {
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

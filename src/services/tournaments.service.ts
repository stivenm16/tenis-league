export const createTournament = async () => {
  const response = await fetch('/api/tournaments', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: 'Torneo1',
      date: '2023-11-10T12:00:00Z', // Ajusta la fecha según tus necesidades
    }),
  })

  if (response.ok) {
    const tournament = await response.json()
    console.log('Torneo creado:', tournament)
  } else {
    console.error('Error al crear el torneo')
  }
}

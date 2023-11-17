import { dateNow } from '@/app/utils/funcs'
import {
  createTournament,
  deleteTournament,
  getAllTournaments,
  updateTournament,
} from '../../../src/app/services/tournaments.service'

const mockFetch = jest.fn()

;(global as any).fetch = mockFetch

describe('Test para createTournament', () => {
  test('Debe crear un torneo correctamente', async () => {
    const mockName = 'Torneo de prueba'
    const mockDate = dateNow()

    const originalDateNow = Date.now
    Date.now = jest.fn(() => new Date(mockDate).getTime())
    const mockResponse = {
      ok: true,
      json: () =>
        Promise.resolve({
          id: 1,
          name: mockName,
          date: mockDate,
        }),
    }

    mockFetch.mockResolvedValue(mockResponse)

    const tournament = await createTournament(mockName)

    expect(tournament).toEqual({ id: 1, name: mockName, date: mockDate })
    expect(mockFetch).toHaveBeenCalledWith('/api/tournaments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: mockName,
        date: mockDate,
      }),
    })
    Date.now = originalDateNow
  })
})

describe('Test para getAllTournaments', () => {
  test('Debe obtener todos los torneos correctamente', async () => {
    const mockResponse = {
      ok: true,
      json: () =>
        Promise.resolve([
          { id: 1, name: 'Torneo 1' },
          { id: 2, name: 'Torneo 2' },
        ]),
    }

    mockFetch.mockResolvedValue(mockResponse)

    const tournaments = await getAllTournaments()

    expect(tournaments).toEqual([
      { id: 1, name: 'Torneo 1' },
      { id: 2, name: 'Torneo 2' },
    ])
    expect(mockFetch).toHaveBeenCalledWith('/api/tournaments', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
  })
})

describe('Test para updateTournament', () => {
  test('Debe actualizar un torneo correctamente', async () => {
    const mockData = { id: 1, name: 'Torneo actualizado' }
    const mockResponse = {
      ok: true,
    }

    mockFetch.mockResolvedValue(mockResponse)

    const response = await updateTournament(mockData)

    expect(response.ok).toBe(true)
    expect(mockFetch).toHaveBeenCalledWith('/api/tournaments', {
      method: 'PUT',
      body: JSON.stringify(mockData),
      headers: {
        'Content-Type': 'application/json',
      },
    })
  })
})

describe('Test para deleteTournament', () => {
  test('Debe eliminar un torneo correctamente', async () => {
    const mockData = { id: 1 }
    const mockResponse = {
      ok: true,
    }

    mockFetch.mockResolvedValue(mockResponse)

    const response = await deleteTournament(mockData)

    expect(response.ok).toBe(true)
    expect(mockFetch).toHaveBeenCalledWith('/api/tournaments', {
      method: 'DELETE',
      body: JSON.stringify(mockData),
      headers: {
        'Content-Type': 'application/json',
      },
    })
  })
})

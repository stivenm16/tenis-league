import '@testing-library/jest-dom'
import {
  createParticipant,
  deleteParticipants,
} from '../../../src/app/services/participants.service'

declare global {
  namespace NodeJS {
    interface Global {
      fetch: any
    }
  }
}

describe('Test para createParticipant', () => {
  test('Debe crear un participante correctamente', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: () =>
        Promise.resolve({
          id: 1,
          userId: 1,
          tournamentId: 'tournamentId',
        }),
    })

    const participant = await createParticipant({
      userId: 1,
      tournamentId: 'tournamentId',
    })

    expect(participant).toEqual({
      id: 1,
      userId: 1,
      tournamentId: 'tournamentId',
    })
    expect(fetch).toHaveBeenCalledWith('/api/participant', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: 1,
        tournamentId: 'tournamentId',
      }),
    })
  })
})

describe('Test para deleteParticipants', () => {
  test('Debe eliminar participantes correctamente', async () => {
    const data = {
      id: 1,
    }

    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue({ success: true }),
    }
    global.fetch = jest.fn().mockResolvedValue(mockResponse)

    const response = await deleteParticipants(data)

    expect(response.ok).toBe(true)
    expect(await mockResponse.json()).toEqual({ success: true })
    expect(fetch).toHaveBeenCalledWith('/api/participant', {
      method: 'DELETE',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    })
  })
})

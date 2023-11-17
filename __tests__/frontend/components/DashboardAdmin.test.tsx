import * as tournamentsService from '@/app/services/tournaments.service'
import * as usersService from '@/app/services/users.service'
import { render, screen, waitFor } from '@testing-library/react'
import DashboardAdmin from '../../../src/app/components/DashboardAdmin'
import * as participantsService from '../../../src/app/services/participants.service'

interface User {
  id: number
  userName: string
}

interface Tournament {
  id: number
  name: string
}

interface Participant {
  tournamentId: number
  userId: number
}
jest.mock('../../../src/app/services/participants.service', () => ({
  getAllParticipants: jest.fn(() =>
    Promise.resolve<Participant[]>([{ tournamentId: 1, userId: 1 }]),
  ),
  deleteParticipants: jest.fn((id: number) => Promise.resolve<void>(null)),
}))

jest.mock('../../../src/app/services/tournaments.service', () => ({
  getAllTournaments: jest.fn(() =>
    Promise.resolve<Tournament[]>([{ id: 1, name: 'Tournament 1' }]),
  ),
  createTournament: jest.fn((name: string) =>
    Promise.resolve<Tournament>({
      id: 2,
      name,
    }),
  ),
  deleteTournament: jest.fn((id: number) => Promise.resolve<void>(null)),
}))

jest.mock('../../../src/app/services/users.service', () => ({
  getAllUsers: jest.fn(() =>
    Promise.resolve<User[]>([
      { id: 1, userName: 'User1' },
      { id: 2, userName: 'User2' },
    ]),
  ),
  deleteUser: jest.fn((id: number) => Promise.resolve<void>(null)),
}))

describe('DashboardAdmin Component', () => {
  beforeEach(() => {
    ;(usersService.getAllUsers as jest.Mock).mockResolvedValue([
      { id: 1, userName: 'User1' },
      { id: 2, userName: 'User2' },
    ])
    ;(tournamentsService.getAllTournaments as jest.Mock).mockResolvedValue([
      { id: 1, name: 'Tournament 1' },
    ])
    ;(participantsService.getAllParticipants as jest.Mock).mockResolvedValue([
      { tournamentId: 1, userId: 1 },
    ])
  })

  it('renders usuarios y torneos correctamente', async () => {
    render(<DashboardAdmin />)

    await waitFor(() => {
      expect(screen.getByText('Usuarios')).toBeInTheDocument()
      expect(screen.getByText('User1')).toBeInTheDocument()
      expect(screen.getByText('Torneos actuales')).toBeInTheDocument()
      expect(screen.getByText('Tournament 1')).toBeInTheDocument()
    })
  })
})

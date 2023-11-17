import { act, fireEvent, render } from '@testing-library/react'
import TournamentItem from '../../../src/app/components/TournamentItem'

describe('TournamentItem Component', () => {
  const tournament = {
    id: 1,
    name: 'Tournament Test',
  }
  const participants = [
    { id: 1, userName: 'User 1' },
    { id: 2, userName: 'User 2' },
    { id: 3, userName: 'User 3' },
  ]
  const onEdit = jest.fn()
  const onDelete = jest.fn()
  const handleParticipants = jest.fn()

  test('Renderiza correctamente en modo de visualización', () => {
    const { getByText, queryByRole } = render(
      <TournamentItem
        tournament={tournament}
        onEdit={onEdit}
        onDelete={onDelete}
        handleParticipants={handleParticipants}
        participants={participants}
      />,
    )

    const tournamentNameElement = getByText('Tournament Test')
    expect(tournamentNameElement).toBeInTheDocument()

    const editButton = getByText('Editar')
    const deleteButton = getByText('Eliminar')
    const deleteParticipantsButton = getByText('Eliminar participantes')
    expect(editButton).toBeInTheDocument()
    expect(deleteButton).toBeInTheDocument()
    expect(deleteParticipantsButton).toBeInTheDocument()

    const inputElement = queryByRole('textbox')
    expect(inputElement).not.toBeInTheDocument()
  })

  test('Permite editar el nombre del torneo', () => {
    const { getByText, getByRole } = render(
      <TournamentItem
        tournament={tournament}
        onEdit={onEdit}
        onDelete={onDelete}
        handleParticipants={handleParticipants}
        participants={participants}
      />,
    )

    const editButton = getByText('Editar')

    act(() => {
      fireEvent.click(editButton)
    })

    const inputElement = getByRole('textbox')
    expect(inputElement).toBeInTheDocument()

    act(() => {
      fireEvent.change(inputElement, {
        target: { value: 'Updated Tournament Name' },
      })
    })

    const saveButton = getByText('Guardar')

    act(() => {
      fireEvent.click(saveButton)
    })

    expect(onEdit).toHaveBeenCalledWith(1, 'Updated Tournament Name')
  })

  test('Permite eliminar el torneo', () => {
    const { getByText } = render(
      <TournamentItem
        tournament={tournament}
        onEdit={onEdit}
        onDelete={onDelete}
        handleParticipants={handleParticipants}
        participants={participants}
      />,
    )

    const deleteButton = getByText('Eliminar')

    act(() => {
      fireEvent.click(deleteButton)
    })

    expect(onDelete).toHaveBeenCalledWith(1)
  })
})

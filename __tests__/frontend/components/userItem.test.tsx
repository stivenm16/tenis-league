import { fireEvent, render } from '@testing-library/react'
import UserItem from '../../../src/app/components/UserItem'

describe('UserItem Component', () => {
  const user = { id: 1, userName: 'JohnDoe' }
  const onDelete = jest.fn()
  const onEdit = jest.fn()

  test('Renderiza correctamente en modo visualización', () => {
    const { getByText, queryByRole } = render(
      <UserItem user={user} onDelete={onDelete} onEdit={onEdit} />,
    )

    const userNameElement = getByText('JohnDoe')
    expect(userNameElement).toBeInTheDocument()

    const editButton = getByText('Editar')
    const deleteButton = getByText('Eliminar')
    expect(editButton).toBeInTheDocument()
    expect(deleteButton).toBeInTheDocument()

    const inputElement = queryByRole('textbox')
    expect(inputElement).not.toBeInTheDocument()
  })

  test('Permite editar el nombre de usuario', () => {
    const { getByText, getByRole } = render(
      <UserItem user={user} onDelete={onDelete} onEdit={onEdit} />,
    )

    const editButton = getByText('Editar')
    fireEvent.click(editButton)

    const inputElement = getByRole('textbox')
    expect(inputElement).toBeInTheDocument()

    fireEvent.change(inputElement, { target: { value: 'UpdatedName' } })

    const saveButton = getByText('Guardar')
    fireEvent.click(saveButton)

    expect(onEdit).toHaveBeenCalledWith(1, 'UpdatedName')
  })

  test('Permite eliminar un usuario', () => {
    const { getByText } = render(
      <UserItem user={user} onDelete={onDelete} onEdit={onEdit} />,
    )

    const deleteButton = getByText('Eliminar')
    fireEvent.click(deleteButton)

    expect(onDelete).toHaveBeenCalledWith(1)
  })
})

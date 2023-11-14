import { getAllUsers } from '@/services/users.service'
import { useEffect, useState } from 'react'
import UserItem from './UserItem'

const DashboardAdmin = () => {
  const editUser = async (userId, newUserName) => {
    console.log(`Editando usuario ${userId} con nuevo nombre: ${newUserName}`)
  }
  const deleteUser = async () => {
    const res = await deleteUser()
    const updatedUsers = users.filter((user) => user.id !== 1)
    setUsers(updatedUsers)
  }
  const [users, setUsers] = useState<any>()

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllUsers()
      setUsers(data)
    }

    fetchData()
  }, [])

  return (
    <ul className="list-disc list-inside">
      {users &&
        users.map((user) => (
          <UserItem
            key={user.id}
            user={user}
            onDelete={deleteUser}
            onEdit={editUser}
          />
        ))}
    </ul>
  )
}

export default DashboardAdmin

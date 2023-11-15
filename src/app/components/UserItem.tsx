import { useState } from 'react'

const UserItem = ({ user, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editedUserName, setEditedUserName] = useState(user.userName)

  const handleEdit = () => {
    onEdit(user.id, editedUserName)
    setIsEditing(false)
  }

  return (
    <li className="bg-white text-black rounded-md p-4 my-4 flex justify-between items-center shadow-md">
      <div>
        {isEditing ? (
          <div>
            <input
              type="text"
              value={editedUserName}
              onChange={(e) => setEditedUserName(e.target.value)}
              className="border rounded-md px-2 py-1 mr-2"
            />
            <button
              onClick={handleEdit}
              className="bg-green-500 text-white px-4 py-2 rounded-md"
            >
              Guardar
            </button>
          </div>
        ) : (
          <div className=" flex items-center justify-between w-[480px]">
            <span className="text-lg overflow-hidden overflow-ellipsis max-w-[200px]">
              {user.userName}
            </span>
            <div className="flex ">
              <button
                onClick={() => setIsEditing(true)}
                className="bg-blue-500 text-white px-3  py-1 rounded-md mr-3"
              >
                Editar
              </button>
              <button
                onClick={() => onDelete(user.id)}
                className="bg-red-500 text-white px-3 py-1 rounded-md"
              >
                Eliminar
              </button>
            </div>
          </div>
        )}
      </div>
    </li>
  )
}

export default UserItem

export const getAllUsers = async () => {
  try {
    const response = await fetch('/api/some', {
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

export const deleteUser = async (data) => {
  try {
    const res = await fetch('/api/some', {
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
export const updateUser = async (data) => {
  try {
    const res = await fetch('/api/some', {
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

export const fetchUsers = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  if (!response.ok) {
    throw new Error('Failed to fetch users');
  }
  return response.json();
};

export const addUser = async (user: { name: string; email: string }) => {
  const response = await fetch('https://jsonplaceholder.typicode.com/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });
  if (!response.ok) {
    throw new Error('Failed to add user');
  }
  return response.json();
}

export const fetchUserDetails = async (id: string) => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch user details');
  }
  return response.json();
};

export const deleteUser = async (id: string) => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete user');
  }
  return response.json();
}
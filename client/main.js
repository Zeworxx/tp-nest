document.addEventListener('DOMContentLoaded', () => {
  const userForm = document.getElementById('userForm');
  const usersList = document.getElementById('users');

  userForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(userForm);
    const userData = {
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      email: formData.get('email'),
    };

    try {
      const response = await fetch('http://localhost:3000/api/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      const newUser = await response.json();
      addUserToList(newUser);
      userForm.reset();
    } catch (error) {
      console.error('Error adding user:', error);
    }
  });

  async function fetchUsers() {
    try {
      const response = await fetch('http://localhost:3000/api/user');
      const users = await response.json();
      if (users) {
        users.forEach((user) => addUserToList(user));
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  }

  function addUserToList(user) {
    const listItem = document.createElement('li');
    listItem.textContent = `firstName : ${user.firstName}/ lastName : ${user.lastName} / email : ${user.email}`;
    usersList.appendChild(listItem);
  }

  fetchUsers();
});

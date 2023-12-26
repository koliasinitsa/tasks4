import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';


import '../app.css';

function UsersTable() {
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [username, setUsername] = useState('');
  const user = useSelector(state => state.user);
  // Здесь 'state' - это ваш глобальный стейт, и 'user' - это свойство, 
  //которое вы хотите извлечь
  console.log(user);

  useEffect(() => {
    // Загрузка пользователей при монтировании компонента
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const response = await axios.get('http://localhost:3001/api/users');
    setUsers(response.data);

  };

  const handleLogout = () => {
    //localStorage.removeItem('authToken');
    //setUsername("");
    window.location.href = '/login';
  };

  const handleCheckboxChange = (userId) => {
    setSelectedUsers((prevSelected) => {
      if (prevSelected.includes(userId)) {
        return prevSelected.filter((id) => id !== userId);
      } else {
        return [...prevSelected, userId];
      }
    });
  };

  const deleteSelectedUsers = async () => {
    for (const userId of selectedUsers) {
      await axios.delete(`http://localhost:3001/api/delete/${userId}`);
    }
    fetchUsers();
  };

  const blockSelectedUsers = async () => {
    for (const userId of selectedUsers) {
      await axios.put(`http://localhost:3001/api/block/${userId}`);
    }
    fetchUsers();
  };

  const unblockSelectedUsers = async () => {
    for (const userId of selectedUsers) {
      await axios.put(`http://localhost:3001/api/unblock/${userId}`);
    }
    fetchUsers();
  };

  const handleAction = (actionType) => {
    switch (actionType) {
      case 'delete':
        deleteSelectedUsers();
        break;
      case 'block':
        blockSelectedUsers();
        break;
      case 'unblock':
        unblockSelectedUsers();
        break;
      default:
        break;
    }
    setSelectedUsers([]); // Очистка выбранных пользователей после выполнения действий
  };

  const handleAllCheckboxChange = (event) => {
    if (event.target.checked) {
      // Выделить все чекбоксы
      setSelectedUsers(users.map((user) => user.id));
    } else {
      // Снять выделение со всех чекбоксов
      setSelectedUsers([]);
    }
  };

  return (
    <div className="container mt-3">
      <header className="header">
        <div className="user-info">
          Hello, {user.name}
        </div>
        <button onClick={handleLogout} className="logout-button">Logout</button>
      </header>
      <div className="btn-group mb-3 spaced-buttons" role="group">
        <div className="mr-20 pr-20">
          <button type="button" className="btn btn-danger" onClick={() => handleAction('block')}>
            <i className="bi bi-x-circle"></i> Block
          </button>
        </div>
        <div className="mr-20">
          <button type="button" className="btn btn-success" onClick={() => handleAction('unblock')}>
            <i className="bi bi-check-circle"></i> Unblock
          </button>
        </div>
        <div>
          <button type="button" className="btn btn-warning" onClick={() => handleAction('delete')}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
              <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
              <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
            </svg>
          </button>
        </div>

      </div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">
              <input type="checkbox" onChange={handleAllCheckboxChange} />
            </th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Last Login</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} id={`user-${user.id}`}>
              <td style={selectedUsers.includes(user.id) ? { backgroundColor: '#e6f7ff' } : {}}>
                <div className="custom-checkbox">
                  <input
                    type="checkbox"
                    checked={selectedUsers.includes(user.id)}
                    onChange={() => handleCheckboxChange(user.id)}
                  />
                  <label></label>
                </div>
              </td>
              <td style={selectedUsers.includes(user.id) ? { backgroundColor: '#e6f7ff' } : {}}>{user.name}</td>
              <td style={selectedUsers.includes(user.id) ? { backgroundColor: '#e6f7ff' } : {}}>{user.email}</td>
              <td style={selectedUsers.includes(user.id) ? { backgroundColor: '#e6f7ff' } : {}}>{user.registration_date}</td>
              <td style={selectedUsers.includes(user.id) ? { backgroundColor: '#e6f7ff' } : {}}>{user.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UsersTable;




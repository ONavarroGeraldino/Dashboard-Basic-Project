import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { User, Mail, Trash2, Edit, Save, X } from 'lucide-react';
import './UsersManager.css';

const UsersManager = () => {
  const { users, setUsers } = useAuth();
  const { addToast } = useToast();
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({ name: '', email: '' });

  // --- DELETE (Eliminar) ---
  const handleDelete = (id) => {
    const updatedUsers = users.filter(u => u.id !== id);
    setUsers(updatedUsers);
    localStorage.setItem('all_users', JSON.stringify(updatedUsers));
    addToast("Usuario eliminado correctamente", "success");
  };

  // --- UPDATE (Editar) ---
  const startEdit = (user) => {
    setEditingId(user.id);
    setEditData({ name: user.name, email: user.email });
  };

  const saveEdit = (id) => {
    const updatedUsers = users.map(u => u.id === id ? { ...u, ...editData } : u);
    setUsers(updatedUsers);
    localStorage.setItem('all_users', JSON.stringify(updatedUsers));
    setEditingId(null);
    addToast("Usuario actualizado", "success");
  };

  return (
    <div className="users-manager animate-in">
      <header className="page-header">
        <h2>Gestión de Usuarios</h2>
        <p>Administra los accesos y perfiles del sistema</p>
      </header>

      <div className="table-container">
        <table className="custom-table">
          <thead>
            <tr>
              <th>Usuario</th>
              <th>Email</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map(u => (
                <tr key={u.id}>
                  <td>
                    {editingId === u.id ? (
                      <input 
                        className="edit-input"
                        value={editData.name}
                        onChange={(e) => setEditData({...editData, name: e.target.value})}
                      />
                    ) : (
                      <div className="user-info">
                        <div className="avatar-mini">{u.name.charAt(0)}</div>
                        <span>{u.name}</span>
                      </div>
                    )}
                  </td>
                  <td>
                    {editingId === u.id ? (
                      <input 
                        className="edit-input"
                        value={editData.email}
                        onChange={(e) => setEditData({...editData, email: e.target.value})}
                      />
                    ) : (
                      u.email
                    )}
                  </td>
                  <td>
                    <div className="actions-btns">
                      {editingId === u.id ? (
                        <>
                          <button onClick={() => saveEdit(u.id)} className="btn-save"><Save size={18}/></button>
                          <button onClick={() => setEditingId(null)} className="btn-cancel"><X size={18}/></button>
                        </>
                      ) : (
                        <>
                          <button onClick={() => startEdit(u)} className="btn-edit"><Edit size={18}/></button>
                          <button onClick={() => handleDelete(u.id)} className="btn-delete"><Trash2 size={18}/></button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="3" className="empty-msg">No hay usuarios registrados</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersManager;
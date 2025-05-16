import React, { useState } from "react";
import "./App.css";
const App = () => {
  const [users, setUsers] = useState([
    { id: 1, name: "Ali", age: 12, complete: true },
    { id: 2, name: "Muhammad", age: 14, complete: false },
  ]);

  const [form, setForm] = useState({ name: "", age: "", complete: false });
  const [editingUserId, setEditingUserId] = useState(null);
  const [searchName, setSearchName] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  function handleCheck(user) {
    const updatedUsers = users.map((el) =>
      el.id === user.id ? { ...el, complete: !el.complete } : el
    );
    setUsers(updatedUsers);
  }

  const handleAdd = () => {
    if (form.name.trim() === "" || form.age.trim() === "") return;
    const newUser = {
      id: Date.now(),
      name: form.name,
      age: Number(form.age),
      complete: form.complete,
    };
    setUsers((prev) => [...prev, newUser]);
    setForm({ name: "", age: "", complete: false });
  };

  const handleEdit = (user) => {
    setForm({
      name: user.name,
      age: user.age.toString(),
      complete: user.complete,
    });
    setEditingUserId(user.id);
  };

  const handleSave = () => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === editingUserId
          ? {
              ...user,
              name: form.name,
              age: Number(form.age),
              complete: form.complete,
            }
          : user
      )
    );
    setForm({ name: "", age: "", complete: false });
    setEditingUserId(null);
  };

  const handleDelete = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  return (
    <div className="todo-div">
     <div className="input-todo">
       <input
        type="text"
        value={searchName}
        onChange={(e) => setSearchName(e.target.value)}
        placeholder="search by name"
      />

      <input
        type="text"
        name="name"
        value={form.name}
        onChange={handleChange}
      />
      <input
        type="number"
        name="age"
        value={form.age}
        onChange={handleChange}
      />
      <label>
        <input
          type="checkbox"
          name="complete"
          checked={form.complete}
          onChange={handleChange}
        />
      </label>
      <br />
      {editingUserId ? (
        <button onClick={handleSave} className="save">save</button>
      ) : (
        <button onClick={handleAdd} className="add-todo">add</button>
      )}

     </div>
      {users
        .filter((user) =>
          user.name.toLowerCase().includes(searchName.toLowerCase())
        )
        .map((user) => (
          <div key={user.id} className="div-todo">
            <p> {user.name}</p>
            <p> {user.age}</p>
            <p> {user.complete ? "true" : "false"}</p>
            <div className="buttons-todo">
              <button onClick={() => handleEdit(user)}>edit</button>
              <button onClick={() => handleDelete(user.id)}>delete</button>
              <button
                onClick={() => {
                  handleCheck(user);
                }}
              >
                checked
              </button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default App;

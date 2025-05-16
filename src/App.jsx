import React, { useState } from "react";
import "./App.css";
import { Button, Checkbox } from "@mui/material";
import { Input } from "antd";
import { AudioOutlined } from "@ant-design/icons";
import { DeleteOutlined,EditOutlined,UserAddOutlined,SaveOutlined ,CheckCircleOutlined} from '@ant-design/icons';
const { Search } = Input;

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

  const handleCheck = (user) => {
    const updatedUsers = users.map((el) =>
      el.id === user.id ? { ...el, complete: !el.complete } : el
    );
    setUsers(updatedUsers);
  };

  const handleAdd = () => {
    if (form.name.trim() === "" || form.age.trim() === "" || isNaN(form.age)) return;
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

  const suffix = (
    <AudioOutlined
      style={{
        fontSize: 16,
        color: "#1677ff",
      }}
    />
  );

  const onSearch = (value) => {
    setSearchName(value);
  };

  return (
    <div className="todo-div">
      <div className="input-todo">
        <Search
          placeholder="Search by name"
          onSearch={onSearch}
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          enterButton
          suffix={suffix}
        />

        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
        />
        <input
          type="number"
          name="age"
          placeholder="Age"
          value={form.age}
          onChange={handleChange}
        />
        <label>
          <Checkbox
            name="complete"
            checked={form.complete}
            onChange={handleChange}
          />
        </label>
        <br />
        {editingUserId ? (
          <Button variant="contained" color="success" onClick={handleSave}>
            <SaveOutlined />
          </Button>
        ) : (
          <Button variant="contained" color="success" onClick={handleAdd}>
            <UserAddOutlined />
          </Button>
        )}
      </div>

      {users
        .filter((user) =>
          user.name.toLowerCase().includes(searchName.toLowerCase())
        )
        .map((user) => (
          <div key={user.id} className="div-todo">
            <p>{user.name}</p>
            <p>{user.age}</p>
            <p>{user.complete ? "true" : "false"}</p>
            <div className="buttons-todo">
              <Button variant="contained" onClick={() => handleEdit(user)}>
                <EditOutlined />
              </Button>
              <Button variant="contained" onClick={() => handleDelete(user.id)}>
                <DeleteOutlined />
              </Button>
              <Button variant="contained" onClick={() => handleCheck(user)}>
                <CheckCircleOutlined />
              </Button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default App;

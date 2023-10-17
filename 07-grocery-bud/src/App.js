import React, { useState, useEffect } from "react";
import List from "./List";
import Alert from "./Alert";

const getLocalStorage = () => {
  let list = localStorage.getItem("list");
  if (list) {
    return (list = JSON.parse(localStorage.getItem("list")));
  } else {
    return [];
  }
};

function App() {
  const [name, setName] = useState("");
  const [list, setList] = useState(getLocalStorage());
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [alert, setAlert] = useState({ show: false, msg: "", type: "" });

  const showAlert = (show = false, type = "", msg = "") => {
    setAlert({ show, type, msg });
  };

  const clearList = () => {
    setList([]);
    showAlert(true, "danger", "All items have been removed");
  };

  const removeItem = (id) => {
    const newList = list.filter((item) => item.id !== id);
    setList(newList);
    showAlert(true, "danger", "The items has been removed");
  };

  const editItem = (id) => {
    const edited = list.find((item) => item.id === id);
    setName(edited.title);
    setIsEditing(true);
    setEditingId(id);
  };

  function handleSubmit(e) {
    e.preventDefault();

    if (!name) {
      showAlert(true, "danger", "Please enter a value");
    } else if (name && isEditing) {
      setList(
        list.map((item) => {
          if (item.id === editingId) {
            return { ...item, title: name };
          }
          return item;
        })
      );
      setName("");
      setEditingId(null);
      setIsEditing(false);
      showAlert(true, "success", "value changed");
    } else {
      showAlert(true, "success", "Item added to the list");

      const newItem = { id: new Date().getTime().toString(), title: name };
      setList([...list, newItem]);
      setName("");
    }
  }

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);

  return (
    <section className="section-center">
      <form className="grocery-form" onSubmit={handleSubmit}>
        {alert.show && <Alert {...alert} removeAlert={showAlert} list={list} />}

        <h3>grocery bud</h3>
        <div className="form-control">
          <input
            type="text"
            className="grocery"
            placeholder="e.g. eggs"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button type="submit" className="submit-btn">
            {isEditing ? "Editing" : "Submit"}
          </button>
        </div>
      </form>
      {list.length > 0 && (
        <List items={list} removeItem={removeItem} editItem={editItem} />
      )}
      <button className="clear-btn" onClick={clearList}>
        clear items
      </button>
    </section>
  );
}

export default App;

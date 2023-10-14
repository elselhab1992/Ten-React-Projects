import React, { useState } from "react";
import data from "./data";
import List from "./List";
function App() {
  const [people, setPeople] = useState(data);

  function handleRemove(id) {
    const removedPerson = people.filter((person) => person.id !== id);
    setPeople(removedPerson);
  }

  return (
    <main>
      <section className="container">
        <h3>{people.length} birthdays today</h3>
        <List people={people} handleRemove={handleRemove} />
        <button
          style={{
            marginTop: 50,
          }}
          onClick={() => setPeople([])}
        >
          clear all
        </button>
      </section>
    </main>
  );
}

export default App;

import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([
    { id: 1, date: "2021-01-07", time: "07:42", todo: "tech-testing" },
    { id: 2, date: "2021-01-07", time: "07:42", todo: "lang-testing" }
  ]);

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [todo, setTodo] = useState("");

  useEffect(() => {
    let raw = sessionStorage.getItem("todos");
    setTodos(JSON.parse(raw));
  }, []);
  useEffect(() => {
    sessionStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (event) => {
    setTodos([
      ...todos,
      { id: todos[todos.length - 1].id + 1, date: date, time: time, todo: todo }
    ]);
  };
  let output = todos.map((it, index) => {
    let cls = "";
    it.id % 2 === 0 ? (cls = "oddRow") : (cls = "evenRow");

    return (
      <table className="table">
        <td className={cls}>
          <tr>{it.id}</tr>
        </td>
        <td className={cls}>
          <tr>{it.date}</tr>{" "}
        </td>
        <td className={cls}>
          <tr>{it.time}</tr>
        </td>
        <td className={cls}>
          <tr>{it.todo}</tr>
        </td>
      </table>
    );
  });

  return (
    <div className="App">
      <h1>ToDo</h1>

      <div>{output}</div>
      <div>
        <div>
          <div>Set date</div>
          <input
            type="date"
            value="date"
            onInput={(e) => {
              setDate(e.target.value);
              console.log("render from date");
            }}
          />
          <div>Your date: {date}</div>
        </div>
        <div>
          <div>Set time</div>
          <input
            type="time"
            value="time"
            onInput={(e) => {
              setTime(e.target.value);
              console.log("render from time");
            }}
          />
          <div>Your time: {time}</div>
        </div>
        <div>
          <div>Set ToDo</div>
          <input
            type="text"
            value={todo}
            onInput={(e) => {
              setTodo(e.target.value);
              console.log("render from todo");
            }}
          />
          <div>Your TODO: {todo}</div>
        </div>
        <div>
          <button className="addButton" onClick={addTodo}>
            Add todo
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;

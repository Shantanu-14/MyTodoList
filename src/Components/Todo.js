import React, { useState, useEffect } from "react";
import "./Todo.css";

const getLocalData = () => {
  const list = localStorage.getItem("myTodoList");
  if (list) {
    return JSON.parse(list);
  } else {
    return [];
  }
};

const Todo = () => {
  const [inputData, setInputData] = useState("");
  const [items, setItems] = useState(getLocalData());
  const [editItem, setEditItem] = useState("");
  const [toggleButton, setToggleButton] = useState(false);

  const addItem = () => {
    if (!inputData) {
      alert("Please fill the data");
    } else if (inputData && toggleButton) {
      setItems(
        items.map((task) => {
          if (task.id === editItem) {
            return { ...task, name: inputData };
          }
          return task;
        })
      );
      setInputData([]);
      setEditItem(null);
      setToggleButton(false);
    } else {
      const myNewInputData = {
        id: new Date().getTime().toString(),
        name: inputData,
      };
      setItems([...items, myNewInputData]);
      setInputData("");
    }
  };

  const editTask = (index) => {
    const item_todo_edit = items.find((todo) => {
      return todo.id === index;
    });
    setInputData(item_todo_edit.name);
    setEditItem(index);
    setToggleButton(true);
  };

  const deleteItem = (index) => {
    const updatedItems = items.filter((item) => {
      return item.id !== index;
    });
    setItems(updatedItems);
  };

  const removeAll = () => {
    setItems([]);
  };

  useEffect(() => {
    localStorage.setItem("myTodoList", JSON.stringify(items));
  }, [items]);

  return (
    <>
      <div className="main-div">
        <div className="child-div">
          <figure>
            <img src="./images/notepad.svg" alt="todo-logo" />
            <figcaption>Add Your Task Here</figcaption>
          </figure>
          <div className="addItems">
            <form 
            onSubmit={addItem}
            >
              <input
                type="text"
                placeholder="✍ Add Task"
                className="form-control"
                value={inputData}
                onChange={(e) => setInputData(e.target.value)}
              />
              {toggleButton ? (
                <i className="far fa-edit add-btn" onClick={addItem}></i>
              ) : (
                <i className="fa fa-plus add-btn" onClick={addItem}></i>
              )}
            </form>
          </div>
          <div className="showItems">
            {items.map((task, index) => {
              return (
                <div className="eachItem" key={task.id}>
                  <h3>{task.name}</h3>
                  <div className="todo-btn">
                    <i
                      className="far fa-edit add-btn"
                      onClick={() => editTask(task.id)}
                    ></i>
                    <i
                      className="far fa-trash-alt add-btn"
                      onClick={() => deleteItem(task.id)}
                    ></i>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="showItems">
            <button
              className="btn effect04"
              data-sm-link-text="Remove All"
              onClick={removeAll}
            >
              <span>CHECK LIST</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Todo;

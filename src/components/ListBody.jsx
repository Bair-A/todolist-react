import React, {useEffect, useState} from 'react';
import TodoHeader from "./TodoHeader";
import {Form, Button, Row, Col} from "react-bootstrap";
import TaskCounter from "./TaskCounter";
import classNames from 'classnames/bind';
import CounterRow from "./CounterRow";
import Task from "./Task";

const LOCAL_STORAGE_KEY = 'todoArr';

const setLocalStorage = (value) => localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(value));
const makeCopy = (curr) => JSON.parse(JSON.stringify(curr));

const ListBody = () => {
  const [importantTask, setImportantTask] = useState(false);
  const [taskObj, setTaskObj] = useState(JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || {});
  useEffect(
    () => {
      setLocalStorage(taskObj)
    },
    [taskObj],
  );
  const [text, setText] = useState('');
  const createTask = () => {
    setImportantTask(false);
    if (text.trim() === '') {
      return
    }
    setText('');
    setTaskObj(curr => {
      const idTask = +new Date();
      const newTaskObj = makeCopy(curr);
      const important = importantTask;
      newTaskObj[idTask] = {text, completed: false, id: idTask, important};
      console.log(newTaskObj)
      return newTaskObj
    });
  };
  const handleChange = (e, key) => {
    if (taskObj[key].text === e.target.value || e.target.value.trim() === '') return
    setTaskObj((curr) => {
      const newTaskObj = makeCopy(curr);
      newTaskObj[key].text = e.target.value
      return newTaskObj
    })
  }
  const clearAll = () => {
    setText('');
    setImportantTask(false);
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    setTaskObj({});
  };
  const handleDelete = (id) => {
    setTaskObj(curr => {
      const newObj = makeCopy(curr);
      delete newObj[id];
      return newObj
    });
  }
  const handleToggleCheck = (key) => {
    setTaskObj((curr) => {
      const newTaskObj = makeCopy(curr);
      newTaskObj[key].completed = !(newTaskObj[key].completed);
      return newTaskObj
    })
  }
  const taskArr = Object.values(taskObj);

  return (
    <div className="list-body">
      <div className="container">
        <CounterRow taskArr={taskArr}/>
        <TodoHeader value={text} setText={setText} createTask={createTask} importantTask={importantTask}
                    clearAll={clearAll} setImportantTask={setImportantTask}/>
        <div>
          {taskArr.map(item => <Task item={item} handleChange={handleChange} handleDelete={handleDelete} handleToggleCheck={handleToggleCheck}/>
          )}
        </div>
      </div>
    </div>
  );
};

export default ListBody;
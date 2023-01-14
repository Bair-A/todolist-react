import React, {useEffect, useState} from 'react';
import TodoHeader from "./TodoHeader";
import DeleteTaskBtn from "./DeleteTaskBtn";
import {Form} from "react-bootstrap";

const LOCAL_STORAGE_KEY = 'todoArr';

const setLocalStorage = (value) => localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(value));
const makeCopy = (curr) => JSON.parse(JSON.stringify(curr));

const ListBody = () => {
    const [taskObj, setTaskObj] = useState(JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || {});
    useEffect(
        () => {
            setLocalStorage(taskObj)
        },
        [taskObj],
    );
    const [text, setText] = useState('');
    const createTask = () => {
            if (text.trim() === '') return
            setText('');
            setTaskObj(curr => {
                const idTask = +new Date();
                const newTaskObj = makeCopy(curr);
                newTaskObj[idTask] = {text, completed: false, id: idTask};
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

    return (
        <div className="list-body">
            <div className="container">
                <TodoHeader value={text} setText={setText} createTask={createTask} clearAll={clearAll}/>
                <ul>
                    {Object.values(taskObj).map(item =>
                        <li key={item.id}>
                            <Form.Check type="checkbox" defaultChecked={item.completed} onClick={() => handleToggleCheck(item.id)}/>
                            <input onBlur={(e) => handleChange(e, item.id)} defaultValue={item.text}/>
                            <DeleteTaskBtn onClick={() => handleDelete(item.id)}/>
                        </li>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default ListBody;
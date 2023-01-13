import React, {useState} from 'react';
import TodoHeader from "./TodoHeader";
import DeleteTaskBtn from "./DeleteTaskBtn";

const LOCAL_STORAGE_KEY = 'todoArr';

const setLocalStorage = (value) => localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(value));
const makeCopy = (curr) => JSON.parse(JSON.stringify(curr));

const ListBody = () => {
    const [text, setText] = useState('');
    const [taskObj, setTaskObj] = useState(JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || {});
    const createTask = () => {
            if (text.trim() === '') return taskObj
            setTaskObj(curr => {
                const idTask = +new Date();
                const newTaskObj = makeCopy(curr);
                newTaskObj[idTask] = {text, completed: false, id: idTask};
                setLocalStorage(newTaskObj);
                return newTaskObj
            });
        };
    const handleChange = (e, key) => {
        if (taskObj[key].text === e.target.value || e.target.value.trim() === '') return
        taskObj[key].text = e.target.value;
        setLocalStorage(taskObj)
    }
    const clearAll = () => {
        localStorage.removeItem(LOCAL_STORAGE_KEY);
        setTaskObj({});
    };
    const handleDelete = (id) => {
        setTaskObj(curr => {
            const newObj = makeCopy(curr);
            delete newObj[id];
            setLocalStorage(newObj);
            return newObj
        });
    }
    const handleToggleCheck = (key) => {
        setTaskObj((curr) => {
            const newTaskObj = makeCopy(curr);
            newTaskObj[key].completed = !(newTaskObj[key].completed);
            setLocalStorage(newTaskObj);
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
                            <input type="checkbox" defaultChecked={item.completed} onClick={() => handleToggleCheck(item.id)}/>
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
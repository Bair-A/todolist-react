import React, {useState} from 'react';
import TodoHeader from "./TodoHeader";
import DeleteTaskBtn from "./DeleteTaskBtn";

const LOCAL_STORAGE_KEY = 'todoArr';

const ListBody = () => {
    const [text, setText] = useState('');
    const [taskObj, setTaskObj] = useState(JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || {});
    const setLocalStorage = (value) => localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(value));
    const createTask = () => {
            if (text.trim() === '') return taskObj
            setTaskObj(curr => {
                const idTask = +new Date();
                const newTaskObj = {...curr, [idTask]: {text, completed: false, id: idTask}};
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
        setTaskObj([]);
    };
    const handleDelete = (id) => {
        setTaskObj(curr => {
            const newObj = {...curr};
            delete newObj[id];
            setLocalStorage(newObj);
            return newObj
        });
    }

    return (
        <div className="list-body">
            <div className="container">
                <TodoHeader value={text} setText={setText} createTask={createTask} clearAll={clearAll}/>
                <ul>
                    {Object.values(taskObj).map(item =>
                        <li key={item.id}>
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
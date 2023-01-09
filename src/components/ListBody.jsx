import React, {useState} from 'react';
import TodoHeader from "./TodoHeader";

const LOCAL_STORAGE_KEY = 'todoArr';

const ListBody = () => {
    const [text, setText] = useState('');
    const [taskArr, setTaskArr] = useState(JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || []);
    const setLocalStorage = (value) => localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(value));
    const createTask = () => {
            setTaskArr(curr => {
                const newTaskArr = [...curr, {text, completed: false, id: +new Date()}];
                setLocalStorage(newTaskArr);
                return newTaskArr
            });

        };
    const clearAll = () => {
        localStorage.removeItem(LOCAL_STORAGE_KEY);
        setTaskArr([]);
    };

    return (
        <div className="list-body">
            <div className="container">
                <TodoHeader setText={setText} createTask={createTask} clearAll={clearAll}/>
                <ul>
                    {taskArr.map(item =>
                        <li key={item.id}>
                            {item.text}
                        </li>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default ListBody;
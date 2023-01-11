import React, {useState} from 'react';
import TodoHeader from "./TodoHeader";
import DeleteTaskBtn from "./DeleteTaskBtn";

const LOCAL_STORAGE_KEY = 'todoArr';

const ListBody = () => {
    const [text, setText] = useState('');
    const [taskArr, setTaskArr] = useState(JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || {});
    const setLocalStorage = (value) => localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(value));
    const createTask = () => {
            if (text.trim() === '') return taskArr
            setTaskArr(curr => {
                const idTask = +new Date();
                const newTaskArr = {...curr, [idTask]: {text, completed: false, id: idTask}};
                setLocalStorage(newTaskArr);
                return newTaskArr
            });

        };
    const clearAll = () => {
        localStorage.removeItem(LOCAL_STORAGE_KEY);
        setTaskArr([]);
    };
    const handleDelete = (id) => {
        setTaskArr(curr => {
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
                    {Object.values(taskArr).map(item =>
                        <li key={item.id}>
                            {item.text}
                            <DeleteTaskBtn onClick={() => handleDelete(item.id)}/>
                        </li>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default ListBody;
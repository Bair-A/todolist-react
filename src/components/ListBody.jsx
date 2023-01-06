import React, {useState} from 'react';
import TaskСount from "./TaskCount";
import MainAddTaskBtn from "./MainAddTaskBtn"

const ListBody = () => {
    const [count, setCount] = useState(0);
    const [toggled, setToggled] = useState(false);

    return (
        <div className='list-body'>
            <div className="container">
                <TaskСount count={count}/>
                <ul>

                </ul>
                <MainAddTaskBtn setCount={setCount} toggled={toggled}/>
            </div>
        </div>
    );
};

export default ListBody;
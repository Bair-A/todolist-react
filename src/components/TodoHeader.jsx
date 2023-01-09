import React from 'react';
import TaskInput from "./TaskInput";
import AddTaskBtn from "./AddTaskBtn";
import ClearAllBtn from "./ClearAllBtn";

const TodoHeader = ({createTask, setText, clearAll}) => {
    return (
        <div className='todo-header'>
            <TaskInput setText={setText}/>
            <AddTaskBtn createTask={createTask}/>
            <ClearAllBtn clearAll={clearAll}/>
        </div>
    );
};

export default TodoHeader;
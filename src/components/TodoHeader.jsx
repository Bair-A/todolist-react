import React from 'react';
import TaskInput from "./TaskInput";
import AddTaskBtn from "./AddTaskBtn";
import ClearAllBtn from "./ClearAllBtn";

const TodoHeader = ({createTask, setText, clearAll, value}) => {
    return (
        <div className='todo-header'>
            <TaskInput setText={setText} value={value}/>
            <AddTaskBtn createTask={createTask}/>
            <ClearAllBtn clearAll={clearAll}/>
        </div>
    );
};

export default TodoHeader;
import React from 'react';

const TaskInput = ({setText}) => {
    return (
        <input type="text" placeholder="iput task" onBlur={(e) => setText(e.target.value)}/>
    );
};

export default TaskInput;
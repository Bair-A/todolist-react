import React from 'react';

const TaskInput = ({setText, value}) => {
    return (
        <input value={value} type="text" placeholder="iput task" onChange={(e) => setText(e.target.value)}/>
    );
};

export default TaskInput;
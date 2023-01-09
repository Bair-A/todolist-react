import React from 'react';

const AddTaskBtn = ({createTask}) => {
    return (
        <button onClick={() => createTask()}>
            add task
        </button>
    );
};

export default AddTaskBtn;
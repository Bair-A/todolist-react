import React from 'react';

const MainAddTaskBtn = ({setCount, toggled}) => {
    return (
        <button onClick={() => setCount((count) => count + 1)} className={`${toggled ? 'class' : null}`}>
            btn
        </button>
    );
};

export default MainAddTaskBtn;
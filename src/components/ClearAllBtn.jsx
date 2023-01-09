import React from 'react';

const ClearAllBtn = ({clearAll}) => {
    return (
        <button onClick={() => clearAll()}>
            clear tasks
        </button>
    );
};

export default ClearAllBtn;
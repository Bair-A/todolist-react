import React from 'react';
import {Badge} from "react-bootstrap";

const TaskCounter = ({bgColor, value, countName}) => {
    return (
        <Badge bg={bgColor}>
            {countName} : {value}
        </Badge>
    );
};

export default TaskCounter;
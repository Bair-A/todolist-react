import React from 'react';
import {Col, Row} from "react-bootstrap";
import TaskCounter from "./TaskCounter";

const CounterRow = ({taskArr}) => {
  return (
    <Row className="mt-3 mb-1 flex-row-reverse">
      <Col xs="auto">
        <TaskCounter bgColor={"primary"} value={taskArr.length} countName={"TOTAL COUNT"}/>
      </Col>
      <Col xs="auto">
        <TaskCounter bgColor={"secondary"} value={taskArr.filter(item => item.completed).length}
                     countName={"COMPLETED"}/>
      </Col>
      <Col xs="auto">
        <TaskCounter bgColor={"warning"} value={taskArr.filter(item => !item.completed).length}
                     countName={"PENDING"}/>
      </Col>
    </Row>
  );
};

export default CounterRow;
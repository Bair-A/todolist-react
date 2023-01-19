import React from 'react';
import classNames from "classnames/bind";
import {Button, Col, Form, Row} from "react-bootstrap";

const Task = ({item, handleToggleCheck, handleDelete, handleChange}) => {
  const taskClass = classNames(
    "task-input",
    {
      "text-decoration-line-through": item.completed,
      "text-secondary": item.completed,
      "text-danger": item.important,
      "fw-bold": item.important,
    })
  return (
    <Form.Group className="mt-3 task-item" key={item.id}>
      <Row className="align-items-center">
        <Col xs="auto">
          <Form.Check type="checkbox" defaultChecked={item.completed}
                      onClick={() => handleToggleCheck(item.id)}/>
        </Col>
        <Col>
          <Form.Control
            className={taskClass}
            type="text" onBlur={(e) => handleChange(e, item.id)}
            defaultValue={item.text}/>
        </Col>
        <Col xs="auto">
          <Button variant="primary" onClick={() => handleDelete(item.id)}>
            delete
          </Button>
        </Col>
      </Row>
    </Form.Group>
  );
};

export default Task;
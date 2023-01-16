import React from 'react';
import {Button, Form} from "react-bootstrap";

const TodoHeader = ({createTask, setText, clearAll, value}) => {
    return (
        <Form>
            <Form.Group className="mb-3 mt-3">
                <Form.Control placeholder="input task" value={value} type="text" onChange={(e) => setText(e.target.value)}/>
            </Form.Group>
            <Form.Group>
                <Button variant="success" onClick={() => createTask()}>
                    add task
                </Button>
                <Button className="ms-3" variant="danger" onClick={() => clearAll()}>
                    clear tasks
                </Button>
            </Form.Group>
        </Form>
    );
};

export default TodoHeader;
import React from 'react';
import {Button, Form} from "react-bootstrap";

const TodoHeader = ({createTask, setText, clearAll, value, importantTask, setImportantTask}) => {
    return (
        <Form>
            <Form.Group className="mb-3">
                <Form.Control placeholder="input task" value={value} type="text" onChange={(e) => setText(e.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Check type="checkbox" label="important" checked={importantTask}  onChange={() => setImportantTask(curr => !curr)}/>
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
import React, {useEffect, useState} from 'react';
import TodoHeader from "./TodoHeader";
import {Form, Button, Row, Col} from "react-bootstrap";
import TaskCounter from "./TaskCounter";

const LOCAL_STORAGE_KEY = 'todoArr';

const setLocalStorage = (value) => localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(value));
const makeCopy = (curr) => JSON.parse(JSON.stringify(curr));

const ListBody = () => {
    const [importantTask, setImportantTask] = useState(false);
    const [taskObj, setTaskObj] = useState(JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || {});
    useEffect(
        () => {
            setLocalStorage(taskObj)
        },
        [taskObj],
    );
    const [text, setText] = useState('');
    const createTask = () => {
        setImportantTask(false);
        if (text.trim() === '') {
            return
        }
        setText('');
        setTaskObj(curr => {
            const idTask = +new Date();
            const newTaskObj = makeCopy(curr);
            const important = importantTask;
            newTaskObj[idTask] = {text, completed: false, id: idTask, important};
            console.log(newTaskObj)
            return newTaskObj
        });
    };
    const handleChange = (e, key) => {
        if (taskObj[key].text === e.target.value || e.target.value.trim() === '') return
        setTaskObj((curr) => {
            const newTaskObj = makeCopy(curr);
            newTaskObj[key].text = e.target.value
            return newTaskObj
        })
    }
    const clearAll = () => {
        localStorage.removeItem(LOCAL_STORAGE_KEY);
        setTaskObj({});
    };
    const handleDelete = (id) => {
        setTaskObj(curr => {
            const newObj = makeCopy(curr);
            delete newObj[id];
            return newObj
        });
    }
    const handleToggleCheck = (key) => {
        setTaskObj((curr) => {
            const newTaskObj = makeCopy(curr);
            newTaskObj[key].completed = !(newTaskObj[key].completed);
            return newTaskObj
        })
    }
    const taskArr = Object.values(taskObj);
    return (
        <div className="list-body">
            <div className="container">
                <Row className="mt-3 mb-1 flex-row-reverse">
                    <Col xs="auto">
                        <TaskCounter bgColor={"primary"} value={taskArr.length} countName={"TOTAL COUNT"}/>
                    </Col>
                    <Col xs="auto">
                        <TaskCounter bgColor={"secondary"} value={taskArr.filter(item =>  item.completed).length} countName={"COMPLETED"}/>
                    </Col>
                    <Col xs="auto">
                        <TaskCounter bgColor={"warning"} value={taskArr.filter(item => !item.completed).length} countName={"WAITING"}/>
                    </Col>
                </Row>
                <TodoHeader value={text} setText={setText} createTask={createTask} importantTask={importantTask} clearAll={clearAll} setImportantTask={setImportantTask}/>
                <div>
                    {taskArr.map(item =>
                        <Form.Group className="mt-3 task-item" key={item.id}>
                            <Row className="align-items-center">
                                <Col xs="auto">
                                    <Form.Check type="checkbox" defaultChecked={item.completed}
                                                onClick={() => handleToggleCheck(item.id)}/>
                                </Col>
                                <Col>
                                    <Form.Control className={item.completed ? "text-decoration-line-through task-input text-secondary" : "task-input"} type="text" onBlur={(e) => handleChange(e, item.id)}
                                                  defaultValue={item.text}/>
                                </Col>
                                <Col xs="auto">
                                    <Button variant="primary" onClick={() => handleDelete(item.id)}>
                                        delete
                                    </Button>
                                </Col>
                            </Row>
                        </Form.Group>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ListBody;
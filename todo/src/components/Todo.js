import React from 'react';

const Todo = ({ todos, setTodos, todo }) => {
    const handleDelete = () => {
        const UpdatedTodos = todos.filter(ele => ele.id !== todo.id)
        setTodos(UpdatedTodos);
    }
    const HandleComplete = () => {
        setTodos(todos.map(ele => {
            if (ele.id === todo.id) {
                return {
                    ...ele, completed: !ele.completed
                }
            }
            return ele;
        }));
    }
    return (
        <div className="todo">
            <li className={`todo-item  ${todo.completed ? "completed" : ""}`}>{todo.text}</li>
            <button className="complete-btn" onClick={HandleComplete}><i className="fas fa-check"></i></button>
            <button className="trash-btn" onClick={handleDelete}><i className="fas fa-trash"></i></button>
        </div>
    );
}
export default Todo;
import { ChangeEvent, FormEvent, useRef, useState } from "react";
import Todo, { ITodo } from "../todo/todo";
import style from './todoWrapper.module.css';
import { v4 as uuidv4 } from 'uuid';
import AddToDo from "../addTodo/addTodo";
import TodoControl from "../todoControl/todoControl";

 
const TodoWrapper = () => {
    const inpRef = useRef<HTMLInputElement>(null);
	const [todos, setTodos] = useState<ITodo[]>([]);
	const [list, setList] = useState<string>('all');
	const incompletedTodos = todos.filter((el) => el.completed === false);
	const completedTodos = todos.filter((el) => el.completed === true);
	const allTodos = todos;
	let currentList = [];

	switch (list) {
		case 'incompleted':
			currentList = incompletedTodos;
			break;
		case 'completed':
			currentList = completedTodos;
			break;
		default:
			currentList = allTodos;
			break;
	}
	const handleAddTodo = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const data = e.target as HTMLFormElement;
		const { addTodo } = data;
		setTodos([
			{ id: uuidv4(), value: addTodo?.value, completed: false },
			...todos,
		]);
		if (inpRef.current) {
			inpRef.current.value = '';
		}
	};
	const handleChangeView = (e: FormEvent<HTMLFormElement>) => {
		const elem = e.target as HTMLInputElement;
		setList(elem.id);
	};

	const handleCompleteTodo = (e: ChangeEvent<HTMLInputElement>) => {
		const id = e.currentTarget.id;
		setTodos(
			todos.map((todo) =>
				todo.id === id ? { ...todo, completed: !todo.completed } : todo
			)
		);
	};
	const handleClearCompleted = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		setTodos(incompletedTodos);
	};
	return (
		<main className={style.main}>
			<h1 className={style.title}>todos</h1>
			<section className={style.section}>
                <AddToDo inpRef={inpRef} handleAddTodo={handleAddTodo}/>
				<div className={style.todos_wrapper}>
					{currentList.map((el) => (
                        <Todo completed={el.completed} handleCompleteTodo={handleCompleteTodo} id={el.id} value={el.value} key={el.id}/>
					))}
				</div>
                <TodoControl handleChangeView={handleChangeView} handleClearCompleted={handleClearCompleted} quantityOfTodo={incompletedTodos.length}/>
			</section>
		</main>
	);
}
 
export default TodoWrapper;
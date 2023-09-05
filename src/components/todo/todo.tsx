import { ChangeEvent } from 'react';
import style from './todo.module.css';
import classNames from 'classnames';

export interface ITodo {
	id: string;
	value: string;
	completed: boolean;
}
export interface TodoProps extends ITodo {
    handleCompleteTodo: (e: ChangeEvent<HTMLInputElement>) => void
}

const Todo = ({id, value, completed, handleCompleteTodo}: TodoProps) => {
	return (
		<div className={style.wrapper} key={id}>
			<label
				htmlFor={id}
				className={classNames(style.label, {
					[style.label_completed]: completed,
				})}
			>
				<span
					className={classNames(style.status, {
						[style.status_completed]: completed,
					})}
				></span>
				<span className={style.status_desc}>{value}</span>
				<input
					className={style.btn}
					key={id}
					type='checkbox'
					name='todo'
					id={id}
					defaultChecked={completed}
					onChange={handleCompleteTodo}
				/>
			</label>
		</div>
	);
};

export default Todo;

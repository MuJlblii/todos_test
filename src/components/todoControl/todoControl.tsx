import { FormEvent } from 'react';
import style from './todoControl.module.css';

interface TodoControlProps {
    handleChangeView: (e: FormEvent<HTMLFormElement>) => void;
    quantityOfTodo: number;
    handleClearCompleted: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const TodoControl = ({handleChangeView, quantityOfTodo, handleClearCompleted}: TodoControlProps) => {
	return (
		<div className={style.wrapper}>
			<p data-testid="quantity">{quantityOfTodo} item(s) left</p>
			<form onChange={handleChangeView} className={style.form}>
				<label htmlFor='all' className={style.radio_label}>
					<input
						className={style.radio_btn}
						type='radio'
						name='view'
						id='all'
						defaultChecked
					/>
					All
				</label>

				<label htmlFor='incompleted' className={style.radio_label} data-testid='incompleted'>
					<input
						className={style.radio_btn}
						type='radio'
						name='view'
						id='incompleted'
					/>
					Incompleted
				</label>

				<label htmlFor='completed' className={style.radio_label}>
					<input
						className={style.radio_btn}
						type='radio'
						name='view'
						id='completed'
					/>
					Completed
				</label>
			</form>
			<button onClick={handleClearCompleted} className={style.btn_clear} data-testid="clearBtn">
				Clear completed
			</button>
		</div>
	);
};

export default TodoControl;

import { FormEvent } from 'react';
import style from './addTodo.module.css';

interface AddToDoProps {
    handleAddTodo: (e: FormEvent<HTMLFormElement>) => void;
    inpRef: React.RefObject<HTMLInputElement>;
}
 
const AddToDo = ({handleAddTodo, inpRef}: AddToDoProps) => {
    return (
        <form
        onSubmit={handleAddTodo}
        className={style.wrapper}
    >
        <input
            className={style.inp}
            placeholder='What needs to be done?'
            type='text'
            name='addTodo'
            id='addTodo'
            ref={inpRef}
        />
    </form>
    );
}
 
export default AddToDo;
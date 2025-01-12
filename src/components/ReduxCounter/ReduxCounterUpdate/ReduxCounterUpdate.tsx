import { useAppDispatch } from '@redux/hooks';
import {  decrement, increment} from '@redux/slices/counterSlice';

const ReduxCounterUpdate = () => {
    const dispatch = useAppDispatch();

    return (
        <>
            <button onClick={() => dispatch(increment())}>Increment</button>
            <br />
            <button onClick={() => dispatch(decrement())}>Decrement</button>
            <br />
        </>
    )
}

export default ReduxCounterUpdate;
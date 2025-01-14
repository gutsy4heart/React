import { useAppDispatch } from '@redux/hooks';
import { change, decrement, increment } from '@redux/slices/counterSlice';

const ReduxCounterUpdate = () => {
    const dispatch = useAppDispatch();

    return (
        <div>
            <button onClick={() => dispatch(increment())}>Increment</button>
            <br />
            <button onClick={() => dispatch(decrement())}>Decrement</button>
            <br />
            <button onClick={() => {
                const sign = Math.random() > 0.5 ? 1 : -1;
                const value = Math.floor(Math.random() * 100);

                dispatch(change(sign * value));
            }}>Change
            </button>
        </div>
    )
}

export default ReduxCounterUpdate;
import { useAppDispatch } from '@redux/hooks';
import { changeAsync, decrementAsync, incrementAsync } from '@redux/slices/counterSlice';

const ReduxCounterAsyncUpdate = () => {
    const dispatch = useAppDispatch();

    return (
        <div>
            <button onClick={() => dispatch(incrementAsync())}>Increment Async</button>
            <br />
            <button onClick={() => dispatch(decrementAsync())}>Decrement Async</button>
            <br />
            <button onClick={() => {
                const sign = Math.random() > 0.5 ? 1 : -1;
                const value = Math.floor(Math.random() * 100);

                dispatch(changeAsync(sign * value));
            }}>Change Async
            </button>
        </div>
    )
}

export default ReduxCounterAsyncUpdate;
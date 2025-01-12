import {useAppDispatch} from "@redux/hooks";
import {changeAsync, decrementAsync, incrementAsync} from "@redux/slices/counterSlice";


const ReduxCounterUpdateAsync = () => {
    const dispatch = useAppDispatch();
    return (
        <>
        <button onClick={() => {

            const value = Math.floor(Math.random() * 100);
            const sign = Math.random() > 0.5 ? 1 : -1;
            dispatch(changeAsync(value * sign));
        }}>ChangeAsync</button>
        <br/>
        <button onClick={() => dispatch(incrementAsync())}>Increment Async</button>
        <br/>
        <button onClick={() => dispatch(decrementAsync())}>Decrement Async</button>
        </>

)
}
export default ReduxCounterUpdateAsync;
import { useAppSelector } from '@redux/hooks';

const ReduxCounterDisplay = () => {
    const {
        value: counter,
        isLoading
    } = useAppSelector(state => state.counter);


    return (
        <p>Counter is {isLoading ? 'LOADING' : counter}</p>
    );
};

export default ReduxCounterDisplay;
import ReduxCounterDisplay from './ReduxCounterDisplay/ReduxCounterDisplay';
import ReduxCounterUpdate from './ReduxCounterUpdate/ReduxCounterUpdate';
import ReduxCounterAsyncUpdate from '@components/ReduxCounter/ReduxCounterAsyncUpdate/ReduxCounterAsyncUpdate';

const ReduxCounter = () => {
    return (
        <div>
            <ReduxCounterDisplay />
            <ReduxCounterUpdate />
            <ReduxCounterAsyncUpdate />
        </div>
    );
};

export default ReduxCounter;
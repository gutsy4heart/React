import ReduxCounterDisplay from './ReduxCounterDisplay/ReduxCounterDisplay';
import ReduxCounterUpdate from './ReduxCounterUpdate/ReduxCounterUpdate';
import ReduxCounterUpdateAsync from "@components/ReduxCounter/ReduxCounterUpdateAsync/ReduxCounterUpdateAsync";

const ReduxCounter = () => {
    return (
        <div>
            <ReduxCounterDisplay />
            <ReduxCounterUpdate />
            <ReduxCounterUpdateAsync/>
        </div>
    );
};

export default ReduxCounter;
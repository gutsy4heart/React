import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

const sliceName = 'counter';

type InitialState = {
    value: number,
    isLoading: boolean,
}

const initialState: InitialState = {
    value: 0,
    isLoading: false
};

export const incrementAsync = createAsyncThunk(
    `${ sliceName }/incrementAsync`,
    () => new Promise(
        (resolve, reject) =>
            setTimeout(Math.random() > 0.5 ? reject : resolve, 1000)
    )
);

export const decrementAsync = createAsyncThunk(
    `${ sliceName }/decrementAsync`,
    () => new Promise(
        (resolve, reject) =>
            setTimeout(Math.random() > 0.5 ? reject : resolve, 1000)
    )
);

export const changeAsync = createAsyncThunk(
    `${ sliceName }/changeAsync`,
    (value: number) => new Promise<number>(
        (resolve, reject) =>
            setTimeout(Math.random() > 0.5 ? reject : () => resolve(value), 1000)
    )
);

const counterSlice = createSlice({
    name: sliceName,
    initialState,
    reducers: {
        increment: (state) => {
            state.value += 1;
        },
        decrement: (state) => {
            state.value -= 1;
        },
        change: (state, action: PayloadAction<number>) => {
            state.value += action.payload;
        }
    },
    extraReducers: builder => {
        builder
            .addCase(incrementAsync.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(incrementAsync.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(incrementAsync.fulfilled, (state) => {
                state.value += 10;
                state.isLoading = false;
            });

        builder
            .addCase(decrementAsync.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(decrementAsync.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(decrementAsync.fulfilled, (state) => {
                state.value -= 10;
                state.isLoading = false;
            });

        builder
            .addCase(changeAsync.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(changeAsync.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(changeAsync.fulfilled, (state, action: PayloadAction<number>) => {
                state.value -= action.payload;
                state.isLoading = false;
            });
    }
});

export const {increment, decrement, change} = counterSlice.actions;
export default counterSlice.reducer;
import React from "react";

import { useAppSelector, useAppDispatch } from "../store/hooks";

import {  increment, decrement } from "../features/counter/counterSlice";

const Counter = () => {
    const count = useAppSelector(state => state.counter.value);
    const dispatch = useAppDispatch();

    return (
        <p>{count}</p>
    )
}

export default Counter;

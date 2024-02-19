interface ICount {
    value: number;
}

enum COUNT_TYPES {
    ADD = "add",
    REMOVE = "remove",
}

interface ICountAction {
    type: COUNT_TYPES;
    payload: number;
}

const defaultState: ICount = {
    value: 0,
};

export const countReducer = (
    state: ICount = defaultState,
    action: ICountAction
) => {
    switch (action.type) {
        case COUNT_TYPES.ADD:
            return {
                value: state.value + action.payload,
            };
        case COUNT_TYPES.REMOVE:
            return {
                value: state.value - action.payload,
            };
        default:
            return state;
    }
};

interface ICountActionCB {
    (value: number): ICountAction;
}

export const addCountAction: ICountActionCB = (value: number) => ({
    type: COUNT_TYPES.ADD,
    payload: value,
});

export const removeCountAction: ICountActionCB = (value: number) => ({
    type: COUNT_TYPES.REMOVE,
    payload: value,
});
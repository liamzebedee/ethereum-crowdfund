const initialState = {
    project: {
        raised: null,
        goal: null,
        deadline: -1
    }
}

function reduce(state = initialState, action) {
    switch(action.type) {
        case "loadProjectInfo":
            return {
                ...state,
                project: action.project,
            }
    }
    return state;
}

export default reduce;
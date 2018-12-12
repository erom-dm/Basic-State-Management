function createStore (reducer) {
    // The store should have four parts
    // 1. The state
    // 2. Get the state.
    // 3. Listen to changes on the state.
    // 4. Update the state

    let state;
    let listeners = [];

    const getState = () => state;

    const subscribe = (listener) => {
        listeners.push(listener);
        return () => {
            listeners = listeners.filter((l) => l !== listener)
        }
    };

    const dispatch = (action) => {
        state = reducer(state, action);
        listeners.forEach((listener) => listener());
    };

    return {
        getState,
        subscribe,
        dispatch,
    }
}

const ADD_TODO = 'ADD_TODO';
const REMOVE_TODO = 'REMOVE_TODO';
const TOGGLE_TODO = 'TOGGLE_TODO';
const REMOVE_GOAL = 'REMOVE_GOAL';
const ADD_GOAL = 'ADD_GOAL';

function addTodoAction(todo){
    return{
        type: ADD_TODO,
        todo,
    }
}

function removeTodoAction(id){
    return{
        type: REMOVE_TODO,
        id,
    }
}

function toggleTodoAction(id){
    return{
        type: TOGGLE_TODO,
        id,
    }
}

function addGoal(goal){
    return{
        type: ADD_GOAL,
        goal,
    }
}

function returnGoal(id){
    return{
        type: REMOVE_GOAL,
        id,
    }
}


function todos (state = [], action) {
    switch(action.type){
        case ADD_TODO:
            return state.concat([action.todo]);
        case REMOVE_TODO:
            return state.filter((todo) => todo.id !== action.id);
        case TOGGLE_TODO:
            return state.map((todo) => todo.id !== action.id ? todo :
                Object.assign({}, todo, {complete: !todo.complete}));
        default:
            return state;

    }
}

function goals (state = [], action) {
    switch(action.type){
        case ADD_GOAL:
            return state.concat([action.goal]);
        case REMOVE_GOAL:
            return state.filter((goal) => goal.id !== action.id);
        default:
            return state;

    }
}

function app (state = {}, action){
    return {
        todos: todos(state.todos, action),
        goals: goals(state.goals, action),
    }
}

const store = createStore(app);
store.dispatch(addTodoAction({
    id: 0,
    name: 'Walk the dog',
    complete: false
}));


//
//
// {
//     type: 'ADD_TODO',
//     todo: {
//         id: 0,
//         name: 'Learn Redux',
//         complete: false,
//     }
// }
//
// {
//     type: 'REMOVE_TODO',
//     id: 0,
// }
//
// {
//     type: 'TOGGLE_TODO',
//     id: 0,
// }
//
// {
//     type: 'ADD_GOAL',
//     goal: {
//         id: 0,
//         name: 'Run a Marathon'
//     }
// }
//
// {
//     type: 'REMOVE_GOAL',
//     id: 0
// }




// let store = createStore()
// store.subscribe(cb)
// cb is passed to listeners
// returns
import { fromJS } from 'immutable';


let initialState = fromJS({
    location: '',
    data: {},
    dates: [],
    temps: [],
    selected: {
        date: '',
        temp: null
    }
});

export default function mainReducer(state = initialState, action) {
    switch(action.type) {
        case 'CHANGE_LOCATION': 
            return state.set('location', action.location);
        case 'SET_DATA':
            return state.set('data', action.data);
        case 'SET_DATES':
            return state.set('dates', action.dates);
        case 'SET_TEMPS':
            return state.set('temps', action.temps);
        case 'SET_SELECTED_TEMP':
            return state.setIn(['selected', 'temp'], action.temp)
        case 'SET_SELECTED_DATE':
            return state.setIn(['selected', 'date'], action.date);
        default:
            return state;
    }
}




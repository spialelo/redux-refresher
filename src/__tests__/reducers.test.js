import mainReducer from "../reducers";
import { fromJS } from 'immutable';

describe('mainReducer', function() {
    it('should return the initial state', function() {
        expect(mainReducer(undefined, {})).toEqual(fromJS({
            location: '',
            data: {},
            dates: [],
            temps: [],
            selected: {
                date: '',
                temp: null
            }
        }));
    });

    it('should react to an action with the type CHANGE_LOCATION', function() {
        let location = 'Toronto, Canada';
        expect(mainReducer(undefined, {
            type: 'CHANGE_LOCATION',
            location: location
        })).toEqual(fromJS({
            location: location,
            data: {},
            dates: [],
            temps: [],
            selected: {
                date: '',
                temp: null
            }
        }));
    });

    it('should react to an action with the type SET_DATA', function() {
        let data = fromJS({ something: 'data'});
        expect(mainReducer(undefined, {
            type: 'SET_DATA',
            data: data
        })).toEqual(fromJS({
            location: '',
            data: data,
            dates: [],
            temps: [],
            selected: {
                date: '',
                temp: null
            }
        }));
    });

    it('should react to an action with the type SET_DATES', function() {
        let dates = fromJS(['2021-08-08', '2021-08-09']);
        expect(mainReducer(undefined, {
            type: 'SET_DATES',
            dates: dates
        })).toEqual(fromJS({
            location: '',
            data: {},
            dates: dates,
            temps: [],
            selected: {
                date: '',
                temp: null
            }
        }));
    });

    it('should react to an action with the type SET_TEMPS', function() {
        let temps = fromJS(['41', '38']);
        expect(mainReducer(undefined, {
            type: 'SET_TEMPS',
            temps: temps
        })).toEqual(fromJS({
            location: '',
            data: {},
            dates: [],
            temps: temps,
            selected: {
                date: '',
                temp: null
            }
        }));
    });

    it('should react to an action with the type SET_SELECTED_DATE', function() {
        let date = '2021-08-10';
        expect(mainReducer(undefined, {
            type: 'SET_SELECTED_DATE',
            date: date
        })).toEqual(fromJS({
            location: '',
            data: {},
            dates: [],
            temps: [],
            selected: {
                date: date,
                temp: null
            }
        }));
    });

    it('should react to an action with the type SET_SELECTED_TEMP', function() {
        let temp = '41';
        expect(mainReducer(undefined, {
            type: 'SET_SELECTED_TEMP',
            temp: temp
        })).toEqual(fromJS({
            location: '',
            data: {},
            dates: [],
            temps: [],
            selected: {
                date: '',
                temp: temp
            }
        }));
    });

});


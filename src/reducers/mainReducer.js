/**
 * @author Shashank
 * @description  This is the main reducer
 */
import initialState from './initialState';
import { FETCH_STUFF } from '../actions/actionTypes';

export default function work(state=initialState, action){ 
    switch(action.type){
        case FETCH_STUFF:
            console.log('FS');
            return Object.assign({}, state, {
                "hello": 1
            });
        default:
            return state;
    }
}

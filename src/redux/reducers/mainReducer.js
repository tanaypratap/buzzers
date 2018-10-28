/**
 * @author Shashank
 * @description  This is the main reducer
 */
import initialState from './initialState';
import { FETCH_STUFF } from '../../components/testapp/actions/actionTypes';

export default function work(state=initialState, action){ 
    switch(action.type){
        case FETCH_STUFF:
            return Object.assign({}, state, {
                "hello": 1
            });
        default:
            return state;
    }
}

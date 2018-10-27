/**
 * @author Shashank
 * @description  Actions are defined here
 */
import * as ActionTypes from './actionTypes';

export const doSomething = () => {
    return {
        type: ActionTypes.FETCH_STUFF
    }
}

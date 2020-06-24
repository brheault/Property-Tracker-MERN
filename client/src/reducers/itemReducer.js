import {v4 as uuidv4} from 'uuid';
import {GET_ITEMS, ADD_ITEM, DELETE_ITEM} from "../actions/types";

//Harccoded data that should eventually come from the backend
const initialState = {
    items: [
        {id: uuidv4(), name: 'Eggs'},
        {id: uuidv4(), name: 'Milk'},
        {id: uuidv4(), name: 'Steak'},
        {id: uuidv4(), name: 'Toast'}
    ]
}

export default function(state = initialState, action){
    switch(action.type){
        case GET_ITEMS:
            return{
                ...state
            };
        case DELETE_ITEM:
            return{
                ...state,
                items: state.items.filter(item => item.id !== action.payload)
            };
        case ADD_ITEM:
            return{
                ...state,
                //This syntax adds the new item (stored in payload) to the list of existing items (in state.items)
                items: [action.payload, ...state.items]
            }
        default:
            return state;
    }
}
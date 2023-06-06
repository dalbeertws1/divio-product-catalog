import axios from "axios";
import * as ActionType from "../action-types/index";


export const searchproduct =  (products: any) => {

    return (dispatch: ActionType.DispatchType) => {
        dispatch({
            type: ActionType.ActionTypes.SEARH_PRODUCT,
            payload: products
        })
    }
}
export const editProducts = (products: any) => {
    return (dispatch: ActionType.DispatchType) => {
       
        dispatch({
            type: ActionType.ActionTypes.EDIT_PRODUCT,
            payload: products
        })
    }
}

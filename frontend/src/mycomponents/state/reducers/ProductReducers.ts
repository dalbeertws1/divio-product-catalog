import axios from "axios";
import * as ActionType from "../action-types/index";

const initialState: ActionType.ProductState = {
products: []
};

const reducer = (
state: ActionType.ProductState = initialState,
action: ActionType.ProductAction
): ActionType.ProductState => {
switch (action.type) {
    case ActionType.ActionTypes.SEARH_PRODUCT:
     const newProducts: any = action.payload.map(
        (id: any) => ({ id, is_selected: false })
     );
     return {
        ...state,
        products: newProducts
     };
    case ActionType.ActionTypes.EDIT_PRODUCT:
     const editedProductIds: any = action.payload;
     const updatedProducts = state.products.map((product) => {
        if (editedProductIds.includes(product.id)) {
         return {
            ...product,
            is_selected: true
         };
        }
        else{
          return {
            ...product,
            is_selected: false
         };
        }
        return product;
     });
     return {
        ...state,
        products: updatedProducts
     };
    default:
     return state;
}
};

export default reducer;
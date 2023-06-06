export enum ActionTypes{
    FETCH_PRODUCTS="FETCH_PRODUCTS",
    SEARH_PRODUCT="SEARH_PRODUCT",
    EDIT_PRODUCT="EDIT_PRODUCT"
}

export interface Iproduct{
    id: number,
    name: string,
      price: number,
      description: string,
      stock:number,
      is_selected:boolean
      
}
export type ProductState={
    products:Iproduct[] 
}
export type ProductAction={
    type : ActionTypes,
    payload:Iproduct[]
}

export type DispatchType=(args:ProductAction)=>ProductAction
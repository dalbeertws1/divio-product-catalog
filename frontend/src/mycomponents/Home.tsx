import React, { useState, useCallback, useEffect } from 'react'
import { Dispatch } from "redux"
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import { Iproduct, ProductState } from './state/action-types'
import { debounce, handleedit } from './lib'
import { searchproduct, editProducts } from './state/actions/ProductActions'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { bindActionCreators } from 'redux'
import * as actioncreators from "../mycomponents/state/actions/ProductActions"
import axios from 'axios'

export default function Home() {

    const dispatch: Dispatch<any> = useDispatch()

    const { editProducts } = bindActionCreators(actioncreators, dispatch)
    const products: Iproduct[] = useSelector(
        (state: ProductState) => state.products,
        shallowEqual
    )
    const [sortitem, setsortitem] = useState('name')
    const [arrproduct, setarrproduct] = React.useState<Iproduct[] | []>(products)

    const token = localStorage.getItem("token")
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    const searchchange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        let searchstr = e.target.value

        await axios.get(`http://0.0.0.0:8000/?search=${searchstr}&ordering=${sortitem}`, config)
            .then((response) => {
                let obj = {
                    searchitem: searchstr,
                    order: "name"
                }
                fetchproducts(response.data)
                setarrproduct(products)

                return response.data
            })
            .catch((err) => {
                console.log(err)
                toast.error("Something went worng!!!")
                return "err"
            })
    }
    const fetchproducts = React.useCallback(
        (pros: Iproduct[]) => dispatch(searchproduct(pros)),
        [dispatch]
    )


    console.log("object", products);

    useEffect(() => {



    }, [products])

    const optimalevent = useCallback(debounce(searchchange), [])
    return (
        <div>
            <div className="container">
                <ToastContainer />
                <div>
                    <div className='flexcls'>
                        <div className="d-flex mt-5 mb-2 p-2">
                            <input onChange={searchchange} name="search" type="search" className="w-50" id="search" />
                            <button className="btn btn-primary">Search</button>
                        </div>
                        <div>
                            <select onChange={(e) => { setsortitem(e.target.value) }}>

                                <option>Please choose one option to sort</option>
                                <option value={'name'}>Name</option>
                                <option value={'description'}>Description</option>
                                <option value={'price'}>Price</option>
                                <option value={'is_selected'}>Selected Products</option>


                            </select>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="row">
                        <div className="col-sm border border-dark p-2">
                            {/* ---one-- */}
                            <div className="overflow-auto">
                                <table className="table table-bordered border-primary">
                                    <thead>
                                        <tr>
                                            <th>S.no.</th>
                                            <th>Product Name</th>
                                            <th>Description</th>
                                            <th>Price</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            arrproduct && arrproduct?.map((item: Iproduct, i: any) => {
                                                return <tr key={i}>
                                                    <td>{item?.id}</td>
                                                    <td>{item?.name}</td>
                                                    <td>{(item?.description + "").substring(0, 15) + "..."}</td>
                                                    <td>{item.price}</td>
                                                    <td><input type="checkbox" defaultChecked={item.is_selected} onChange={() => { console.log("object", item); handleedit(item); editProducts([item]) }} /></td>
                                                </tr>
                                            })
                                        }

                                    </tbody>
                                </table>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

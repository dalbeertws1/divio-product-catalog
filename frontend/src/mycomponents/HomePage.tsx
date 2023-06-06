import { GridColDef } from '@mui/x-data-grid';
import { DataGrid, GridRowSelectionModel } from '@mui/x-data-grid';
import axios from 'axios';
import React, { useEffect } from 'react';
import { Dispatch } from 'redux';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { Iproduct, ProductState } from './state/action-types';
import { searchproduct } from './state/actions/ProductActions';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../mycomponents/state/actions/ProductActions';

const columns: GridColDef[] = [
   { field: 'id', headerName: 'ID', width: 70 },
   { field: 'name', headerName: 'Title', width: 130 },
   { field: 'description', headerName: 'Description', width: 130 },
   { field: 'price', headerName: 'Price', type: 'number', width: 90 },
   { field: 'stock', headerName: 'Stock', type: 'number', width: 90 },
];

export default function DataTable() {
   const dispatch: Dispatch<any> = useDispatch();

   const { editProducts } = bindActionCreators(actionCreators, dispatch);
   const products: Iproduct[] = useSelector(
      (state: ProductState) => state.products,
      shallowEqual
   );
   const [arrproduct, setArrProduct] = React.useState<Iproduct[] | []>([]);

   const token = localStorage.getItem('token');
   const config = {
      headers: { Authorization: `Bearer ${token}` },
   };

   const handleEdit = async (item: any) => {
      editProducts(item);
      const token = localStorage.getItem('token');
      const config = {
         headers: { Authorization: `Bearer ${token}` },
      };
      let body = {
         ids: item,
      };
      await axios
         .post(`http://0.0.0.0:8000/products/`, body, config)
         .then((response) => {
            console.log('success');
         })
         .catch((err) => { });
   };

   const searchChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
      let searchstr = e.target.value;

      await axios
         .get(`http://0.0.0.0:8000/products/?search=${searchstr}&ordering=name`, config)
         .then((response) => {
            let obj = {
               searchitem: searchstr,
               order: 'name',
            };
            fetchProducts(response.data);
            console.log('test', response.data);
            setArrProduct(response.data);
            return response.data;
         })
         .catch((err) => {
            console.log(err);
            toast.error('Something went wrong!!!');
            return 'err';
         });
   };

   const fetchProducts = React.useCallback((pros: Iproduct[]) => dispatch(searchproduct(pros)), [dispatch]);

   useEffect(() => {
      console.log("Products", products);
      if (products) {

         const dt :any= products.map((item) => {
            return item.id
         })
         console.log(dt,"------->dt")
         setArrProduct(dt)

      }
   }, [products]);

   const [rowSelectionModel, setRowSelectionModel] = React.useState<GridRowSelectionModel>([]);
   console.log(arrproduct, "--------->")




   return (
      <div className="container" style={{ height: 400, width: '100%', marginTop: 18 }}>
         <div className="d-flex mt-5 mb-2 p-2">
            <input onChange={searchChange} name="search" type="search" className="w-50" id="search" />
         </div>
         <DataGrid rows={arrproduct}
            columns={columns}
            initialState={{
               pagination: {
                  paginationModel: { page: 0, pageSize: 5 },
               },
            }}
            pageSizeOptions={[5, 10]}
            checkboxSelection
            onRowSelectionModelChange={(newRowSelectionModel) => {
               setRowSelectionModel(newRowSelectionModel);
               handleEdit(newRowSelectionModel)

            }}
            rowSelectionModel={rowSelectionModel}
         />
      </div>
   );
}
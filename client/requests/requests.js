import axios from 'axios';
import Cookies from 'js-cookie';

import { getItemsList,selectItem, cart } from '../actions/actions.js';

//запрос имеющегося списка товаров
export const getItemsListRequest = async(dispatch)=> {
    try{
        let response = await axios.get('/items');
        dispatch(getItemsList.success(response.data))
    }
    catch(err) {
        dispatch(getItemsList.error(err));
    }
};

//запрос выбранного товара
export const selectedItemRequest = async(dispatch, id)=> {
    try{
        let response = await axios.get(`/selectedItem/${id}`);
        dispatch(selectItem.select(response.data))
    }
    catch(err){
        console.log(err)
    }
};

//функция запроса на добавления в карзину
export const cartGetRequest = async(dispatch) => {
    try {
        let response = await axios.get('/cartGet/'+Cookies.get().cartID);
        dispatch(cart.get(response.data));
    } catch (err){
        console.log(err);
    }
};

export const cartAddRequest = async(dispatch, id) => {
  try{
      let response = await axios.post('/cartAdd/'+ Cookies.get().cartID, {'id':id});
      dispatch(cart.add(response.data));
  } catch(err) {
      console.log(err);
  }
};

export const cartDeleteRequest = async(dispatch, index) => {
    try{
        let response = await axios.patch('/cartDelete/'+ Cookies.get().cartID,{'index':index});
        dispatch(cart.delete(response.data));
    }catch(err){
        console.log(err);
    }
};





//старый запрос(на всякий)
// export const getItemsListRequest=(dispatch)=> {
//     axios.get('/items')
//         .then(response => {
//             dispatch(getItemsList.success(response.data));
//         })
//         .catch(error => {
//             dispatch(getItemsList.error(error));
//         });
// };


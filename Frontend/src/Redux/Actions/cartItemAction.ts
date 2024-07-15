import { createAsyncThunk } from "@reduxjs/toolkit";
import { deleteApi, postApi, putApi } from "../../apis/baseApi";

export const createCartItem = createAsyncThunk(
    'cartItem/createCartItem',
    async (cartItemData:any, { rejectWithValue }) => {
      try {
        const { data } = await postApi('/cartItem/create' , cartItemData)

        return data.result
      } catch (error:any) {
      
        return   rejectWithValue(error.response.data.errorMessage)
      }
    },
)

export const deleteCartItem = createAsyncThunk(
    'cartItem/deleteCartItem',
    async (cartItemData:any, { rejectWithValue }) => {
      try {
        const {data} = await deleteApi(`/cartItem/delete/${cartItemData.cartId}/${cartItemData.productId}`)

     return data.result.productId
      } catch (error:any) {
  
        
        return   rejectWithValue(error.response.data.errorMessage)
      }
    },
)

export const increaseQuantityByOne = createAsyncThunk(
    'cartItem/increaseQuantity',
    async (cartItemData:any, { rejectWithValue }) => {
      try {
        const {data} = await putApi('/cartItem/increase' , cartItemData)
         const returnObj = formatData(data.result)
       return returnObj
      } catch (error:any) {
  
        return   rejectWithValue(error.response.data.errorMessage)
      }
    },
)
export const decreaseQuantityByOne = createAsyncThunk(
  'cartItem/decreaseQuantity',
  async (cartItemData:any, { rejectWithValue }) => {
    try {

      const {data} = await putApi('/cartItem/decrease' , cartItemData)
      const returnObj = formatData(data.result)
      return returnObj

    } catch (error:any) {
      return   rejectWithValue(error.response.data.errorMessage)
    }
  },
)

const formatData= (result:any)=>{
  const {cartId ,id , quantity ,product , cart} = result
        const {userId} = cart
        const {productId , name , stock , price , productImg} = product
        const returnObj  = {
          cartId,
          id,
          quantity,
          productId,
          name,
          stock,
          price,
          productImg,
          cart,
          userId,
          subTotal: price * quantity
        }

     return returnObj
}
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../Redux/store'
import { getCart } from '../Actions/cartAction'
import { createCartItem, decreaseQuantityByOne, deleteCartItem, increaseQuantityByOne } from '../Actions/cartItemAction'
import { current } from '@reduxjs/toolkit'

export interface CartState {
  CartData: any
  loading: boolean
  error: null | string
}


const initialState: CartState = {
  CartData: [],
  loading: false,
  error: null
}

export const CartSlice = createSlice({
  name: 'cart',

  initialState,
  reducers: {},
  extraReducers(builder) {
    //for getting cart
      builder.addCase(getCart.pending, (state) => {
        state.loading = true
      })

      builder.addCase(getCart.fulfilled, (state, action: PayloadAction<any>) => {
   
          
        state.CartData = action.payload
        state.loading = false
      })

      builder.addCase(getCart.rejected, (state, action) => {
  
        
        state.error = action.payload as string
        state.loading = false
      })

      //for creating cart item
      builder.addCase(createCartItem.pending, (state) => {
        state.loading = true
      })

      builder.addCase(createCartItem.fulfilled, (state, action: PayloadAction<any>) => {
        state.CartData.push(action.payload)
        state.loading = false
      })

      builder.addCase(createCartItem.rejected, (state, action) => {
   
        state.error = action.payload as string
        state.loading = false 
      })

      //for deleting cart item
      builder.addCase(deleteCartItem.pending, (state) => {
        state.loading = true
      })

      builder.addCase(deleteCartItem.fulfilled, (state, action: PayloadAction<number>) => {

        const cartState = current(state).CartData
      
      const updateData =cartState.filter((item: any) => item.productId !== action.payload)
          state.CartData = updateData
          
        state.loading = false
      })

      builder.addCase(deleteCartItem.rejected, (state, action) => {
        state.error = action.payload as string
        state.loading = false
      })


      //for Increase quantity
      builder.addCase(increaseQuantityByOne.pending, (state) => {
        state.loading = true
      })

      builder.addCase(increaseQuantityByOne.fulfilled, (state, action: PayloadAction<any>) => {

        
        const cartState = current(state).CartData

        const updateData =cartState.map((item: any) => item.productId === action.payload.productId ? action.payload : item)

        state.CartData = updateData

        state.loading = false
      })

      builder.addCase(increaseQuantityByOne.rejected, (state, action) => {
        state.error = action.payload as string
        state.loading = false
      })
      
      //for decrease quantity
      builder.addCase(decreaseQuantityByOne.pending, (state) => {
        state.loading = true
      })

      builder.addCase(decreaseQuantityByOne.fulfilled, (state, action: PayloadAction<any>) => {

        
        const cartState = current(state).CartData

        const updateData =cartState.map((item: any) => item.productId === action.payload.productId ? action.payload : item)

        state.CartData = updateData

        state.loading = false
      })

      builder.addCase(decreaseQuantityByOne.rejected, (state, action) => {
        state.error = action.payload as string
        state.loading = false
      })
  },
})



export const selectCount = (state: RootState) => state.cart

export default CartSlice.reducer
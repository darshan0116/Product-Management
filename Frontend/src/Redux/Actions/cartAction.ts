import { createAsyncThunk } from "@reduxjs/toolkit"
import { getApi } from "../../apis/baseApi"

export const getCart = createAsyncThunk(
    'cart/getCart',
    async (_ , { rejectWithValue }) => {
      try {
        const { data } = await getApi('/cart/get')
    
        return data.result
      } catch (error:any) {
        
            
          return  rejectWithValue(error.response.data.errorMessage)
      }
    },
  )
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAllProducts = createAsyncThunk("product/fetchAllProducts", async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get("https://apistore.cybersoft.edu.vn/api/Product");
        return response.data.content;
    } catch (error) {
        return rejectWithValue(error.response?.data || "Lỗi khi tải sản phẩm");
    }
});

const productSlice = createSlice({
    name: "product",
    initialState: {
        productList: [],
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchAllProducts.fulfilled, (state, action) => {
            state.productList = action.payload;
        });
    },
});

export default productSlice.reducer;

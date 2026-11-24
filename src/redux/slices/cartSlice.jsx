import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cartItems: [],
    },
    reducers: {
        addToCart: (state, action) => {
            const newItem = action.payload;
            const existItem = state.cartItems.find((item) => item.id == newItem.id && item.selectedSize == newItem.selectedSize);
            if (existItem) {
                existItem.quantity += newItem.quantity;
            } else {
                state.cartItems.push(newItem);
            }
        },
        updateQuantity: (state, action) => {
            const { id, selectedSize, amount } = action.payload;
            const item = state.cartItems.find((item) => item.id == id && item.selectedSize == selectedSize);
            if (item) {
                const newQuantity = item.quantity + amount;
                if (newQuantity >= 1 && newQuantity <= 99) {
                    item.quantity = newQuantity;
                }
            }
        },
        removeFromCart: (state, action) => {
            const { id, selectedSize } = action.payload;
            state.cartItems = state.cartItems.filter((item) => !(item.id == id && item.selectedSize == selectedSize));
        },
    },
});

export const { addToCart, updateQuantity, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;

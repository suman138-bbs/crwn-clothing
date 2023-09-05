import { createContext, useReducer } from "react";
import { createAction } from '../utils/reducer/reducer.utils'
const addCartItem = (cartItems, productToAdd) => {
    const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToAdd.id);

    if (existingCartItem) {
        // console.log(existingCartItem)
        return cartItems.map((cartItem) => cartItem.id === productToAdd.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem);
    }
    
    
    return [...cartItems,{...productToAdd,quantity:1}]
    
}


const removeCartItem = (cartItems,cartItemToRemove) => {
    const existingCartItem = cartItems.find((cartItem) => cartItem.id === cartItemToRemove.id);
    if (existingCartItem.quantity ===1) {
        return cartItems.filter((cartItem) => {
            return cartItem.id !== cartItemToRemove.id;
        })
    }

    
    return cartItems.map((cartItem) => cartItem.id === cartItemToRemove.id ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem);
    


}


const deleteItem = (cartItems,cartItemToDelete) => {
    return cartItems.filter((cartItem) => {
        return cartItem.id !== cartItemToDelete.id;
    })
}



export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => { },
    cartItems: [],
    addItemToCart: () => { },
    removeItemFromCart: () => { },
    deleteItemFromCart:()=>{},
    cartCount: 0,
    cartTotal: 0
})

const CART_ACTION_TYPE = {
    SET_CART_ITEMS:'SET_CART_ITEMS',
    SET_IS_CART_OPEN: 'SET_IS_CART_OPEN',
}



const INITIAL_STATE = {
    isCartOpen: false,
     cartCount: 0,
    cartTotal: 0,
    cartItems: []
}


const cartReducer = (state, action) => {
    
    const { type, payload } = action
     switch (type) {
        case CART_ACTION_TYPE.SET_CART_ITEMS:
            return {
                ...state,...payload
             }
         case CART_ACTION_TYPE.SET_IS_CART_OPEN:
             return {
                 ...state,...payload
             }
             
        default:
            throw new Error(`unhandled type ${type} in Cart Reducer`)
    }
    
}



export const CartProvider = ({ children }) => {

    const [{cartItems,isCartOpen,cartCount,cartTotal},dispatch] = useReducer(cartReducer,INITIAL_STATE)
       
    const updateCartItemsReducer = (newCartItems) => {
        const newCartCount = newCartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)

        const newCartTotal = newCartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price, 0)
        
        dispatch(createAction(  CART_ACTION_TYPE.SET_CART_ITEMS,  { cartItems: newCartItems, cartTotal:newCartTotal,cartCount:newCartCount}))
        
    }

    const setIsCartOpen = (bool) => {
        
        dispatch(createAction(CART_ACTION_TYPE.SET_IS_CART_OPEN,{isCartOpen:bool}))
    }



    
    const addItemToCart = (productToAdd) => {
        const newCartItems = addCartItem(cartItems, productToAdd);
        // console.log(newCartItems)
        updateCartItemsReducer(newCartItems)
    }

    const removeItemFromCart = (cartItemToRemove) => {
        const newCartItems = removeCartItem(cartItems, cartItemToRemove);
        updateCartItemsReducer(newCartItems)
    }
    

    const deleteItemFromCart = (cartItemToDelete) => {
        const newCartItems = deleteItem(cartItems, cartItemToDelete)
        updateCartItemsReducer(newCartItems)
    }
    

    const value = {isCartOpen,setIsCartOpen,addItemToCart,cartItems,cartCount,removeItemFromCart,deleteItemFromCart,cartTotal}
    return <CartContext.Provider value={value}>{ children}</CartContext.Provider>
}


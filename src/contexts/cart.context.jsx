import { createContext, useState,useEffect } from "react";

const addCartItem = (cartItems, productToAdd) => {
    const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToAdd.id);

    if (existingCartItem) {
        return cartItems.map((cartItem) => cartItem.id === productToAdd.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem);
    }
    
    
    return [...cartItems,{...productToAdd,quantity:1}]
    
}

const decrementCartQuantity =  (cartItems,productTodecrement)=>{
    const existitem = cartItems.find((cartItem) => cartItem.id === productTodecrement.id)
    
    if (existitem) {
        return cartItems.map((cartItem) => {
            return cartItem.id === productTodecrement.id ? { ...cartItem, quantity:cartItem.quantity!==0?cartItem.quantity-1:cartItem.quantity=0 } : cartItem;
            
        })
    }
}



export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => { },
    cartItems: [],
    addItemToCart: () => { },
    cartCount:0
})

export const CartProvider = ({ children }) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [total, setTotal] = useState(0);
    useEffect(()=>{
        const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
        setCartCount(newCartCount)
    },[cartItems])

    
    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd));
    }

    const decrementQuantity = (productTodecrement) => {
        setCartItems(decrementCartQuantity(cartItems,productTodecrement))
    }

    const totalvalue = () => {
        const val =  cartItems.map((cartItem) => {
            return {...cartItem,price:cartItem.price*cartItem.quantity}
        })
       
       return val.reduce((sum, cartItem) => cartItem.price+sum,0)
        
    }

    useEffect(() => {
        setTotal(totalvalue);
    }, [totalvalue])
    

    // const removeItem = (item) => {
    //     return cartItems.map((cartItem) => {
    //         return car
    //     })
    // }

    const value = {isCartOpen,setIsCartOpen,addItemToCart,cartItems,cartCount,decrementQuantity,total}
    return <CartContext.Provider value={value}>{ children}</CartContext.Provider>
}


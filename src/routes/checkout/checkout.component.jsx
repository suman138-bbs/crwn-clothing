import { useContext } from "react";

import { CartContext } from "../../contexts/cart.context";
import { ProductsContext } from "../../contexts/products.context";
const CheckOut = () => {
    const { addItemToCart, cartItems } = useContext(CartContext);
    const { products } = useContext(ProductsContext);
    return <div>
        {cartItems.map((cartItem) => {
            return <div>
                <h1>{cartItem.name} and </h1>
                <img src={cartItem.imageUrl} alt="Image" />
                <span>Quantity {cartItem.quantity}</span>
                <h1 onClick={()=>addItemToCart(cartItem)} >+</h1>
                <h1 onClick={()=>addItemToCart(cartItem)} >-</h1>
                </div>
                             
        })}
         
            
    </div>
    
}


export default CheckOut;
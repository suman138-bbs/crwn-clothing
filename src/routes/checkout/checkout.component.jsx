import { useContext } from "react";

import { CartContext } from "../../contexts/cart.context";
import { ProductsContext } from "../../contexts/products.context";
const CheckOut = () => {
    const { addItemToCart, cartItems,removeItemFromCart } = useContext(CartContext);
    
    return(
    <div>
    <div style={{display:"flex"}}>
        {cartItems.map((cartItem) => {
            return <div key={cartItem.id}>
                <h2>{cartItem.name} and </h2>
                <span>Quantity {cartItem.quantity}X${cartItem.price}</span>
                <span onClick={()=>addItemToCart(cartItem)} >INC</span>
                <span onClick={()=>removeItemFromCart(cartItem)} >DRE</span>
                <img src={cartItem.imageUrl} alt="Image" />
                </div>
                             
        })}
         
          
            </div>
         </div>
    )
    
}


export default CheckOut;
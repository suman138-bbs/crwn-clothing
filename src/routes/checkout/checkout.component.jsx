import { useContext } from "react";

import { CartContext } from "../../contexts/cart.context";
import { ProductsContext } from "../../contexts/products.context";
const CheckOut = () => {
    const { addItemToCart, cartItems,decrementQuantity,total, } = useContext(CartContext);
    
    return(
    <>
    <div style={{display:"flex"}}>
        {cartItems.map((cartItem) => {
            return <div key={cartItem.id}>
                <h1>{cartItem.name} and </h1>
                <img src={cartItem.imageUrl} alt="Image" />
                <button>X</button>
                <h1 onClick={()=>addItemToCart(cartItem)} >+</h1>
                <h1 onClick={()=>decrementQuantity(cartItem)} >-</h1>
                <span>Quantity {cartItem.quantity}X${cartItem.price}</span>
                </div>
                             
        })}
         
          
            </div>
            <h1>TOTAL:{total }</h1>
        </>
    )
    
}


export default CheckOut;
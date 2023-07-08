import './cart-item.styles.scss'

const CartItem = ({cartitem}) => {
    const { name,imageUrl,price ,quantity } = cartitem;
   return (
        <div className='cart-item-container'>
           <img src={imageUrl} alt={`${name}`} />
           <div className='item-details'>
               <span className='name'>{name }</span>   
               <span>{quantity}X${ price}</span>
           </div>
        </div>
    )
}

export default CartItem;
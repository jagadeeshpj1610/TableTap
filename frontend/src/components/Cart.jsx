

const Cart = ({ CartItems }) => {
    console.log(CartItems);
    
    return (
        <div>
            {CartItems.map((cartItem) => 
                <div>
                    <h1>{cartItem.name}</h1>
                    <h1>{cartItem.price}</h1>
                    <h1>{cartItem.quantity}</h1>
                </div>
            
            )}
        </div>
    )
}

export default Cart
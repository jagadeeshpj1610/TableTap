

const Cart = ({ CartItems , updateQuantity}) => {
    console.log(CartItems);

    return (
        <div>
            {CartItems.map((cartItem) => (
                <div key={cartItem.menuItem}>
                    <h1>{cartItem.name}</h1>
                    <h1>{cartItem.price}</h1>
                    <button onClick={() => updateQuantity(cartItem.menuItem, -1)}>-</button>
                    <h1>{cartItem.quantity}</h1>
                    <button onClick={() => updateQuantity(cartItem.menuItem, 1)}>+</button>
                </div>
            ))}
        </div>
    )
}

export default Cart
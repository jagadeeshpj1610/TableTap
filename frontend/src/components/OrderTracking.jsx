const OrderTracking = ({ currentOrder }) => {
    console.log(currentOrder);
    
    return (
        <div>
            <p>{currentOrder.status}</p>
            <p>{currentOrder.totalAmount}</p>
            <p>{currentOrder.tableNumber}</p>
        </div>
    )
}

export default OrderTracking
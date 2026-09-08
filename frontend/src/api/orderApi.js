const defaultApi = "http://localhost:5000/api";

const createOrder = async ({tableNumber, orderItems}) => {
    try {
        const response = await fetch(`${defaultApi}/orders`, {
            method:"POST",
            headers:{"Content-type" : "application/json"},
            body:JSON.stringify({
                tableNumber : tableNumber,
                items : orderItems
            })
        })
        const data = await response.json()
        console.log("order placed with this dat :", data);
        
    } catch (error) {
        console.error("failed to plcae the order : ",error);
        
    }
}
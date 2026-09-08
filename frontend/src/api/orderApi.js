const defaultApi = "http://localhost:5000/api";

const createOrder = async (tableNumber, orderItems) => {
    try {
        const response = await fetch(`${defaultApi}/orders`, {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({
                tableNumber: tableNumber,
                items: orderItems
            })
        })
        const data = await response.json()
        console.log("order placed with this data :", data);
        return data

    } catch (error) {
        console.error("failed to plcae the order : ", error);

    }
}

const getAllOrders = async () => {
    try {
        const response = await fetch(`${defaultApi}/orders`)
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("failed to fetch the orders :", error);
    }
}

const getOrderById = async (id) => {
    try {
        const response = await fetch(`${defaultApi}/orders/${id}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("failed to fetch the order:", error);
    }
};

const getOrderBill = async (id) => {
    try {
        const response = await fetch(`${defaultApi}/orders/${id}/bill`)
        const data = await response.json();
        console.log("bill is fetched", data);
        return data
    } catch (error) {
        console.error("get the order bill was failed : ", error);
    }
}

export { createOrder, getOrderById, getOrderBill, getAllOrders }
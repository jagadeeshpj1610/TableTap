const defaultApi = "http://localhost:5000/api";

const createWaiterCall = async (tableNumber) => {
    try {
        const response = await fetch(`${defaultApi}/waiter-call/call`,{
            method: "POST",
            headers : {"content-type" : "application/json"},
            body : JSON.stringify({
                tableNumber : tableNumber
            })
        })
        const data = await response.json()
        console.log(data);
        return data
        
    } catch (error) {
        console.error("failed to create a waiter call:", error);
        
    }
}

const getAllWaiterCalls = async() => {
    try {
        const response = await fetch(`${defaultApi}/waiter-call`)
        const data = await response.json();
        return data
    } catch (error) {
        console.error("failed to failed the wauter-calls", error);
    }
}

const resolveWaiterCall = async(id) => {
    try {
        const response = await fetch(`${defaultApi}/waiter-call/${id}/resolve`,{
            method : "PATCH"
        })
        const data = await response.json();
        return data
    } catch (error) {
        console.error("failed to resolve the waiter call", error);
    }
}

export {createWaiterCall, getAllWaiterCalls, resolveWaiterCall}
const defaultApi = "http://localhost:5000/api";


const getMenu = async () => {
    try {
        const response = await fetch(`${defaultApi}/menu`)
        const fetchedData = await response.json();
        return fetchedData;
    } catch (error) {
        console.error("failed to fetch the menu:", error.message);

    }
}

const createMenuItem = async (formData) => {
    try {
        const response = await fetch(`${defaultApi}/menu`, {
            method: "POST",
            headers: { "content-type" : "application/json"},
            body: JSON.stringify(formData)
        })
        const data = await response.json()
        return data
    } catch (error) {
        console.error("failed to create the menu : ", error);

    }
}

const updateMenuItem = async (id, formData) => {
    try {
        const response = await fetch(`${defaultApi}/menu/${id}`,{
            method:"PUT",
            headers:{"content-type" : "application/json"},
            body:JSON.stringify(formData)
        })
        const data = await response.json();
        return data
    } catch (error) {
        console.error("failed to update the menu item : ", error);
    }
}

export { getMenu, createMenuItem, updateMenuItem }
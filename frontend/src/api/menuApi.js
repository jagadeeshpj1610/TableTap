import { authHeader } from "../utils/auth"

const defaultApi = import.meta.env.VITE_API_URL;

const getMenu = async () => {
    try {
        const response = await fetch(`${defaultApi}/menu`)
        return await response.json();
    } catch (error) {
        console.error("failed to fetch the menu:", error.message);
    }
}

const createMenuItem = async (formData) => {
    try {
        const response = await fetch(`${defaultApi}/menu`, {
            method: "POST",
            headers: { "content-type": "application/json", ...authHeader() },
            body: JSON.stringify(formData)
        })
        return await response.json()
    } catch (error) {
        console.error("failed to create the menu : ", error);
    }
}

const updateMenuItem = async (id, formData) => {
    try {
        const response = await fetch(`${defaultApi}/menu/${id}`, {
            method: "PUT",
            headers: { "content-type": "application/json", ...authHeader() },
            body: JSON.stringify(formData)
        })
        return await response.json();
    } catch (error) {
        console.error("failed to update the menu item : ", error);
    }
}

const deleteMenuItem = async (id) => {
    try {
        const response = await fetch(`${defaultApi}/menu/${id}`, {
            method: "DELETE",
            headers: { ...authHeader() }
        });
        return await response.json();
    } catch (error) {
        console.error("failed to delete the item : ", error);
    }
};

export { getMenu, createMenuItem, updateMenuItem, deleteMenuItem }
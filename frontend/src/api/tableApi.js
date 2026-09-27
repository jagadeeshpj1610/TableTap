import { authHeader } from "../utils/auth"

const defaultApi = import.meta.env.VITE_API_URL;

const getAllTables = async () => {
    try {
        const response = await fetch(`${defaultApi}/api/tables`);
        return await response.json();
    } catch (error) {
        console.error("failed to fetch tables:", error);
    }
};

const createTable = async (tableNumber, qrCodeId) => {
    try {
        const response = await fetch(`${defaultApi}/api/tables/create`, {
            method: "POST",
            headers: { "Content-type": "application/json", ...authHeader() },
            body: JSON.stringify({ tableNumber, qrCodeId })
        });
        return await response.json();
    } catch (error) {
        console.error("failed to create table:", error);
    }
};

export { createTable, getAllTables }
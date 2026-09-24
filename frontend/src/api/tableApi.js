const defaultApi = "http://localhost:5000/api";

const getAllTables = async () => {
    try {
        const response = await fetch(`${defaultApi}/tables`); 
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("failed to fetch tables:", error);
    }
};

const createTable = async (tableNumber, qrCodeId) => {
    try {
        const response = await fetch(`${defaultApi}/tables/create`, {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({ tableNumber, qrCodeId })
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("failed to create table:", error);
    }
};


export {createTable, getAllTables}
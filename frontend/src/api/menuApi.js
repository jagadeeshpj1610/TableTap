const defaultApi = "http://localhost:5000/api";


const getMenu = async () => {
    try {
        const response = await fetch(`${defaultApi}/menu`)
        const fetchedData = await data.json();
        console.log(fetchedData);
        return fetchedData;
    } catch (error) {
        console.error("failed to fetch the menu:", error.message);

    }
}
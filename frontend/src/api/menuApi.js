const defaultApi = "http://localhost:5000/api";


const getMenu = async () => {
    try {
        const response = await fetch(`${defaultApi}/menu`)
        console.log(response);
        const fetchedData = await response.json();
        // console.log(fetchedData);
        return fetchedData;
    } catch (error) {
        console.error("failed to fetch the menu:", error.message);

    }
}

export default getMenu
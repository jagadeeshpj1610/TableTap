import { useState, useEffect } from "react"
import { getAllTables, createTable } from "../api/tableApi"

const AdminTableManagement = () => {
    const [tables, setTables] = useState([])
    const [newTableNumber, setNewTableNumber] = useState("")

    useEffect(() => {
        const fetchData = async () => {
            const data = await getAllTables()
            setTables(data)
        };
        fetchData()
    }, [])

    const handleAddTable = async () => {
        const result = await createTable(newTableNumber, `table-${newTableNumber}`);
        setTables([...tables, result.newOne]);
        setNewTableNumber("");
    };

    return (
        <div>
            <input 
                type="number" 
                placeholder="Table number"
                value={newTableNumber}
                onChange={(e) => setNewTableNumber(e.target.value)}
            />
            <button onClick={handleAddTable}>Add Table</button>

            {tables.map((table) => (
                <div key={table._id}>
                    <p>Table {table.tableNumber}</p>
                    <p>{table.status}</p>
                </div>
            ))}
        </div>
    )
}

export default AdminTableManagement
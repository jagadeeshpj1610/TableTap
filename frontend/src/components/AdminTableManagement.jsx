import { useState, useEffect } from "react"
import { getAllTables, createTable } from "../api/tableApi"
import { QRCodeSVG } from "qrcode.react";

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
        <div className="p-6 max-w-4xl mx-auto">
            <h1 className="font-[Fraunces] text-2xl font-semibold text-[#1A1A1A] mb-6">Table Management</h1>

            <div className="bg-white rounded-xl p-5 mb-6 shadow-sm flex gap-3 items-end max-w-sm">
                <div className="flex-1">
                    <label className="text-xs text-[#767676] block mb-1">Table Number</label>
                    <input
                        type="number"
                        placeholder="e.g. 6"
                        value={newTableNumber}
                        onChange={(e) => setNewTableNumber(e.target.value)}
                        className="w-full border border-neutral-200 rounded-lg px-3 py-2 text-sm"
                    />
                </div>
                <button onClick={handleAddTable} className="bg-[#8B2635] text-white px-5 py-2 rounded-full text-sm font-medium">
                    Add Table
                </button>
            </div>

            <div className="grid grid-cols-4 gap-4">
                {tables.map((table) => (
                    <div key={table._id} className="bg-white rounded-xl p-4 shadow-sm text-center">
                        <p className="font-[Fraunces] text-2xl font-bold text-[#1A1A1A]">{table.tableNumber}</p>
                        <span className={`text-xs px-2 py-1 rounded-full mt-2 inline-block ${table.status === "available" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}`}>
                            {table.status}
                        </span>
                        <div className="mt-3 flex justify-center">
                            <QRCodeSVG value={`http://localhost:5173/?table=${table.tableNumber}`} size={120} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default AdminTableManagement
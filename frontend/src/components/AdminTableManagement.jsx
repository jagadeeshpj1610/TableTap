import { useState, useEffect, useRef } from "react"
import { getAllTables, createTable } from "../api/tableApi"
import { QRCodeSVG } from "qrcode.react"
import { FiDownload, FiPrinter, FiPlus } from "react-icons/fi"
import toast from "react-hot-toast"

const AdminTableManagement = () => {
    const [tables, setTables] = useState([])
    const [newTableNumber, setNewTableNumber] = useState("")
    const [loading, setLoading] = useState(true)
    const qrRefs = useRef({})

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getAllTables()
                setTables(data)
            } catch (err) {
                toast.error("Failed to load tables")
            } finally {
                setLoading(false)
            }
        };
        fetchData()
    }, [])

    const handleAddTable = async () => {
        try {
            const result = await createTable(newTableNumber, `table-${newTableNumber}`);
            setTables([...tables, result.newOne]);
            setNewTableNumber("");
            toast.success(`Table ${newTableNumber} added`);
        } catch (err) {
            toast.error("Failed to add table");
        }
    };

    const getQrPngDataUrl = (tableId) => {
        const container = qrRefs.current[tableId]
        const svgEl = container?.querySelector("svg")
        if (!svgEl) return null

        const svgData = new XMLSerializer().serializeToString(svgEl)
        const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" })
        const url = URL.createObjectURL(svgBlob)

        return new Promise((resolve) => {
            const img = new Image()
            img.onload = () => {
                const canvas = document.createElement("canvas")
                const scale = 4
                canvas.width = img.width * scale
                canvas.height = img.height * scale
                const ctx = canvas.getContext("2d")
                ctx.fillStyle = "#ffffff"
                ctx.fillRect(0, 0, canvas.width, canvas.height)
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
                URL.revokeObjectURL(url)
                resolve(canvas.toDataURL("image/png"))
            }
            img.src = url
        })
    }

    const handleDownload = async (table) => {
        try {
            const dataUrl = await getQrPngDataUrl(table._id)
            if (!dataUrl) {
                toast.error("Could not generate QR code")
                return
            }
            const link = document.createElement("a")
            link.href = dataUrl
            link.download = `table-${table.tableNumber}-qr.png`
            link.click()
            toast.success("QR code downloaded")
        } catch (err) {
            toast.error("Failed to download QR code")
        }
    }

    const handlePrint = async (table) => {
        try {
            const dataUrl = await getQrPngDataUrl(table._id)
            if (!dataUrl) {
                toast.error("Could not generate QR code")
                return
            }
            const printWindow = window.open("", "_blank", "width=400,height=500")
            printWindow.document.write(`
                <html>
                    <head>
                        <title>Table ${table.tableNumber} QR</title>
                        <style>
                            body { display:flex; flex-direction:column; align-items:center; justify-content:center; height:100vh; margin:0; font-family: Poppins, sans-serif; }
                            img { width:280px; height:280px; }
                            p { font-size:20px; font-weight:700; color:#1A1A1A; margin-top:16px; }
                        </style>
                    </head>
                    <body>
                        <img src="${dataUrl}" onload="window.print(); window.onafterprint = () => window.close();" />
                        <p>Table ${table.tableNumber}</p>
                    </body>
                </html>
            `)
            printWindow.document.close()
        } catch (err) {
            toast.error("Failed to open print window")
        }
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8">
            <div className="mb-8">
                <h1 className="font-[Poppins] font-extrabold text-2xl sm:text-3xl text-[#1A1A1A] tracking-tight">
                    Tables & QR
                </h1>
                <p className="font-[Poppins] text-sm text-[#767676] mt-1">
                    Manage tables and print QR codes for each
                </p>
            </div>

            <div className="bg-white rounded-2xl p-5 sm:p-6 mb-8 shadow-sm flex gap-3 items-end max-w-sm">
                <div className="flex-1">
                    <label className="font-[Poppins] text-xs font-medium text-[#767676] block mb-1.5">
                        Table Number
                    </label>
                    <input
                        type="number"
                        placeholder="e.g. 6"
                        value={newTableNumber}
                        onChange={(e) => setNewTableNumber(e.target.value)}
                        className="font-[Poppins] w-full border border-stone-300 rounded-xl px-3 py-2.5 text-sm text-[#1A1A1A] focus:outline-none focus:ring-2 focus:ring-[#2D5F3E]"
                    />
                </div>
                <button
                    onClick={handleAddTable}
                    className="font-[Poppins] font-bold flex items-center gap-1.5 bg-[#2D5F3E] hover:bg-[#244c32] text-white px-5 py-2.5 rounded-full text-sm cursor-pointer transition-colors shrink-0"
                >
                    <FiPlus size={15} />
                    Add Table
                </button>
            </div>

            {loading ? (
                <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <div key={i} className="bg-white rounded-2xl border border-stone-200 p-4 flex flex-col items-center gap-3 animate-pulse">
                            <div className="h-8 w-10 bg-stone-200 rounded" />
                            <div className="h-5 w-16 bg-stone-200 rounded-full" />
                            <div className="w-[120px] h-[120px] bg-stone-200 rounded-xl" />
                            <div className="flex gap-2 w-full">
                                <div className="h-8 flex-1 bg-stone-200 rounded-full" />
                                <div className="h-8 flex-1 bg-stone-200 rounded-full" />
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
                    {tables.map((table) => (
                        <div
                            key={table._id}
                            className="bg-white rounded-2xl border border-stone-200 p-4 shadow-sm flex flex-col items-center text-center gap-3"
                        >
                            <div>
                                <p className="font-[Poppins] text-2xl font-extrabold text-[#1A1A1A]">
                                    {table.tableNumber}
                                </p>
                                <span
                                    className={`font-[Poppins] mt-1.5 inline-block px-2.5 py-1 rounded-full text-xs font-semibold capitalize ring-1 ring-inset ${table.status === "available"
                                        ? "bg-green-50 text-[#2D5F3E] ring-green-200"
                                        : "bg-amber-50 text-amber-700 ring-amber-200"
                                        }`}
                                >
                                    {table.status}
                                </span>
                            </div>

                            <div
                                ref={(el) => (qrRefs.current[table._id] = el)}
                                className="p-2 bg-white rounded-xl border border-stone-100"
                            >
                                <QRCodeSVG
                                    value={`${import.meta.env.VITE_CUSTOMER_URL}/?table=${table.tableNumber}`}
                                    size={120}
                                />
                            </div>

                            <div className="flex gap-2 w-full">
                                <button
                                    onClick={() => handleDownload(table)}
                                    className="font-[Poppins] font-semibold flex-1 flex items-center justify-center gap-1.5 text-xs border border-stone-300 text-[#1A1A1A] px-3 py-2 rounded-full cursor-pointer hover:bg-stone-50 transition-colors"
                                >
                                    <FiDownload size={13} />
                                    Save
                                </button>
                                <button
                                    onClick={() => handlePrint(table)}
                                    className="font-[Poppins] font-semibold flex-1 flex items-center justify-center gap-1.5 text-xs bg-[#2D5F3E] hover:bg-[#244c32] text-white px-3 py-2 rounded-full cursor-pointer transition-colors"
                                >
                                    <FiPrinter size={13} />
                                    Print
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default AdminTableManagement
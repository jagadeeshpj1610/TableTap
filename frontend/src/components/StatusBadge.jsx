const StatusBadge = ({ status, styleMap, fallback = "" }) => {
    return (
        <span
            className={`font-[Poppins] px-2.5 py-1 rounded-full text-xs font-semibold capitalize ring-1 ring-inset ${styleMap[status] || fallback}`}
        >
            {status}
        </span>
    );
};

export default StatusBadge;
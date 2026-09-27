const BillBreakdown = ({ bill }) => {
    if (!bill) return null;

    return (
        <div className="bg-[#FAF7F2] rounded-xl p-3 text-sm font-[Poppins] space-y-1.5">
            <div className="flex justify-between text-[#767676]">
                <span>Subtotal</span>
                <span>₹{bill.subTotal}</span>
            </div>
            <div className="flex justify-between text-[#767676]">
                <span>Tax</span>
                <span>₹{bill.tax}</span>
            </div>
            <div className="flex justify-between text-[#767676]">
                <span>Service Charge</span>
                <span>₹{bill.serviceCharge}</span>
            </div>
            <div className="flex justify-between font-bold text-[#1A1A1A] border-t border-stone-200 pt-1.5">
                <span>Total</span>
                <span>₹{bill.total}</span>
            </div>
        </div>
    );
};

export default BillBreakdown;
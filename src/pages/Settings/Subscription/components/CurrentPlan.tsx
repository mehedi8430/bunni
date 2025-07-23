
export default function CurrentPlan() {
    return (
        <div className="relative bg-white rounded-lg p-6 w-full border border-primary">
            {/* Current Plan Badge */}
            <div className="absolute -top-5 left-4 bg-primary text-white text-sm font-normal px-4 py-2 rounded-full shadow-sm">
                Current Plan
            </div>

            <div className="flex justify-between items-start mt-4">
                <div>
                    <h2 className="text-xl md:text-2xl lg:text-3xl font-normal text-foreground">Pro Plan</h2>
                    <p className="text-foreground text-sm md:text-lg lg:text-lg mt-1.5">€9.99/month</p>
                </div>
                <button className="px-6 py-2.5 text-base font-normal text-gray-700 bg-white border border-border rounded-md cursor-pointer">
                    Cancel plan
                </button>
            </div>

            <div className="mt-4 text-foreground text-sm md:text-base flex items-center space-x-2">
                <span>Start Date : 5/22/2025</span>
                <span className="w-2 h-2 bg-foreground/40 rounded-full"></span> {/* Dot separator */}
                <span>End Date : 5/22/2026</span>
            </div>
        </div>
    )
}

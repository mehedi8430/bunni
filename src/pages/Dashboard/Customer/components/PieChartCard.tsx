import { useState, useMemo, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { icons } from '@/lib/imageProvider';
import { ReactSVG } from 'react-svg';

// Define the interface for a single Customer object
interface Customer {
    id: number;
    name: string;
    amount: number;
    date: string; // Date string in 'YYYY-MM-DD' format
}

// Define the interface for the App component's props
interface PieChartCardProps {
    customerData?: Customer[]; // customerData is an optional array of Customer objects
    title?: string; // Optional title for the chart
}

// Define custom colors for the pie chart segments
const COLORS: string[] = ['#38988a', '#e7854d', '#363b54', '#f96d6d', '#6B7280', '#10B981'];

// Helper function to format currency
const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(amount);
};

export default function PieChartCard({ customerData = [], title }: PieChartCardProps) {

    // Extract unique dates from the provided customerData
    const uniqueDates: string[] = useMemo(() => {
        const dates = new Set(customerData.map(customer => customer.date));
        return Array.from(dates).sort();
    }, [customerData]);

    // State to hold the currently selected date
    const [selectedDate, setSelectedDate] = useState<Date | null>(null); // Can be a Date object or null

    // Effect to set the default selected date when customerData changes or on initial load
    useEffect(() => {
        if (customerData.length > 0 && !selectedDate) {
            const today = new Date();
            const formattedToday = format(today, 'yyyy-MM-dd');

            // Check if there's data for today's date
            const hasDataForToday = customerData.some(customer => customer.date === formattedToday);

            if (hasDataForToday) {
                setSelectedDate(today);
            } else if (uniqueDates.length > 0) {
                // If no data for today, default to the first unique date available
                setSelectedDate(new Date(uniqueDates[0]));
            } else {
                // If no data at all, set to null
                setSelectedDate(null);
            }
        } else if (customerData.length === 0) {
            // Clear selected date if no data is present
            setSelectedDate(null);
        }
    }, [customerData, uniqueDates, selectedDate]); // Added customerData to dependencies

    // State to control the calendar popover's open/close state
    const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false);

    // Filter and sort customers based on the selected date to get the top 4
    const filteredCustomers: Customer[] = useMemo(() => {
        // Format the selected date to match the string format in customerData
        const formattedSelectedDate: string = selectedDate ? format(selectedDate, 'yyyy-MM-dd') : '';

        const customersForDate = customerData.filter(
            (customer: Customer) => customer.date === formattedSelectedDate
        );
        // Sort by amount in descending order and take the top 4
        return customersForDate.sort((a, b) => b.amount - a.amount).slice(0, 4);
    }, [selectedDate, customerData]);

    // Calculate the total amount for the filtered customers
    const totalAmount: number = useMemo(() => {
        return filteredCustomers.reduce((sum: number, customer: Customer) => sum + customer.amount, 0);
    }, [filteredCustomers]);

    // Prepare data for the PieChart
    const pieChartData = filteredCustomers.map((customer: Customer) => ({
        name: customer.name,
        value: customer.amount,
    }));

    return (
        <div className="w-full">
            {/* Header section with title and date picker */}
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold text-foreground">{title}</h2>
                <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
                    <PopoverTrigger asChild>
                        <Button
                            variant={"outline"}
                            className=" font-normal rounded-lg bg-white border-sidebar-border cursor-pointer"
                        >
                            <ReactSVG src={icons.calender} className="mr-2 h-4 w-4" />
                            {selectedDate ? format(selectedDate, "PPP") : <span>Select date</span>}
                            <ReactSVG src={icons.arrowDown} className="ml-auto h-4 w-4" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                        <Calendar
                            mode="single"
                            selected={selectedDate ?? undefined} // Pass undefined if selectedDate is null
                            onSelect={(date: Date | undefined) => { // date can be undefined if cleared
                                if (date) {
                                    setSelectedDate(date);
                                } else {
                                    setSelectedDate(null);
                                }
                                setIsCalendarOpen(false); // Close the calendar when a date is selected
                            }}
                            initialFocus
                        />
                    </PopoverContent>
                </Popover>
            </div>

            {/* Chart and customer list section */}
            <div className="flex flex-col md:flex-row items-center   gap-8">
                {/* Pie Chart section */}
                <div className="w-full md:w-1/3 flex relative h-64">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={pieChartData}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={90}
                                fill="#8884d8"
                                paddingAngle={5}
                                dataKey="value"
                                labelLine={false}
                            >
                                {pieChartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                    {/* Total amount display in the center of the pie chart */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center shadow-[0_0_20px_5px_rgba(0,0,0,0.2)] h-24 w-24 rounded-full flex  flex-col items-center justify-center">
                        <div className="text-lg font-semibold text-foreground01">
                            {formatCurrency(totalAmount / 1000000)}M
                        </div>
                        <div className="text-lg text-foreground01/50 font-semibold">Total</div>
                    </div>
                </div>

                {/* Customer list section */}
                <div className="w-full md:w-2/3">
                    <ul className="space-y-6">
                        {filteredCustomers.length > 0 ? (
                            filteredCustomers.map((customer: Customer, index: number) => (
                                <li key={customer.id} className="flex justify-between items-center text-lg">
                                    <div className="flex items-center">
                                        {/* Color indicator for the customer */}
                                        <span
                                            className="inline-block w-3 h-3 rounded-full mr-3"
                                            style={{ backgroundColor: COLORS[index % COLORS.length] }}
                                        ></span>
                                        <span className="text-foreground01/50">{customer.name}</span>
                                    </div>
                                    <span className="text-foreground01">
                                        {formatCurrency(customer.amount)}
                                    </span>
                                </li>
                            ))
                        ) : (
                            <li className="text-gray-500 text-center py-4">No top customers for this date.</li>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    )
}

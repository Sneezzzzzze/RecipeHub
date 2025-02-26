"use client";

type DropdownProps = {
    label: string;
    options: string[];
    value: string;
    onChange: (value: string) => void;
};

const Dropdown = ({ label, options, value, onChange }: DropdownProps) => {
    return (
        <div className="mb-4">
            <label className="block text-lg font-medium text-gray-700">{label}</label>
            <select
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                value={value}
                onChange={(e) => onChange(e.target.value)}
            >
                <option value="">Select {label}</option>
                {options.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Dropdown;

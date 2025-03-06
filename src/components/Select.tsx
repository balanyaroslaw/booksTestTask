import { useState } from 'react';

type SelectProps<T> = {
    options: T[];
    optiontext?: string;
    onSelect: (selected: T) => void;
};

function Select<T>({ options, onSelect}: SelectProps<T>) {
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState<T>(options[0]);

    const displayOption = (option:T):string =>{
        return new String(option).toString();
    }

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleSelect = (option: T) => {
        setSelected(option);
        onSelect(option); 
        setIsOpen(false);
    };

    return (
        <div className="relative inline-block text-left">
            <button 
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 
                font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center" 
                type="button" 
                onClick={toggleMenu}>
                {displayOption(selected)} <span className='ml-5'>&#9661;</span>
            </button>

            {isOpen && (
                <div className="absolute z-10 bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 mt-2">
                    <ul className="py-2 text-sm text-gray-700">
                        {options.map((option) => (
                            <li key={displayOption(option)}>
                                <button
                                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                                    onClick={() => handleSelect(option)}
                                >
                                    {displayOption(option)}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default Select;

type ToggleProps = {
    isActive: boolean;
    handleToggle: () => void;
}

function Toggle({ isActive, handleToggle }:ToggleProps){
    return (
        <label className="inline-flex items-center cursor-pointer">
            <input 
                type="checkbox" 
                className="sr-only peer" 
                checked={isActive} 
                onChange={handleToggle} 
            />
            <div className={`relative w-12 h-6 ${isActive ? 'bg-green-400' : 'bg-gray-300'} rounded-full`}>
                <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-all 
                    ${isActive ? 'translate-x-6 bg-green-300' : ''}`}></div>
            </div>
            <span className="ml-3 text-sm font-medium text-gray-900">Active</span>
        </label>
    );
}

export default Toggle;

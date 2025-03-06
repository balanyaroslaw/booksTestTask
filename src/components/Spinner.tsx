
function Spinner() {
    return (
      <div className="flex justify-center items-center space-x-2">
        <div className="w-8 h-8 border-4 border-t-transparent border-blue-500 border-solid rounded-full animate-spin"></div>
        <span className="text-gray-500">Loading...</span>
      </div>
    );
  }
  
  export default Spinner;
  
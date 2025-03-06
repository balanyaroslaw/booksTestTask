import { useNavigate } from 'react-router-dom';
type ActionMessageProps = {
    text:string,
    onClose?: () => void;
}
function ActionMessage({text}:ActionMessageProps) {  
    const navigate = useNavigate();
    return (
        <div className='max-w-85 fixed flex flex-col justify-center items-center top-5 bg-gray-300 text-white p-5 rounded-lg shadow-md'>
            {text}
            <div className='w-32 flex bg-green-500 items-center justify-center rounded-md mt-5' onClick={()=>navigate('/')}>
                <span className='font-bold text-center'>Ok</span>
            </div>
        </div> 
    )
}

export default ActionMessage
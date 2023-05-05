import React, { useEffect } from "react";
import { download } from "../commonFunctions";
import  {useNavigate} from 'react-router-dom';

const ResultsDownload = () => {
    const navigate = useNavigate();
    useEffect(()=>{
        download('results.txt', localStorage.getItem('results'));
        navigate("/", { replace: true })
    },[]);
    return(
        <div>
            hello from download            
        </div>
    )
}
export default ResultsDownload;
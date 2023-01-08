import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";


const ChangePassword = () => {
    const location = useLocation();
    const navigate = useNavigate();
    useEffect(() => {
        if(location.state== null){
            navigate("/");
        }
    })
    console.log(location.state);
    return <div>{location.state}</div>
}
export default ChangePassword;
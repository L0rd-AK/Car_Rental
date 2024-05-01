import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";




const PrivateRoute = ({children}) => {
const location = useLocation()
const {user,loading}=useAuth()
if (loading) {
return <h1 className="text-4lx font-semibold">loading...</h1>;
}
if (user) {
    return children;
}

    return <Navigate to="/login" state={location.pathname} replace></Navigate>
};

export default PrivateRoute;
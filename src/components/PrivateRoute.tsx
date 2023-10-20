import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

interface Props {
    children: JSX.Element
}

function PrivateRoute({ children }: Props) {
    const { authToken } = useSelector((state: any) => state.authentication);
    const location = useLocation();

    return authToken ? (
        children
    ) : (
        <Navigate to="/login" state={{ from: location }} replace />
    );
}

export { PrivateRoute };

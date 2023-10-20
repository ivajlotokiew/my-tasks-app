import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../features/authentication/authenticationSlice";
import { useEffect } from "react";

function LoginForm() {
    const [loginData, setLoginData] = useState({ username: "", password: "" });
    const [errorData, setErrorData] = useState(false);
    const [show, setShow] = useState(false);
    const handleClick = () => setShow(!show);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { authToken } = useSelector((state: any) => state.authentication);
    const location = useLocation();

    useEffect(() => {
        authToken &&
            navigate(location?.state?.from?.pathname || "/", { replace: true });
    }, [authToken, location?.state?.from?.pathname, navigate]);

    const loginHandler = (e: any) => {
        e.preventDefault();
        if (e && e.target.innerText === "Log In as Guest") {
            setLoginData({
                username: "iv4o",
                password: "iv4o1234",
            });
            dispatch(loginUser({ username: "iv4o", password: "iv4o123" })
            );
        } else {
            if (loginData.username.trim() === "" || loginData.password.trim() === "")
                console.error("Incorrect username or password");
            else
                dispatch(
                    loginUser({
                        username: loginData.username,
                        password: loginData.password,
                    })
                );
        }
    };

    return (
        <form style={{ width: "100%" }} onSubmit={loginHandler} noValidate>
            <h3>Username</h3>
            <input
                placeholder="Enter username"
                value={loginData.username}
                onChange={(e) =>
                    setLoginData({ ...loginData, username: e.target.value })
                }
                onFocus={() => setErrorData(false)}
            />

            <input
                placeholder="Enter password"
                type={show ? "text" : "password"}
                value={loginData.password}
                onChange={(e) =>
                    setLoginData({ ...loginData, password: e.target.value })
                }
                onFocus={() => setErrorData(false)}
            />
            <button
                onClick={handleClick}
            >
                click
            </button>
            <button type="submit" >
                Log In
            </button>
            <button
                onClick={(e) => loginHandler(e)}
            >
                Log In as Guest
            </button>
        </form>
    );
}

export { LoginForm };

import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../features/authentication/authenticationSlice";
import { useEffect } from "react";
import styles from "./LoginForm.module.css"
import CustomButton from "../common/CustomButton/CustomButton";

function LoginForm() {
    const [loginData, setLoginData] = useState({ username: "", password: "" });
    const [errorData, setErrorData] = useState(false);
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
            dispatch(loginUser({ username: "iv4o", password: "iv4o" })
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
        <>
            <div className={styles.background}>
                <div className={styles.shape}></div>
                <div className={styles.shape}></div>
            </div>
            <form className={styles.loginForm} onSubmit={loginHandler} noValidate>
                <h3>Login Here</h3>

                <label htmlFor="username">Username</label>
                <input
                    id="username"
                    placeholder="Enter username"
                    value={loginData.username}
                    onChange={(e) =>
                        setLoginData({ ...loginData, username: e.target.value })
                    }
                    onFocus={() => setErrorData(false)}
                />

                <label htmlFor="password">Password</label>
                <input
                    id="password"
                    type="password"
                    placeholder="Enter password"
                    value={loginData.password}
                    onChange={(e) =>
                        setLoginData({ ...loginData, password: e.target.value })
                    }
                    onFocus={() => setErrorData(false)}
                />

                <CustomButton style={{ backgroundColor: "rgb(91, 33, 182)" }} type="submit" >Log In</CustomButton>
                <CustomButton style={{ backgroundColor: "#f43f5e" }}
                    onClick={(e) => loginHandler(e)}
                >
                    Log In as Guest
                </CustomButton>
            </form>
        </>
    );
}

export { LoginForm };

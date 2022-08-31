import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import authApi from "../auth-api";
import "../styles/login-style.scss";

function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const location = useLocation();
    const isLogin = location.pathname === '/login';
    const navigate = useNavigate();

    const login = async () => {
        if(isLogin) {
            await authApi.login({ username, password });
        } else {
            await authApi.registration({ username, password });
        }
        navigate("/");
        navigate(0);
    }

    return (
        <div className="login-page">
            <div className="login-wrap">
                <h1>
                    {isLogin ? "Login" : "Signup"}
                </h1>
                <div className="credentials">
                    <input type="text" placeholder="Username" value={username} onChange={(event) => setUsername(event.target.value)} />
                    <input type="text" placeholder="Password" value={password} onChange={(event) => setPassword(event.target.value)} />
                </div>
                <button onClick={() => login()}>{isLogin ? "Log in" : "Sign up"}</button>
                <p>{isLogin ? "If you don't have an account " : "If you already have an account "}
                    <Link to={isLogin ? "/registration" : "/login"}>{isLogin ? "Signup" : "Login"}</Link>
                </p>
            </div>
        </div>
    )
}

export default LoginPage;
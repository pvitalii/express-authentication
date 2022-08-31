import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import authApi from "../auth-api";
import "../styles/home-style.scss"

function HomePage() {
    const [user, setUser] = useState({_id: "", username: ""});

    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            const user = await authApi.getProfile();
            setUser(user)
        }
        fetchUser().then()
    }, [])

    const logout = async() => {
        await authApi.logout();
        navigate("/login");
        navigate(0);
    }
    
    return (
        <div className="home-page">
            <div className="content-wrap">
                <h1>Hello!</h1>
                <h3>You are authenticated as:</h3>
                <p>Id: {user._id}</p>
                <p>Username: {user.username}</p>
                <button onClick={() => logout()}>Logout</button>
            </div>
        </div>
    )
}

export default HomePage;
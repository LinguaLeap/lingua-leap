import { useParams } from "react-router-dom";

function TokenGet() {
    const { token } = useParams();
    localStorage.setItem("token", "Bearer " + token);
    return <div>Token is got. Form here</div>;
}

export default TokenGet;

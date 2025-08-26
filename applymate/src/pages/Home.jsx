import Login from "./Auth/Login";
import Register from "./Auth/Register";

export default function Home(){
return(
<div>
    <h1>Welcome to ApplyMate, where you can track your job applications!</h1>
<p>Register to create your account or log in if you already have one.</p>
    <Register/>
    <Login/>
</div>

);
}
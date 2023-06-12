import Login from "../login/Login";
import Register from "../register/Register";
import "./User.css";

const User = () => {
  return (
    <main className="user">
      <Register />
      <Login />
    </main>
  );
};

export default User;

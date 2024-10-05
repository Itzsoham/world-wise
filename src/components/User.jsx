import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/FakeAuthContext";
import styles from "./User.module.css";

// const FAKE_USER = {
//   name: "Jack",
//   email: "jack@example.com",
//   password: "qwerty",
//   avatar: "https://i.pravatar.cc/100?u=zz",
// };

function User() {
  // const currentUser = FAKE_USER;

  const { users, logout } = useAuth();
  const navigate = useNavigate();

  function handleClick() {
    // currentusers = users;

    logout();
    navigate("/");
  }

  return (
    <div className={styles.user}>
      <img src={users.avatar} alt={users.name} />
      <span>Welcome, {users.name}</span>
      <button onClick={handleClick}>Logout</button>
    </div>
  );
}

export default User;

import { useState } from "react";
import UserForm from "../components/user/user.form";
import UserTable from "../components/user/user.table";

const UsersPage = () => {
  const [newUser, setNewUser] = useState(null);
  const [reloadCount, setReloadCount] = useState(0);

  const handleUserCreated = (user) => {
    setNewUser(user); // ✅ Thêm user mới vào đầu danh sách
    setReloadCount((prev) => prev + 1); // ✅ Reload lại danh sách từ API
  };

  return (
    <div style={{ padding: "20px" }}>
      <UserForm onUserCreated={handleUserCreated} />
      <UserTable
        newUser={newUser}
        triggerReload={reloadCount}
        onUserCreated={handleUserCreated}
      />
    </div>
  );
};

export default UsersPage;
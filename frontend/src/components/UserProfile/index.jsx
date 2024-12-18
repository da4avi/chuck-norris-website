import React, { useState, useEffect, useContext } from "react";
import { getUser, updateUser, deleteUser } from "../../api/user";
import { useNavigate } from "react-router-dom";
import Form from "../General/Form";
import Input from "../General/Input";
import Button from "../General/Button";
import "./styles.css";
import { AuthContext } from "../../auth/Context";
import Loading from "../General/Loading";

const UserProfile = () => {
  const { logout } = useContext(AuthContext);

  const [user, setUser] = useState({
    id: null,
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(true);
  const [isPasswordEditable, setIsPasswordEditable] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUser();
        setUser({
          id: userData.id,
          name: userData.name,
          email: userData.email,
        });
        setLoading(false);
      } catch (error) {
        console.error("Error to load user", error);
      }
    };
    fetchUser();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateUser(user);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile", error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete your profile?")) {
      try {
        await deleteUser();
        alert("Profile deleted successfully!");
        logout();
      } catch (error) {
        console.error("Error when deleting profile", error);
      }
    }
  };

  const enablePasswordEdit = () => {
    setIsPasswordEditable(true);
  };

  if (loading) return <Loading allPage={true} />;

  return (
    <div className="useProfileContainer">
      <h2>Edit Profile</h2>
      <Button onClick={handleDelete}>Delete profile</Button>
      <Form onSubmit={handleUpdate}>
        <Input
          label={"Name"}
          type="text"
          name="name"
          value={user.name}
          onChange={handleChange}
        />
        <Input
          label={"Email"}
          type="email"
          name="email"
          value={user.email}
          onChange={handleChange}
        />
        <Input
          label={"Password"}
          type="password"
          name="password"
          placeholder={"New password"}
          value={user.password}
          onChange={handleChange}
          disabled={!isPasswordEditable}
        />
        {!isPasswordEditable && (
          <Button type="button" onClick={enablePasswordEdit}>
            Change Password
          </Button>
        )}
        <Button type="submit">Save updates</Button>
      </Form>
    </div>
  );
};

export default UserProfile;

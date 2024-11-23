import { Link } from "react-router-dom";
import "./styles.css";
import { FaUsersCog } from "react-icons/fa";
import { TbCategoryPlus } from "react-icons/tb";
import { getAllUsers } from "../../api/user";
import { getAllCategories } from "../../api/category";
import { useEffect, useState } from "react";

export default function Admin() {
  const [users, setUsers] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const usersData = await getAllUsers();
      const categoriesData = await getAllCategories();

      setUsers(usersData);
      setCategories(categoriesData);
    };

    fetchData();
  }, []);

  return (
    <div className="panel-container">
      <section className="admin-panel-container">
        <div className="admin-panel-top">
          <h1>Admin Panel</h1>
          <header>
            {categories && (
              <section>Categories: {categories.length || "Loading"}</section>
            )}{" "}
            {users && <section>Users: {users.length || "Loading"}</section>}{" "}
          </header>
        </div>
        <nav>
          <div className="admin-nav-item">
            <Link to="/admin/users">
              <FaUsersCog />
              Manage Users
            </Link>
          </div>
          <div className="admin-nav-item">
            <Link to="/admin/categories">
              <TbCategoryPlus />
              Manage Categories
            </Link>
          </div>
        </nav>
      </section>
    </div>
  );
}

import { useEffect, useState } from "react";
import { fetchUsers, deleteUser, updateUserRole } from "../../api/adminApi";
import Modal from "../../components/Modal";
import { motion } from "framer-motion";
import Table from "../../components/Table";

type User = {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin";
};

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [modalAction, setModalAction] = useState<"delete" | "update-role" | "">(
    ""
  );

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const response = await fetchUsers();
        setUsers(response.data);
      } catch (error) {
        console.error("Failed to fetch users", error);
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  // ✅ Handle User Deletion
  const handleDeleteUser = async () => {
    if (!selectedUser) return;
    try {
      await deleteUser(selectedUser.id);
      setUsers(users.filter((user) => user.id !== selectedUser.id));
    } catch (error) {
      console.error("Failed to delete user", error);
    } finally {
      setShowModal(false);
    }
  };

  // ✅ Handle Role Update
  const handleUpdateRole = async () => {
    if (!selectedUser) return;
    try {
      const newRole = selectedUser.role === "user" ? "admin" : "user";
      await updateUserRole(selectedUser.id, newRole);
      setUsers(
        users.map((user) =>
          user.id === selectedUser.id ? { ...user, role: newRole } : user
        )
      );
    } catch (error) {
      console.error("Failed to update user role", error);
    } finally {
      setShowModal(false);
    }
  };

  return (
    <motion.div
      className="p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-3xl font-bold mb-6">👥 Manage Users</h2>

      {loading ? (
        <p>Loading users...</p>
      ) : (
        <Table
          headers={["Name", "Email", "Role", "Actions"]}
          data={users.map((user) => [
            user.name,
            user.email,
            <span
              key={user.id}
              className={`px-2 py-1 rounded ${
                user.role === "admin"
                  ? "bg-green-500 text-white"
                  : "bg-gray-300"
              }`}
            >
              {user.role}
            </span>,
            <div key={user.id} className="space-x-2">
              <button
                onClick={() => {
                  setSelectedUser(user);
                  setModalAction("update-role");
                  setShowModal(true);
                }}
                className="px-3 py-1 bg-blue-500 text-white rounded"
              >
                Change Role
              </button>
              <button
                onClick={() => {
                  setSelectedUser(user);
                  setModalAction("delete");
                  setShowModal(true);
                }}
                className="px-3 py-1 bg-red-500 text-white rounded"
              >
                Delete
              </button>
            </div>,
          ])}
        />
      )}

      {/* ✅ Confirmation Modal */}
      <Modal
        isOpen={showModal}
        title={modalAction === "delete" ? "Delete User?" : "Change User Role?"}
        message={
          modalAction === "delete"
            ? `Are you sure you want to delete ${selectedUser?.name}?`
            : `Change ${selectedUser?.name}'s role to ${
                selectedUser?.role === "user" ? "Admin" : "User"
              }?`
        }
        onClose={() => setShowModal(false)}
        onConfirm={
          modalAction === "delete" ? handleDeleteUser : handleUpdateRole
        }
        confirmText={modalAction === "delete" ? "Delete" : "Update Role"}
        cancelText="Cancel"
      />
    </motion.div>
  );
};

export default Users;

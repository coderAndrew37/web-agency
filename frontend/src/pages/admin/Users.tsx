import Table from "../../components/Table";
import Modal from "../../components/Modal";
import { motion } from "framer-motion";
import {
  useFetchUsers,
  useDeleteUser,
  useUpdateUserRole,
} from "../../hooks/admin/useAdmin";
import { User } from "../../types/admin";
import { Loader2 } from "lucide-react";
import { useState } from "react";

const Users = () => {
  const { data: usersResponse, isLoading, isError, refetch } = useFetchUsers();

  const { mutateAsync: deleteUser, isPending: isDeleting } = useDeleteUser();
  const { mutateAsync: updateUserRole, isPending: isUpdating } =
    useUpdateUserRole();

  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showRoleModal, setShowRoleModal] = useState(false);

  const users = usersResponse?.items || [];

  const handleDeleteUser = async () => {
    if (!selectedUser) return;
    await deleteUser(selectedUser._id);
    setShowDeleteModal(false);
  };

  const handleUpdateRole = async () => {
    if (!selectedUser) return;
    const newRole = selectedUser.role === "user" ? "admin" : "user";
    await updateUserRole({ _id: selectedUser._id, role: newRole });
    setShowRoleModal(false);
  };

  if (isLoading) {
    return (
      <motion.div
        className="p-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold mb-6">👥 Manage Users</h2>
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      </motion.div>
    );
  }

  if (isError) {
    return (
      <motion.div
        className="p-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold mb-6">👥 Manage Users</h2>
        <div className="text-red-500">
          Failed to load users.{" "}
          <button onClick={() => refetch()} className="text-blue-500 underline">
            Try again
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-3xl font-bold mb-6">👥 Manage Users</h2>

      <Table
        headers={["Name", "Email", "Role", "Actions"]}
        data={users.map((user) => [
          user.name,
          user.email,
          <span
            key={user._id}
            className={`px-2 py-1 rounded ${
              user.role === "admin" ? "bg-green-500 text-white" : "bg-gray-300"
            }`}
          >
            {user.role}
          </span>,
          <div key={user._id} className="flex space-x-2">
            <button
              onClick={() => {
                setSelectedUser(user);
                setShowRoleModal(true);
              }}
              className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
              disabled={isUpdating}
            >
              Change Role
            </button>
            <button
              onClick={() => {
                setSelectedUser(user);
                setShowDeleteModal(true);
              }}
              className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              disabled={isDeleting}
            >
              Delete
            </button>
          </div>,
        ])}
      />

      <Modal
        isOpen={showDeleteModal}
        title="Delete User?"
        message={`Are you sure you want to delete ${selectedUser?.name}?`}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDeleteUser}
        confirmText={isDeleting ? "Deleting..." : "Delete"}
        cancelText="Cancel"
        isConfirming={isDeleting}
      />

      <Modal
        isOpen={showRoleModal}
        title="Change User Role?"
        message={`Change ${selectedUser?.name}'s role to ${
          selectedUser?.role === "user" ? "Admin" : "User"
        }?`}
        onClose={() => setShowRoleModal(false)}
        onConfirm={handleUpdateRole}
        confirmText={isUpdating ? "Updating..." : "Update Role"}
        cancelText="Cancel"
        isConfirming={isUpdating}
      />
    </motion.div>
  );
};

export default Users;

import Table from "../../components/Table";
import Modal from "../../components/Modal";
import { motion } from "framer-motion";
import {
  useFetchUsers,
  useDeleteUser,
  useUpdateUserRole,
} from "../../api/adminApi";
import { User } from "../../types/admin";
import { handleApiError } from "../../Utils/apiErrorHandler";
import { Loader2 } from "lucide-react";
import { useState } from "react";

const Users = () => {
  // Fetch users with React Query
  const { data: usersResponse, isLoading, isError, refetch } = useFetchUsers();

  // Mutations
  const { mutateAsync: deleteUser, isPending: isDeleting } = useDeleteUser();
  const { mutateAsync: updateUserRole, isPending: isUpdating } =
    useUpdateUserRole();

  // State
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showRoleModal, setShowRoleModal] = useState(false);

  // Extract users from response
  const users = usersResponse?.items || [];

  /** Handle Delete User */
  const handleDeleteUser = async () => {
    if (!selectedUser) return;
    try {
      await deleteUser(selectedUser._id);
      refetch();
    } catch (error) {
      handleApiError(error, { showToast: true });
    } finally {
      setShowDeleteModal(false);
    }
  };

  /** Handle Update Role */
  const handleUpdateRole = async () => {
    if (!selectedUser) return;
    try {
      const newRole = selectedUser.role === "user" ? "admin" : "user";
      await updateUserRole({
        _id: selectedUser._id,
        role: newRole,
      });
      refetch();
    } catch (error) {
      handleApiError(error, { showToast: true });
    } finally {
      setShowRoleModal(false);
    }
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

      {/* Delete Confirmation Modal */}
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

      {/* Role Update Modal */}
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

// In the above code, we have created a new component called  Users  which will be used to display a list of users. We are using the  useFetchUsers  hook to fetch users from the API. We are also using  useDeleteUser  and  useUpdateUserRole  hooks to delete a user and update the user’s role, respectively.
// We are using the  Table  component to display the list of users in a tabular format. We are also using the  Modal  component to display a confirmation modal when the user tries to delete a user or update the user’s role.
// Now, let’s create the  Table  and  Modal  components.
// Create Table Component
// Create a new file called  Table.tsx  inside the  components  folder and add the following code:

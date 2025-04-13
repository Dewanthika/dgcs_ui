import { UserPlus } from "lucide-react";
import { useState } from "react";
import Modal from "../../components/ui/Modal";
import PageHeader from "../../components/ui/PageHeader";
import UserForm from "../../features/users/UserForm";
import useFetch from "../../hooks/useFetch";
import IUser from "../../types/IUser";
import UserStatics from "./UserStatics";
import UserTable from "./UserTable";

const UsersPage = () => {
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [currentUser, setCurrentUser] = useState<IUser>();

  const { data: users } = useFetch<IUser[]>({
    url: "/user",
    initialLoad: true,
  });
  
  return (
    <>
      <PageHeader
        title="User Management 111"
        action={
          <button
            onClick={() => {
              setCurrentUser(undefined);
              setShowAddUserModal(true);
            }}
            className="bg-indigo-600 text-white py-2 px-4 rounded-md flex items-center hover:bg-indigo-700"
          >
            <UserPlus className="w-5 h-5 mr-1" />
            Add User
          </button>
        }
      />

      {/* User Stats */}
      <UserStatics />

      <UserTable users={users!} />

      {/* Add/Edit User Modal */}
      <Modal
        isOpen={showAddUserModal}
        onClose={() => {
          setShowAddUserModal(false);
          setCurrentUser(undefined);
        }}
        title={currentUser ? "Edit User" : "Add User"}
        maxWidth="4xl"
      >
        <UserForm
          initialData={currentUser}
          onCancel={() => {
            setShowAddUserModal(false);
            setCurrentUser(undefined);
          }}
        />
      </Modal>
    </>
  );
};

export default UsersPage;

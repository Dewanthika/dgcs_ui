import { UserPlus } from "lucide-react";
import { useEffect, useState } from "react";
import Modal from "../../components/ui/Modal";
import PageHeader from "../../components/ui/PageHeader";
import UserForm from "../../features/users/UserForm";
import UserStatics from "./UserStatics";
import UserTable from "./UserTable";
import IUser from "../../types/IUser";

const UsersPage = () => {
  // const [users, setUsers] = useState<IUser[]>([]);
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [currentUser, setCurrentUser] = useState<IUser>();

  // useEffect(() => {
  //   // Generate mock users with the new user roles
  //   const mockUsers: User[] = [
  //     {
  //       id: 1,
  //       userID: "USR001",
  //       userTypeID: 1,
  //       email: "admin@example.com",
  //       fname: "Admin",
  //       lname: "User",
  //       dob: "1990-01-01",
  //       address: "123 Admin St, Colombo",
  //       phone: "+94 123 456 789",
  //       joinedDate: "2023-01-01",
  //       customerID: "",
  //       password: "********",
  //       userRole: "admin",
  //       status: "active",
  //     },
  //     {
  //       id: 2,
  //       userID: "USR002",
  //       userTypeID: 2,
  //       email: "staff@example.com",
  //       fname: "Staff",
  //       lname: "Member",
  //       dob: "1988-03-15",
  //       address: "456 Staff Ave, Kandy",
  //       phone: "+94 234 567 890",
  //       joinedDate: "2023-02-15",
  //       customerID: "",
  //       password: "********",
  //       userRole: "staff",
  //       status: "active",
  //     },
  //     {
  //       id: 3,
  //       userID: "USR003",
  //       userTypeID: 3,
  //       email: "john@example.com",
  //       fname: "John",
  //       lname: "Doe",
  //       dob: "1985-05-15",
  //       address: "789 Customer Ave, Kandy",
  //       phone: "+94 345 678 901",
  //       joinedDate: "2023-03-10",
  //       customerID: "CUST001",
  //       password: "********",
  //       userRole: "individual",
  //       status: "active",
  //     },
  //     {
  //       id: 4,
  //       userID: "USR004",
  //       userTypeID: 4,
  //       email: "jane@example.com",
  //       fname: "Jane",
  //       lname: "Smith",
  //       dob: "1992-08-22",
  //       address: "101 User Blvd, Galle",
  //       phone: "+94 456 789 012",
  //       joinedDate: "2023-04-05",
  //       customerID: "CUST002",
  //       password: "********",
  //       userRole: "individual",
  //       status: "inactive",
  //     },
  //     {
  //       id: 5,
  //       userID: "USR005",
  //       userTypeID: 5,
  //       email: "acme@example.com",
  //       fname: "Acme",
  //       lname: "Representative",
  //       dob: "1980-12-10",
  //       address: "202 Company St, Negombo",
  //       phone: "+94 567 890 123",
  //       joinedDate: "2023-05-20",
  //       customerID: "COMP001",
  //       password: "********",
  //       userRole: "company",
  //       status: "active",
  //       companyName: "Acme Corporation",
  //       businessRegNo: "REG12345",
  //       contactPerson: "John Manager",
  //     },
  //     {
  //       id: 6,
  //       userID: "USR006",
  //       userTypeID: 6,
  //       email: "global@example.com",
  //       fname: "Global",
  //       lname: "Representative",
  //       dob: "1985-07-25",
  //       address: "303 Enterprise St, Matara",
  //       phone: "+94 678 901 234",
  //       joinedDate: "2023-06-15",
  //       customerID: "COMP002",
  //       password: "********",
  //       userRole: "company",
  //       status: "pending",
  //       companyName: "Global Enterprises",
  //       businessRegNo: "REG67890",
  //       contactPerson: "Sarah Director",
  //     },
  //   ];

  //   setUsers(mockUsers);
  // }, []);

  // const handleAddUser = (userData: Omit<IUser, "id">) => {
  //   if (currentUser) {
  //     // Update existing user
  //     setUsers(
  //       users.map((user) =>
  //         user.id === currentUser._id
  //           ? { ...userData, id: currentUser._id }
  //           : user
  //       )
  //     );
  //   } else {
  //     // Add new user
  //     // const newUser: IUser = {
  //     //   ...userData,
  //     //   id: users.length + 1,
  //     //   userID: `USR${String(users.length + 1).padStart(3, "0")}`,
  //     //   joinedDate: new Date().toISOString().split("T")[0],
  //     //   customerID:
  //     //     userData.userRole === "individual" || userData.userRole === "company"
  //     //       ? `${userData.userRole === "company" ? "COMP" : "CUST"}${String(
  //     //           users.length + 1
  //     //         ).padStart(3, "0")}`
  //     //       : "",
  //     // };
  //     setUsers([...users, newUser]);
  //   }

  //   setShowAddUserModal(false);
  //   setCurrentUser(undefined);
  // };

  // const handleDeleteUser = (id: number) => {
  //   if (window.confirm("Are you sure you want to delete this user?")) {
  //     setUsers(users.filter((user) => user.id !== id));
  //   }
  // };

  // const handleToggleStatus = (id: number) => {
  //   setUsers(
  //     users.map((user) => {
  //       if (user.id === id) {
  //         const newStatus = user.status === "active" ? "inactive" : "active";
  //         return { ...user, status: newStatus };
  //       }
  //       return user;
  //     })
  //   );
  // };

  // const handleEditUser = (user: User) => {
  //   setCurrentUser(user);
  //   setShowAddUserModal(true);
  // };

  // // Format user role for display
  // const formatUserRole = (role: string) => {
  //   switch (role) {
  //     case "admin":
  //       return "Admin";
  //     case "staff":
  //       return "Staff";
  //     case "individual":
  //       return "Individual Customer";
  //     case "company":
  //       return "Company Customer";
  //     default:
  //       return role.charAt(0).toUpperCase() + role.slice(1);
  //   }
  // };

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

      <UserTable />

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

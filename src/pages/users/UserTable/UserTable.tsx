import { Filter } from "lucide-react";
import { useState } from "react";
import DataTable from "../../../components/tables/DataTable";
import SearchBar from "../../../components/ui/SearchBar";
import IUser from "../../../types/IUser";

interface IUserTableProps {
  users: IUser[];
}

const UserTable = ({ users }: IUserTableProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  // Filter users based on search term, role, and status
  const filteredUsers = users?.filter((user) => {
    const matchesSearch =
      user.fName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user?._id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (user.companyName &&
        user.companyName.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesRole = roleFilter === "all" || user.userType === roleFilter;
    const matchesStatus =
      statusFilter === "all" || user.status === statusFilter;

    return matchesSearch && matchesRole && matchesStatus;
  });

  //   // Get counts for each role
  //   const roleCounts = {
  //     admin: users.filter((user) => user.userRole === "admin").length,
  //     staff: users.filter((user) => user.userRole === "staff").length,
  //     individual: users.filter((user) => user.userRole === "individual").length,
  //     company: users.filter((user) => user.userRole === "company").length,
  //   };
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
      <div className="p-4 border-b flex flex-col sm:flex-row justify-between gap-4">
        <SearchBar
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Search users..."
        />

        <div className="flex gap-4">
          <div className="relative">
            <Filter
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={18}
            />
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="pl-10 p-2 border border-gray-300 rounded-md appearance-none pr-8"
            >
              <option value="all">All Roles</option>
              <option value="admin">Admin</option>
              <option value="staff">Staff</option>
              <option value="individual">Individual Customer</option>
              <option value="company">Company Customer</option>
            </select>
          </div>

          <div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="p-2 border border-gray-300 rounded-md"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="pending">Pending</option>
            </select>
          </div>
        </div>
      </div>

      <DataTable
        columns={[
          { header: "Name", accessor: (user) => user.fName },
          { header: "Role", accessor: (user) => user.userType },
          { header: "Email", accessor: (user) => user.email },
        ]}
        data={filteredUsers}
        keyExtractor={(user) => user?._id || "unknown-id"}
        emptyMessage={
          searchTerm || roleFilter !== "all" || statusFilter !== "all"
            ? "No users found. Try changing your filters."
            : "No users found. Add some users to get started."
        }
      />
    </div>
  );
};

export default UserTable;

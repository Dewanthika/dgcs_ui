import UserStaticsCard from "./UserStaticsCard";

const UserStatics = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
      <UserStaticsCard title="Total Users" data={1} />
      <UserStaticsCard title="Staff" data={2} />
      {/* <UserStaticsCard title="Admin" data={2} /> */}
      <UserStaticsCard title="Individual Customers" data={3} />
      <UserStaticsCard title="Company Customers" data={4} />
    </div>
  );
};

export default UserStatics;

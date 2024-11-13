import { Metadata } from "next";
import { UsersDashboard } from "@/components/users-dashboard";

export const metadata: Metadata = {
  title: "Users Dashboard",
  description: "View and manage all users",
};

export default async function UsersPage() {
  return (
    <div className="container mx-auto py-10">
      <UsersDashboard />
    </div>
  );
}

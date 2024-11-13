"use client";
import { UserFunnelData } from "@/components/user-funnel-data";
import { useParams } from "next/navigation";

const Page = () => {
  const params = useParams<{ id: string }>();
  const userId = parseInt(params.id, 10);
  return (
    <div className="container mx-auto py-10">
      <UserFunnelData userId={userId} />
    </div>
  );
};

export default Page;

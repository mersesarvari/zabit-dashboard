"use client";

import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type FunnelTransition = {
  id: number;
  fromStage: string | null;
  toStage: string;
  transitionDate: string;
};

type UserData = {
  id: number;
  name: string;
  email: string;
  transitions: FunnelTransition[];
};

export function UserFunnelData({ userId }: { userId: number }) {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`/api/users/${userId}`);
        if (!response.ok) throw new Error("Failed to fetch user data");
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, [userId]);

  if (loading) return <p>Loading user data...</p>;
  if (!userData) return <p>No user data found</p>;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>User Information</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            <strong>Name:</strong> {userData.name}
          </p>
          <p>
            <strong>Email:</strong> {userData.email}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Funnel Transitions</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>From Stage</TableHead>
                <TableHead>To Stage</TableHead>
                <TableHead>Transition Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {userData.transitions.map((transition) => (
                <TableRow key={transition.id}>
                  <TableCell>{transition.fromStage || "Entry"}</TableCell>
                  <TableCell>{transition.toStage}</TableCell>
                  <TableCell>
                    {new Date(transition.transitionDate).toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

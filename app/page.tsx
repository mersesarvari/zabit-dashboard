"use client";

import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";

interface StageStats {
  stageName: string;
  userCount: number;
  percentage: number;
}

export default function FunnelBreakdownPage() {
  const [stageStats, setStageStats] = useState<StageStats[]>([]);
  const [totalUsers, setTotalUsers] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/funnel-stages");
        const data = await response.json();
        setTotalUsers(data.totalUsers);
        setStageStats(data.stageStats);
      } catch (error) {
        console.error("Error fetching stage stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto py-10 space-y-6">
        <Skeleton className="h-12 w-3/4" />
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-1/4" />
            <Skeleton className="h-4 w-1/2" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-[300px] w-full" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-1/4" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full mt-2" />
            <Skeleton className="h-4 w-full mt-2" />
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container w-full mx-auto pt-2 space-y-4">
      <h1 className="text-3xl font-bold">User Funnel Breakdown</h1>
      <Card>
        <CardHeader>
          <CardTitle>Funnel Visualization</CardTitle>
          <CardDescription>
            Visual representation of users at each funnel stage
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart
              data={stageStats}
              margin={{ top: 20, right: 0, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="stageName" className="text-[10px]" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="userCount" fill="#000000" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Funnel Stage Details</CardTitle>
          <CardDescription>Total Users: {totalUsers}</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Stage Name</TableHead>
                <TableHead>User Count</TableHead>
                <TableHead>Percentage</TableHead>
                <TableHead>Progress</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {stageStats.map((stage) => (
                <TableRow key={stage.stageName}>
                  <TableCell className="font-medium">
                    {stage.stageName}
                  </TableCell>
                  <TableCell>{stage.userCount}</TableCell>
                  <TableCell>{stage.percentage.toFixed(2)}%</TableCell>
                  <TableCell className="w-[30%]">
                    <Progress value={stage.percentage} className="w-full" />
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

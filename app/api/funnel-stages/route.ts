import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // Make sure prisma is correctly set up in this path

export async function GET() {
  // Fetch all stages and user counts in each stage
  const stages = await prisma.funnelStage.findMany({
    include: {
      transitionsTo: {
        select: { userId: true },
      },
    },
  });

  // Calculate total users and percentages
  const totalUsers = stages.reduce(
    (total, stage) => total + stage.transitionsTo.length,
    0
  );

  const stageStats = stages.map((stage) => ({
    stageName: stage.stageName,
    userCount: stage.transitionsTo.length,
    percentage: totalUsers
      ? (stage.transitionsTo.length / totalUsers) * 100
      : 0,
  }));

  return NextResponse.json({ totalUsers, stageStats });
}

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const stages = await prisma.funnelStage.findMany({
      include: {
        transitionsFrom: true,
        transitionsTo: true,
      },
    });
    return NextResponse.json(stages);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error fetching funnel data" },
      { status: 500 }
    );
  }
}

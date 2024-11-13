import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: NextRequest,
  props: { params: Promise<{ id: string }> }
) {
  const params = await props.params;
  const { id } = params;
  try {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(id, 10) },
    });

    const transitions = await prisma.funnelTransition.findMany({
      where: { userId: parseInt(id, 10) },
      include: {
        fromStage: {
          select: { stageName: true },
        },
        toStage: {
          select: { stageName: true },
        },
      },
    });

    const transitionsWithNames = transitions.map((transition) => ({
      id: transition.id,
      fromStage: transition?.fromStage?.stageName,
      toStage: transition?.toStage?.stageName,
      transitionDate: transition?.transitionDate,
    }));

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const userObject = { ...user, transitions: transitionsWithNames };
    console.log("Retrieving user:", userObject);
    return NextResponse.json(userObject);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error fetching user data" },
      { status: 500 }
    );
  }
}

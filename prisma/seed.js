const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  await prisma.funnelTransition.deleteMany();
  await prisma.user.deleteMany();
  await prisma.funnelStage.deleteMany();

  await prisma.funnelStage.createMany({
    data: [
      { stageName: "Signed up on website" },
      { stageName: "Downloaded app" },
      { stageName: "Completed onboarding" },
      { stageName: "Signed up for free trial" },
      { stageName: "Converted to paid subscription" },
      { stageName: "Churned after free trial" },
      { stageName: "Churned after paid subscription" },
      { stageName: "Renewed paid subscription" },
    ],
  });

  await prisma.user.createMany({
    data: [
      { name: "Alice", email: "alice@example.com" },
      { name: "Bob", email: "bob@example.com" },
      { name: "Charlie", email: "charlie@example.com" },
    ],
  });

  const users = await prisma.user.findMany();
  const stages = await prisma.funnelStage.findMany();

  const userIds = Object.fromEntries(users.map((user) => [user.name, user.id]));
  const stageIds = Object.fromEntries(
    stages.map((stage) => [stage.stageName, stage.id])
  );

  const transitions = [
    {
      userId: userIds["Alice"],
      fromStageId: stageIds["Signed up on website"],
      toStageId: stageIds["Downloaded app"],
    },
    {
      userId: userIds["Alice"],
      fromStageId: stageIds["Downloaded app"],
      toStageId: stageIds["Completed onboarding"],
    },
    {
      userId: userIds["Bob"],
      fromStageId: stageIds["Signed up on website"],
      toStageId: stageIds["Signed up for free trial"],
    },
    {
      userId: userIds["Bob"],
      fromStageId: stageIds["Signed up for free trial"],
      toStageId: stageIds["Converted to paid subscription"],
    },
    {
      userId: userIds["Charlie"],
      fromStageId: stageIds["Signed up on website"],
      toStageId: stageIds["Downloaded app"],
    },
    {
      userId: userIds["Charlie"],
      fromStageId: stageIds["Downloaded app"],
      toStageId: stageIds["Churned after free trial"],
    },
  ];

  for (const transition of transitions) {
    await prisma.funnelTransition.create({
      data: transition,
    });
  }

  console.log("Database has been seeded");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

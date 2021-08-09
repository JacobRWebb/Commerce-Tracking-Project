import { Application, PrismaClient, Status, User } from "@prisma/client";
import { git, internet, lorem, system } from "faker";
import { generateID, hashString } from "./Basic";
const prisma = new PrismaClient();

export const seedDB = async () => {
  await prisma.comment.deleteMany({});
  await prisma.alert.deleteMany({});
  await prisma.user.deleteMany({});
  await prisma.application.deleteMany({});

  const amountOfUsers = 200;
  const amountOfApplications = 50;
  const amountOfAlerts = 500;
  const averageCommentAmount = 5;

  const generateUsers = async () => {
    await prisma.user.create({
      data: { username: "admin", password: hashString("admin"), role: "ADMIN" },
    });
    await prisma.user.create({
      data: { username: "user", password: hashString("user"), role: "USER" },
    });

    let x = 0;
    let massUsers: { username: string; password: string }[] = [];
    while (x < amountOfUsers) {
      massUsers.push({
        username: internet.userName() || "",
        password: hashString(internet.password()) || "",
      });
      x++;
    }
    await prisma.user.createMany({ data: massUsers });
  };

  const generateApplications = async () => {
    let x = 0;
    let massApplications: { name: string }[] = [];

    while (x < amountOfApplications) {
      massApplications.push({ name: generateID(3) });
      x++;
    }

    await prisma.application.createMany({ data: massApplications });
  };

  const assignUsersToApplications = async () => {
    const users = await prisma.user.findMany({});
    const applications = await prisma.application.findMany({});

    await applications.forEach(async (applciation) => {
      const randomUsers = getRandomUsers(users);
      await prisma.application.update({
        where: { id: applciation.id },
        data: {
          users: {
            set: randomUsers.map((rUser) => {
              return { id: rUser.id };
            }),
          },
        },
      });
    });
  };

  const generateAlerts = async () => {
    const users = await prisma.user.findMany({});
    const applications = await prisma.application.findMany({});
    users;
    applications;
    amountOfAlerts;

    let x = 0;
    let massAlerts: {
      changeAgent: string;
      changeProcess: string;
      file: string;
      hostname: string;
      status: Status;
      userId: string | null;
      applicationId: string;
    }[] = [];
    while (x < amountOfAlerts) {
      const randomNumber = Math.floor(Math.random() * 3);
      let status: Status = "Unacknowledged";
      switch (randomNumber) {
        case 1:
          status = "Acknowledged";
          break;
        case 2:
          status = "Declined";
          break;
        default:
          status = "Unacknowledged";
      }

      const user: User | undefined = getRandomUser(users);

      const randomApplication = getRandomApplication(applications);
      massAlerts.push({
        changeAgent: internet.userAgent(),
        changeProcess: git.branch(),
        file: system.filePath(),
        hostname: internet.domainName(),
        status: status,
        userId: user ? user.id : null,
        applicationId: randomApplication.id,
      });
      x++;
    }
    await prisma.alert.createMany({ data: massAlerts });
  };

  const generateComments = async () => {
    const users = await prisma.user.findMany();
    const alerts = await prisma.alert.findMany();

    await alerts.forEach(async (alert) => {
      let x = 0;
      let massComments: { comment: string; userId: string }[] = [];

      while (x < Math.floor(Math.random() * averageCommentAmount) + 1) {
        const randomUser = getRandomUser(users);
        massComments.push({
          comment: lorem.sentences(2),
          userId: randomUser.id,
        });
        x++;
      }

      await prisma.alert.update({
        where: { id: alert.id },
        data: { comment: { createMany: { data: massComments } } },
      });
    });
  };

  await generateUsers();
  await generateApplications();
  await assignUsersToApplications();
  await generateAlerts();
  await generateComments();

  console.log("Done");
};

const getRandomUser = (users: User[]) => {
  return users[Math.floor(Math.random() * users.length)];
};

const getRandomUsers = (users: User[]) => {
  let auxiliaryUsers: User[] = [];
  while (auxiliaryUsers.length < Math.floor(Math.random() * users.length)) {
    const randomUser = getRandomUser(users);
    if (auxiliaryUsers.indexOf(randomUser) < 0) {
      auxiliaryUsers.push(randomUser);
    }
  }
  return auxiliaryUsers;
};

const getRandomApplication = (applications: Application[]) => {
  return applications[Math.floor(Math.random() * applications.length)];
};

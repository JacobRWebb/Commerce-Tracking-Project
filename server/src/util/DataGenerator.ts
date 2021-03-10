import { date, git, internet, lorem, name, system } from "faker";
import { getConnection } from "typeorm";
import { Alert, AlertStatus, User, UserRole } from "../entities";

export const generate = async () => {
  const connection = getConnection();
  if (!connection) return;

  await User.delete({}).catch(() => {});
  await Alert.delete({}).catch(() => {});

  let users: User[] = [
    User.create({ username: "admin", password: "admin", role: UserRole.ADMIN }),
    User.create({ username: "user", password: "user" }),
  ];

  for (let i = 0; i < Math.floor(Math.random() * 30); i++) {
    users.push(
      User.create({
        username: internet.userName(name.findName()),
        password: internet.password(),
      })
    );
  }

  await connection
    .createQueryBuilder()
    .insert()
    .into(User)
    .values(users)
    .execute()
    .catch(() => {});

  await loopCreate();
  setInterval(loopCreate, 2000);
};

const loopCreate = async () => {
  try {
    const connection = getConnection();
    if (!connection) return;

    let users = await User.find({});
    let alerts: Alert[] = [];

    for (let i = 0; i < Math.floor(Math.random() * 101); i++) {
      alerts.push(
        Alert.create({
          status: AlertStatus.ACKNOWLEDGED,
          user: users[Math.floor(Math.random() * users.length) + 1],
          comment: lorem.sentence(),
          timestamp: date.recent(Math.floor(Math.random() * 365) + 1),
          hostname: internet.domainName(),
          file: system.filePath(),
          changeAgent: internet.userAgent(),
          changeProcess: git.branch(),
        })
      );
    }

    for (let i = 0; i < Math.floor(Math.random() * 101); i++) {
      alerts.push(
        Alert.create({
          status: AlertStatus.DECLINED,
          user: users[Math.floor(Math.random() * users.length) + 1],
          comment: lorem.sentence(),
          timestamp: date.recent(Math.floor(Math.random() * 365) + 1),
          hostname: internet.domainName(),
          file: system.filePath(),
          changeAgent: internet.userAgent(),
          changeProcess: git.branch(),
        })
      );
    }

    for (let i = 0; i < Math.floor(Math.random() * 101); i++) {
      alerts.push(
        Alert.create({
          status: AlertStatus.UNACKNOWLEDGED,
          timestamp: date.recent(Math.floor(Math.random() * 365) + 1),
          hostname: internet.domainName(),
          file: system.filePath(),
          changeAgent: internet.userAgent(),
          changeProcess: git.branch(),
        })
      );
    }

    await connection
      .createQueryBuilder()
      .insert()
      .into(Alert)
      .values(alerts)
      .execute()
      .catch(() => {});
  } catch {}
};

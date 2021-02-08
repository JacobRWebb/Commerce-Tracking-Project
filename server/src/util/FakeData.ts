import faker from "faker";
import { Alert, Application, User, UserRoles } from "../entities";

export default new (class FakeData {
  generateUsers = async (amount: number = -2) => {
    let u = User.create({
      username: "user",
      password: "user",
      role: UserRoles.USER,
    });
    await u.save().catch(() => {});
    u = User.create({
      username: "master",
      password: "master",
      role: UserRoles.ADMIN,
    });
    await u.save().catch(() => {});

    for (let i = 0; i < amount; i++) {
      let name = faker.name.findName();
      let username = faker.internet.userName(name);
      let password = faker.internet.password();
      u = User.create({
        username,
        password,
        role: UserRoles.USER,
      });
      await u.save().catch(() => {});
    }
  };

  generateAlerts = async (amount: number = 1) => {
    let application = Application.create({ identifier: "abc" });
    await application.save().catch(() => {});

    let ackUser = User.create({ username: "ack-user", password: "ack-user" });
    ackUser.save().catch(() => {});

    for (let i = 0; i < amount; i++) {
      let currentState = faker.random.number(1);
      let comment = currentState === 1 ? faker.lorem.sentence() : undefined;
      let u = currentState === 1 ? ackUser : undefined;

      let a = Alert.create({
        currentState,
        user: u,
        comment,
        application: application,
        timestamp: faker.date.recent(365),
        hostname: faker.internet.domainName(),
        file: faker.system.filePath(),
        change_agent: "system",
        change_process: "system",
      });
      await a.save().catch(() => {});
    }
  };
})();

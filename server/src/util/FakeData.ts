import faker from "faker";
import { Alert } from "../entities/Alert";
import { User, UserRoles } from "../entities/User";

export default new (class FakeData {
  generateUsers = async (amount: number = -2) => {
    let u = User.create({
      username: "master",
      password: "master",
      role: UserRoles.ADMIN,
    });
    await u.save();
    u = User.create({
      username: "user",
      password: "user",
      role: UserRoles.USER,
    });
    await u.save();

    for (let i = 0; i < amount; i++) {
      let name = faker.name.findName();
      let username = faker.internet.userName(name);
      let password = faker.internet.password();
      u = User.create({
        username,
        password,
        role: UserRoles.USER,
      });
      await u.save();
    }
  };

  generateAlerts = async (amount: number = 1) => {
    for (let i = 0; i < amount; i++) {
      let a = Alert.create({
        currentState: faker.random.number(1),
        comment: faker.lorem.paragraph(),
        timeStamp: faker.date.recent(2),
        hostname: faker.internet.domainName(),
        file: faker.system.filePath(),
        change_agent: "system",
        change_process: "system",
      });
      await a.save();
    }
  };
})();

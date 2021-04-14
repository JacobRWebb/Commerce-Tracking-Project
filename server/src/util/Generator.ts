import { date, git, internet, lorem, system } from "faker";
import { createQueryBuilder, getConnection } from "typeorm";
import { Alert, AlertStatus, Application, User, UserRole } from "../entities";
import { generateID } from "./Basic";

export default class Generator {
  base = async () => {
    console.log("Starting Data Creator");

    await this.deleteInOrder();
    await this.checkDefaultAccounts();
    await this.createApplications();
    await this.createUsers();
    await this.applyUserApplications();
    await this.generateEntries();
  };

  deleteInOrder = async () => {
    await getConnection().dropDatabase();
    await getConnection().runMigrations();

    console.log("Done Deleting Entities");
  };

  checkDefaultAccounts = async () => {
    const application = Application.create({
      name: "DEFAULT",
      id: "ZZZ",
    });
    await application.save().catch((err) => console.error(err));

    let newUser = await User.create({ username: "user", password: "user" });
    newUser.applications = [application];
    await newUser.save().catch((err) => console.error(err));

    newUser = await User.create({
      username: "admin",
      password: "admin",
      role: UserRole.ADMIN,
    });
    newUser.applications = [application];
    await newUser.save();

    console.log("Done Checking Default Accounts");
  };

  createApplications = async () => {
    let auxiliaryApplications: Application[] = [];
    for (let i = 0; i < Math.random() * 10; i++) {
      auxiliaryApplications.push(
        Application.create({
          id: generateID(3),
          name: internet.domainName(),
        })
      );
    }
    await createQueryBuilder()
      .insert()
      .into(Application)
      .values(auxiliaryApplications)
      .execute()
      .catch((err) => console.error(err));

    console.log("Done Creating Applications");
  };

  createUsers = async () => {
    const auxiliaryUsers: User[] = [];

    for (let i = 0; i < Math.random() * 20; i++) {
      auxiliaryUsers.push(
        User.create({
          username: internet.userName(),
          password: internet.password(),
        })
      );
    }

    await createQueryBuilder()
      .insert()
      .into(User)
      .values(auxiliaryUsers)
      .execute()
      .catch((err) => console.error(err));

    console.log("Done Creating Users");
  };

  private randomApplications = (applications: Application[]): Application[] => {
    let auxiliaryApplications: Application[] = [];

    for (let i = 0; i < applications.length; i++) {
      const index = Math.floor(Math.random() * applications.length);

      auxiliaryApplications.push(applications[index]);
      applications.splice(index, 1);
    }

    return auxiliaryApplications;
  };

  applyUserApplications = async () => {
    const applications = await Application.find({});
    const users = await User.find({});
    await users.map(async (user) => {
      let apps = applications.map((app) => app);
      user.applications = this.randomApplications(apps);
      await user.save();
    });

    console.log("Done Applying Applications");
  };

  generateEntries = async () => {
    const applications = await Application.find({});
    const users = await User.find({});

    let auxiliaryArray: Alert[] = [];

    for (let i = 0; i < Math.floor(Math.random() * 400); i++) {
      let status: AlertStatus = AlertStatus.UNACKNOWLEDGED;
      const x = Math.floor(Math.random() * 3) + 1;
      if (x === 2) status = AlertStatus.ACKNOWLEDGED;
      if (x === 3) status = AlertStatus.DECLINED;

      auxiliaryArray.push(
        Alert.create({
          status,
          comment:
            status === AlertStatus.UNACKNOWLEDGED
              ? undefined
              : lorem.sentences(2),
          user:
            status === AlertStatus.UNACKNOWLEDGED
              ? undefined
              : users[Math.floor(Math.random() * users.length)],
          timestamp: date.recent(20),
          hostname: internet.domainName(),
          file: system.filePath(),
          changeAgent: internet.userAgent(),
          changeProcess: git.branch(),
          application:
            applications[Math.floor(Math.random() * applications.length)],
        })
      );
    }

    createQueryBuilder()
      .insert()
      .into(Alert)
      .values(auxiliaryArray)
      .execute()
      .catch(() => {})
      .finally(() => setImmediate(this.generateEntries, 1000));
  };
}

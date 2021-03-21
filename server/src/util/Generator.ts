import { date, git, internet, name, system } from "faker";
import { getConnection } from "typeorm";
import { Alert, AlertStatus, Application, User, UserRole } from "../entities";

export default class Generator {
  appliedApplications: Application[] = [];

  base = async () => {
    if (!getConnection().isConnected) return;
    await Alert.delete({});
    await Application.delete({});
    await User.delete({});

    await this.createApplications()
      .finally(() => {
        console.log("Fake applications created.");
      })
      .catch((err) => {
        console.log("application creation error");
        console.error(err);
      });

    await this.createUsers()
      .finally(() => {
        console.log("Fake users created.");
      })
      .catch((err) => {
        console.log("user creation error");
        console.error(err);
      });

    this.alertBuilder();
  };

  private generateID = (length: number): string => {
    let auxiliary: string = "";

    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < length; i++) {
      auxiliary += characters[Math.floor(Math.random() * characters.length)];
    }

    return auxiliary;
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

  private createApplications = async () => {
    for (let i = 0; i < Math.floor(Math.random() * 10) + 5; i++) {
      const application = Application.create({
        id: this.generateID(3),
        name: internet.domainWord(),
      });

      application.save();
    }
  };

  private createUsers = async () => {
    await User.delete({});
    const applications: Application[] = await Application.find({});

    let user: User = User.create({
      username: "admin",
      password: "admin",
      role: UserRole.ADMIN,
    });

    user.applications = this.randomApplications(applications);
    await user.save();

    user = User.create({
      username: "user",
      password: "user",
    });

    user.applications = this.randomApplications(applications);
    await user.save();

    for (let i = 0; i < Math.floor(Math.random() * 20); i++) {
      user = User.create({
        username: name.firstName(),
        password: internet.password(),
        role:
          Math.floor(Math.random() * 100) < 10 ? UserRole.ADMIN : UserRole.USER,
      });

      user.applications = this.randomApplications(applications);

      await user.save();
    }
  };

  private alertBuilder = async () => {
    const applications = await Application.find({});
    let auxilaryAlerts: Alert[] = [];

    for (let i = 0; i < Math.floor(Math.random() * 500); i++) {
      let status: AlertStatus = AlertStatus.UNACKNOWLEDGED;
      const x = Math.floor(Math.random() * 3) + 1;
      if (x === 2) status = AlertStatus.ACKNOWLEDGED;
      if (x === 3) status = AlertStatus.DECLINED;

      auxilaryAlerts.push(
        Alert.create({
          status,
          timestamp: date.recent(Math.floor(Math.random() * 100)),
          hostname: internet.domainName(),
          file: system.filePath(),
          changeAgent: internet.userAgent(),
          changeProcess: git.branch(),
          application:
            applications[Math.floor(Math.random() * applications.length) + 1],
        })
      );
    }

    getConnection()
      .createQueryBuilder()
      .insert()
      .into(Alert)
      .values(auxilaryAlerts)
      .execute()
      .catch(() => {})
      .finally(() => {
        setImmediate(this.alertBuilder, 1000);
      });
  };
}

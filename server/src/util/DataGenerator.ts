import { date, internet, lorem, random, system } from "faker";
import { getConnection } from "typeorm";
import { Alert, Application, User, UserRoles } from "../entities";

class DataGenerator {
  constructor() {
    if (!getConnection().isConnected)
      throw new Error("No connection to database.");
  }

  demo = async (generateRows: number = 5000) => {
    console.log("[Demo Data Generator] Wiping Database");

    await getConnection()
      .query(
        'DROP SCHEMA public CASCADE; CREATE SCHEMA public; CREATE EXTENSION IF NOT EXISTS "uuid-ossp";'
      )
      .catch(() => {});

    await getConnection()
      .runMigrations()
      .catch(() => {});

    console.log(
      `[Demo Data Generator] Generating Demo Acccounts & Demo Data, This may take a moment as it is generating ${generateRows} fake alerts.`
    );

    await User.insert({
      username: "admin",
      password: "admin",
      role: UserRoles.ADMIN,
    }).catch(() => {});
    await User.insert({
      username: "user",
      password: "user",
    }).catch(() => {});

    const application = Application.create({ identifier: "abc" });
    await application.save().catch(() => {});
    const ack = await User.create({
      username: "accept-demo",
      password: "accept-demo",
    });
    await ack.save().catch(() => {});

    const bulkAlerts: Alert[] = [];

    for (let i = 0; i < generateRows; i++) {
      const currentState = random.number(1);
      const comment = currentState === 1 ? lorem.sentence() : undefined;

      bulkAlerts.push(
        Alert.create({
          currentState,
          user: currentState === 1 ? ack : undefined,
          comment,
          application: application,
          timestamp: date.recent(365),
          hostname: internet.domainName(),
          file: system.filePath(),
          change_agent: "system",
          change_process: "system",
        })
      );
    }

    await getConnection()
      .createQueryBuilder()
      .insert()
      .into(Alert)
      .values(bulkAlerts)
      .execute()
      .catch(() => {});

    console.log(
      "[Demo Data Generator] All demo data is now generated. api server is ready."
    );
  };
}

export default DataGenerator;

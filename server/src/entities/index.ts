import { createConnection, getConnection } from "typeorm";

export { Alert, AlertStatus } from "./Alert";
export { Application } from "./Application";
export { User, UserRole } from "./User";

export const establishConnection = async () => {
  await createConnection().catch(() => {});
  await getConnection()
    .runMigrations()
    .catch((err) => {
      console.error(err);
    });

  setInterval(async () => {
    if (!getConnection().isConnected) {
      await createConnection().catch(() => {});
    }
  }, 5000);
};

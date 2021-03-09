import { createConnection } from "typeorm";

export { Alert, AlertStatus } from "./Alert";
export { User, UserRole } from "./User";

export const establishConnection = async () => {
  const connection = await createConnection();
  await connection.runMigrations().catch(() => {});
  if (!connection.isConnected)
    throw new Error("Unable to connect to database.");
};

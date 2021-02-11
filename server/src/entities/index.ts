import { createConnection } from "typeorm";

export { Alert } from "./Alert";
export { Application } from "./Application";
export { Session } from "./Session";
export { User, UserRoles } from "./User";

export const establishConnection = async () => {
  const connection = await createConnection();
  if (!connection.isConnected)
    throw new Error("Unable to connect to database.");
};

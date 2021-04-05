import { AlertStatus } from "./IEntry";

export default interface IFilter {
  time: "ASC" | "DESC";
  status: AlertStatus;
  extended: boolean;
  offset: number;
  take: number;
  hostname: string;
  applicationID: string;
  page: number;
}

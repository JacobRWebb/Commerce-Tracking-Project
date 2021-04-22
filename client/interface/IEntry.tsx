export enum AlertStatus {
  ALL = "all",
  ACKNOWLEDGED = "acknowledged",
  UNACKNOWLEDGED = "un-acknowledged",
  DECLINED = "declined",
}

export default interface IEntry {
  id: string;
  status: AlertStatus;
  application: {
    id: string;
    name: string;
  };
  timestamp: string;
  user?: { id: string; username: string; role: string };
  comment?: string;
  hostname: string;
  file: string;
  changeAgent: string;
  changeProcess: string;
  createdAt: string;
  updatedAt: string;
}

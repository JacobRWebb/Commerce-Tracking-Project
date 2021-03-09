import { IsNull, Like, MoreThanOrEqual, Not } from "typeorm";
import { Alert, AlertStatus, UserRole } from "../entities";

const USER_DAY_THRESHOLD = 2;

export interface IFilter {
  time: "ASC" | "DESC";
  status: AlertStatus;
  extended: boolean;
  offset: number;
  take: number;
  hostname: string;
}

const defaultFilter: IFilter = {
  time: "DESC",
  status: AlertStatus.ALL,
  extended: false,
  offset: 0,
  take: 25,
  hostname: "",
};

const alertController = {
  fetchAll: async (body: Object, role: UserRole) => {
    let filter: IFilter = { ...defaultFilter, ...body };
    const timeConstraint = new Date();
    timeConstraint.setDate(timeConstraint.getDate() - USER_DAY_THRESHOLD);

    let alerts: [Alert[], number] | void;
    alerts = await Alert.findAndCount({
      take: filter.take,
      skip: filter.offset,
      where: {
        status:
          filter.status === AlertStatus.ALL ? Not(IsNull()) : filter.status,
        timestamp:
          role === UserRole.ADMIN && filter.extended
            ? Not(IsNull())
            : MoreThanOrEqual(timeConstraint.toISOString()),
        hostname:
          filter.hostname.length < 1
            ? Not(IsNull())
            : Like(`%${filter.hostname}%`),
      },
      order: { timestamp: filter.time },
    }).catch(() => {});
    return alerts;
  },
};

export default alertController;

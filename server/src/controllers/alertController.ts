import { Brackets, getRepository } from "typeorm";
import { Alert, AlertStatus, User, UserRole } from "../entities";

const USER_DAY_THRESHOLD = 2;

export interface IFilter {
  time: "ASC" | "DESC";
  status: AlertStatus;
  extended: boolean;
  offset: number;
  take: number;
  hostname: string;
  applicationID: string;
}

const defaultFilter: IFilter = {
  time: "DESC",
  status: AlertStatus.ALL,
  extended: false,
  offset: 0,
  take: 25,
  hostname: "",
  applicationID: "",
};

const alertController = {
  getAll: async (user: User, inboundFilter: Partial<IFilter>) => {
    const start = Date.now();

    const filter: IFilter = { ...defaultFilter, ...inboundFilter };

    const timeConstraint = new Date();
    timeConstraint.setDate(timeConstraint.getDate() - USER_DAY_THRESHOLD);

    const query = await getRepository(Alert)
      .createQueryBuilder("alert")
      .leftJoinAndSelect("alert.user", "user")
      .leftJoinAndSelect("alert.application", "applications")
      .where(
        new Brackets((qb) => {
          if (filter.extended && user.role === UserRole.ADMIN) {
            return qb.where("alert IS NOT NULL");
          } else {
            return qb.where("alert.application.id IN (:...apps)", {
              apps: [...user.applications.map((app) => app.id)],
            });
          }
        })
      )
      .andWhere(
        new Brackets((qb) => {
          if (filter.status === AlertStatus.ALL) {
            return qb.where("alert.status IS NOT NULL");
          } else {
            return qb.where("alert.status = :status", {
              status: filter.status,
            });
          }
        })
      )
      .andWhere(
        new Brackets((qb) => {
          if (filter.extended && user.role === UserRole.ADMIN) {
            return qb.where("alert.timestamp IS NOT NULL");
          } else {
            return qb.where("alert.timestamp >= :timestamp", {
              timestamp: timeConstraint.toISOString(),
            });
          }
        })
      )
      .andWhere(
        new Brackets((qb) => {
          if (filter.hostname.length < 1) {
            return qb.where("alert.hostname IS NOT NULL");
          } else {
            return qb.where("alert.hostname LIKE :hostname", {
              hostname: `%${filter.hostname}%`,
            });
          }
        })
      )
      .andWhere(
        new Brackets((qb) => {
          if (filter.applicationID.length < 1) {
            return qb.where("alert.application.id IS NOT NULL");
          } else {
            return qb.where("alert.application.id LIKE :appID", {
              appID: `%${filter.applicationID}%`,
            });
          }
        })
      )
      .take(filter.take)
      .skip(filter.offset)
      .orderBy("alert.timestamp", filter.time)
      .getManyAndCount();

    console.log(`Queries: ${query[1]}`);
    console.log(`Time taken ${Date.now() - start}/ms`);
    return query;
  },
};

export default alertController;

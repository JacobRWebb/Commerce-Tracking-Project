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
            return qb.where("alert.status != :s", { s: AlertStatus.ALL });
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
            return qb.where("alert.status != :s", { s: AlertStatus.ALL });
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
  getOne: async (_user: User, id: string) => {
    const alert = await Alert.findOne({ where: { id } });
    return alert;
  },
  update: async (user: User, inboundAlertUpdate: Partial<Alert>) => {
    const alert = await Alert.findOne({ where: { id: inboundAlertUpdate.id } });

    if (!alert) return false;

    const newStatus =
      inboundAlertUpdate.status === null ||
      inboundAlertUpdate.status === undefined
        ? alert.status
        : inboundAlertUpdate.status;
    const newComment =
      inboundAlertUpdate.comment === null ||
      inboundAlertUpdate.comment === undefined
        ? alert.comment
        : inboundAlertUpdate.comment;

    alert.status = newStatus;
    alert.comment = newComment;
    alert.user = user;
    await alert.save();

    return true;
  },
};

export default alertController;

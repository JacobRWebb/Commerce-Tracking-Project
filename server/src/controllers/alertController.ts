import {
  Brackets,
  getConnection,
  In,
  IsNull,
  Like,
  MoreThanOrEqual,
  Not,
} from "typeorm";
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

    const query = await getConnection()
      .getRepository(Alert)
      .findAndCount({
        take: filter.take,
        skip: filter.offset,
        relations: ["user", "application"],
        where: {
          application: {
            id:
              Like(`%${filter.applicationID}%`) &&
              filter.extended &&
              user.role === UserRole.ADMIN
                ? Not(IsNull())
                : In(
                    user.applications.map((app) => {
                      return app.id;
                    })
                  ),
          },
          status:
            filter.status === AlertStatus.ALL ? Not(IsNull()) : filter.status,
          timestamp:
            filter.extended && user.role === UserRole.ADMIN
              ? Not(IsNull())
              : MoreThanOrEqual(timeConstraint),
          hostname:
            filter.hostname.length < 1
              ? Not(IsNull())
              : Like(`%${filter.hostname}%`),
        },
        order: { timestamp: filter.time },
      });

    console.log(`Queries: ${query[1]}`);
    console.log(user);
    console.log(`Time taken ${Date.now() - start}/ms`);
    return query;
  },
};

const xalertController = {
  fetchAll: async (body: Object, user: User) => {
    const start = Date.now();

    let filter: IFilter = { ...defaultFilter, ...body };
    const timeConstraint = new Date();
    timeConstraint.setDate(timeConstraint.getDate() - USER_DAY_THRESHOLD);

    const connection = getConnection();

    const y = await connection
      .getRepository(Alert)
      .createQueryBuilder("alert")
      .leftJoinAndSelect("alert.user", "user")
      .leftJoinAndSelect("alert.application", "applications")
      .where(
        new Brackets((qb) => {
          if (filter.extended && user.role === UserRole.ADMIN) {
            return qb.where("alert.application.id IS NOT NULL");
          }
          return qb.where("alert.application.id IN (:...apps)", {
            apps: [
              ...user.applications.map((app) => {
                return app.id;
              }),
              "BASE",
            ],
          });
        })
      )
      .andWhere(
        new Brackets((qb) => {
          if (filter.status === AlertStatus.ALL)
            return qb.where("alert.status IS NOT NULL");
          return qb.where("alert.status = :status", { status: filter.status });
        })
      )
      .andWhere(
        new Brackets((qb) => {
          if (filter.extended && user.role === UserRole.ADMIN)
            return qb.where("alert.timestamp IS NOT NULL");
          return qb.where("alert.timestamp >= :timestamp", {
            timestamp: timeConstraint.toISOString(),
          });
        })
      )
      .andWhere(
        new Brackets((qb) => {
          if (filter.applicationID.length < 1)
            return qb.where("alert.hostname IS NOT NULL");
          return qb.where("alert.application.id LIKE :appid", {
            appid: `%${filter.applicationID}%`,
          });
        })
      )
      .andWhere(
        new Brackets((qb) => {
          if (filter.hostname.length < 1)
            return qb.where("alert.hostname IS NOT NULL");
          return qb.where("alert.hostname LIKE :hostname", {
            hostname: `%${filter.hostname}%`,
          });
        })
      )
      .orderBy("alert.timestamp", filter.time)
      .take(filter.take)
      .skip(filter.offset)
      .getManyAndCount()
      .catch(() => {
        console.log("Alert Controller error while fetching entries.");
      });

    const end = Date.now();
    console.log(`Took ${end - start}/ms`);

    return y;
  },
  update: async (
    body: {
      alertID: string | undefined;
      comment: string | undefined;
      status: AlertStatus | undefined;
    },
    user: User
  ): Promise<boolean> => {
    console.log(body);
    const { alertID, comment, status } = body;
    if (alertID === undefined) return false;
    const alert = await Alert.findOne({ where: { id: alertID } });
    if (alert === undefined) return false;
    if (comment !== undefined) alert.comment = comment;
    if (status !== undefined) alert.status = status;
    alert.user = user;
    await alert.save();

    return true;
  },
};
xalertController;

export default alertController;

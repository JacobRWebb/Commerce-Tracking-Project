import {
  Alert,
  Application,
  PrismaClient,
  Role,
  Status,
  User,
} from "@prisma/client";
import { IComment } from "../SocketHandler";
const prisma = new PrismaClient();

export interface IFilter {
  take: number;
  skip: number;
  order: "desc" | "asc";
  status: Status | null;
  hostname: string | null;
  applicationId: string | null;
  extended: boolean;
}

const initialFilter: IFilter = {
  take: 25,
  skip: 0,
  order: "desc",
  hostname: null,
  applicationId: null,
  extended: false,
  status: null,
};

const EntryController = {
  getAll: async (
    user: User & {
      applications: Application[];
    },
    inboundFilter: Partial<IFilter>
  ) => {
    let alertWithCount: { entries: Alert[]; count: number } = {
      entries: [],
      count: 0,
    };
    const filter: IFilter = { ...initialFilter, ...inboundFilter };
    const timeConstraint = new Date();
    timeConstraint.setDate(timeConstraint.getDate() - 2);

    //  CRITICAL @TODO: Rework because this will query double the work.

    const alertWhereOptions = {
      applicationId:
        filter.extended && user.role === Role.ADMIN
          ? { not: "" }
          : { in: user.applications.map((app) => app.id) },
      status:
        filter.status === null ? { notIn: [] } : { equals: filter.status },
      timestamp:
        filter.extended && user.role === Role.ADMIN
          ? { notIn: [] }
          : { gte: timeConstraint.toISOString() },
      hostname:
        filter.hostname === null
          ? { notIn: [] }
          : { contains: filter.hostname },
    };

    const count = await prisma.alert.count({
      where: alertWhereOptions,
      orderBy: { timestamp: filter.order },
    });

    const entries = await prisma.alert.findMany({
      where: alertWhereOptions,
      include: {
        application: true,
        user: true,
      },
      take: filter.take,
      skip: filter.skip,
      orderBy: { timestamp: filter.order },
    });

    alertWithCount = { entries, count };

    return alertWithCount;
  },

  fetchComments: async (entryId: string): Promise<IComment[]> => {
    const comments = await prisma.comment.findMany({
      where: { alertId: entryId },
      include: { user: { select: { username: true } } },
      orderBy: { createdAt: "desc" },
    });

    return comments;
  },
};

export default EntryController;

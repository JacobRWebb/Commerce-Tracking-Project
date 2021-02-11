import { IsNull, MoreThanOrEqual, Not } from "typeorm";
import { Alert, User, UserRoles } from "../entities";

//   editAlert: async (
//     alertId: number,
//     user: User | undefined,
//     changes: { comment: string; newState: 0 | 1 }
//   ) => {
//     let alert = await Alert.findOne({ where: { id: alertId } });
//     if (alert) {
//       alert.currentState = changes.newState;
//       if (changes.newState === 1) {
//         if (user) {
//           alert.user = user;
//         }
//         alert.comment = changes.comment;
//       }
//       await alert.save();
//       return alert;
//     }
//     return false;
//   },
// };

// export default IAlertController;

const AlertController = {
  fetchAll: async (
    user: User,
    filter: 0 | 1 | 2,
    extended: boolean,
    rowsPerPage: number,
    offset: number
  ) => {
    const date = new Date();
    date.setDate(date.getDate() - 2);

    let alerts: [Alert[], number] | void;

    alerts = await Alert.findAndCount({
      where: {
        timestamp:
          user.role === UserRoles.ADMIN && extended
            ? Not(IsNull())
            : MoreThanOrEqual(date.toISOString()),
        currentState: filter === 2 ? Not(2) : filter,
      },
      skip: offset,
      take: rowsPerPage,
    });

    return alerts;
  },
};

export default AlertController;

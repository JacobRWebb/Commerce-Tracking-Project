import jwt from "jsonwebtoken";
import moment from "moment";
import { User } from "../entities";

const UserController = {
  login: async (username: string, password: string) => {
    const user = await User.findOne({
      where: { username, password },
      select: ["id", "username", "password", "role", "lastLogout"],
    });
    if (user) {
      const token = jwt.sign(
        { id: user.id, password: user.password },
        `${process.env.JWT_SECRET}-${user.lastLogout}`,
        {
          expiresIn: "1d",
        }
      );
      return { token, user };
    }
    return false;
  },
  logout: async (username: string) => {
    const user = await User.findOne({ where: { username } });
    if (user) {
      user.lastLogout = moment().format();
      await user.save();
    }
  },
};

export default UserController;

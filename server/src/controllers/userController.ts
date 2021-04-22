import jwt from "jsonwebtoken";
import { User } from "../entities";

const UserController = {
  login: async (username: string, password: string) => {
    const user = await User.findOne({ where: { username, password } });

    if (user) {
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });
      return {
        token,
        user,
      };
    }

    return false;
  },
};

export default UserController;

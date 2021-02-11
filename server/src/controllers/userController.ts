import { User } from "../entities";

const UserController = {
  login: async (username: string, password: string) => {
    const user = await User.findOne({ where: { username, password } }).catch(
      () => undefined
    );
    if (!user) return undefined;
    return user;
  },
};

export default UserController;

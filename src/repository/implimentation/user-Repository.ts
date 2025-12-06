import { Iuser, User } from "@/models/userModal";
import { BaseRepository } from "@/repository/implimentation/base-Repository";
import { Service } from "typedi";

@Service()
export class UserRepository extends BaseRepository<Iuser> {
  constructor() {
    super(User);
  }

  async findUserByEmail(email: string): Promise<Iuser | null> {
    try {
      return await User.findOne({ email });
    } catch (error) {
      throw new Error("caught error from exist user check");
    }
  }
}

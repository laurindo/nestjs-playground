import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { UserService } from './user.service';
import { UserModel } from './user.model';
import { UserInput } from './user.dto';

@Resolver(() => UserModel)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Mutation(() => UserModel)
  async create(@Args('userData') userData: UserInput) {
    return this.userService.create(userData);
  }
}

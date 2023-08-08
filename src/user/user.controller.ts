import {
  Body,
  Controller,
  Get,
  Post,
  Patch,
  Query,
  Param,
  Delete,
  NotFoundException,
  Session,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Serialize } from '../interceptors/serialize.interceptor';
import { UserDto } from './dto/user.dto';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/current-user.decorator';
import { User } from './user.entity';
import { AuthGuard } from '../guards/auth.guard';
import { AuthRevokeAllGuard } from '../guards/auth-revoke-all.guard';

@Controller('auth')
@Serialize(UserDto)
export class UserController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @Get('/colors/:color')
  setColor(@Param('color') color: string, @Session() session: any) {
    console.log('color');
    session.color = color;
  }

  @Get('/colors')
  getColor(@Session() session: any) {
    return session.color;
  }

  @Get('/me')
  @UseGuards(AuthGuard)
  async me(@CurrentUser() user: User) {
    return user;
    // async me(@Session() session: any) {
    // const user = this.userService.findOne(session.userId);
    //
    // if (!user) {
    //   throw new UnauthorizedException('No user found');
    // }
    //
    // return user;
  }

  @Get('/signout')
  signout(@Session() session: any) {
    session.userId = null;
  }

  @Post('/signup')
  @UseGuards(AuthRevokeAllGuard)
  async createUser(@Body() body: CreateUserDto, @Session() session: any) {
    const { email, password } = body;

    const user = await this.authService.signup(email, password);
    session.userId = user.id;

    return user;
  }

  @Post('/signin')
  async signin(@Body() body: CreateUserDto, @Session() session: any) {
    const { email, password } = body;

    const user = await this.authService.signin(email, password);
    session.userId = user.id;

    return user;
  }

  @Patch('/:id')
  @UseGuards(AuthRevokeAllGuard)
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    const { email, password } = body;

    return this.userService.update(id, { email, password });
  }

  @Get('/:id')
  async findUser(@Param('id') id: string) {
    const user = await this.userService.findOne(id);

    if (!user) {
      throw new NotFoundException('user not found');
    }

    return user;
  }

  @Get()
  findAllUsers(@Query('email') email: string) {
    return this.userService.find(email);
  }

  @Delete('/:id')
  @UseGuards(AuthRevokeAllGuard)
  removeUser(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}

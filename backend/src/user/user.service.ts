import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { User } from './entities/user.entity';
import { LoginUserDto } from './dto/login-user.dto';
@Injectable()
export class UserService {
  @Inject(DbService)
  private readonly dbService: DbService;

  async register(registerUserDto: RegisterUserDto) {
    const users: User[] = await this.dbService.read();
    console.log(users);

    const foundUser = users.find(
      (item) => item.username === registerUserDto.username,
    );
    if (foundUser) {
      throw new BadRequestException('User already registered');
    }
    users.push(registerUserDto);
    await this.dbService.write(users);
    return {
      code: 200,
      message: 'Registration successful',
      data: registerUserDto,
    };
  }

  async login(loginUserDto: LoginUserDto) {
    const users: User[] = await this.dbService.read();
    const foundUser = users.find(
      (item) => item.username === loginUserDto.username,
    );
    if (!foundUser) {
      throw new BadRequestException('User does not exist');
    }
    if (foundUser.password !== loginUserDto.password) {
      throw new BadRequestException('Invalid username or password');
    }
    return {
      code: 200,
      message: 'Login successful',
      data: foundUser,
    };
  }
}

import { Controller, Post, Body } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { User } from './user.model';
import { MessagePattern } from '@nestjs/microservices';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Post()
    create(@Body() createUserDto: CreateUserDto): User {
        return this.usersService.create(createUserDto);
    }
    @MessagePattern('listar_usuarios')
    listarUsuarios() {
        return [{ id: 1, nome: 'Usuário de exemplo' }];
    }
}

import { Controller, Get, Post, Body, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AuthService } from './auth.service';
@Controller('auth')
export class AuthController {
	constructor(
		private readonly authService: AuthService,
		@Inject('AUTH_SERVICE') private readonly client: ClientProxy,
	) { }

	@Get('usuarios')
	async getUsuarios() {
		return this.client.send('listar_usuarios', {});
	}

	@Post('register')
	async register(@Body() body: any) {
		console.log('Dados recebidos para registro:', body);
		return "ok";
	}
}

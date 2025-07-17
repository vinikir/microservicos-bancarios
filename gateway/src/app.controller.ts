import { Controller, Get, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { HttpService as NestHttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Controller()
export class AppController {
  constructor(private readonly httpService: NestHttpService) {}

  @Get('auth/*')
  async proxyAuth(@Req() req: Request, @Res() res: Response) {
    const url = `http://auth-service:3000${req.url.replace('/auth', '')}`;
    const response = await firstValueFrom(this.httpService.get(url));
    res.status(response.status).json(response.data);
  }

  @Get('account/*')
  async proxyAccount(@Req() req: Request, @Res() res: Response) {
    const url = `http://account-service:3000${req.url.replace('/account', '')}`;
    const response = await firstValueFrom(this.httpService.get(url));
    res.status(response.status).json(response.data);
  }

  // Você pode adicionar outros proxies aqui
}

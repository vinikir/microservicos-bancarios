import { Controller, Get, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { HttpService as NestHttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Controller("/teste")
export class AppController {
  constructor(private readonly httpService: NestHttpService) {}

  @Get('t')
  async proxyAuth(@Req() req: Request, @Res() res: Response) {
   
    res.status(200).json({"ok":true});
  }

  @Get('c')
  async proxyAccount(@Req() req: Request, @Res() res: Response) {
    res.status(200).json({"ok2":true});
  }

  // Você pode adicionar outros proxies aqui
}

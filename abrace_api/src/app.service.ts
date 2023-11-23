import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): {cpx: string} {
    return {cpx:'Cu Prikito Xinin'};
  }
}

import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import { SignupModel } from '../models/signup.model';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(private configService: ConfigService) { }
  signup(signupModel: SignupModel) {
    const configUrl = 'http://192.168.0.104:8085/pracpro/test';
    return this.configService.postConfig(configUrl, signupModel);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ResponseModel } from '../models/response.model';
import { SignupModel } from '../models/signup.model';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  constructor(private httpClient: HttpClient) { }

  getConfig(configUrl: string) {
      return this.httpClient.get<ResponseModel>(configUrl);
  }

  postConfig(configUrl: string, signupModel: SignupModel) {
    return this.httpClient.post<ResponseModel>(configUrl, signupModel);
  }
}

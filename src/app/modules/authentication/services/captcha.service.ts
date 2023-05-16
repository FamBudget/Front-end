import { Injectable } from '@angular/core';
import { RecaptchaErrorParameters } from 'ng-recaptcha';

@Injectable()
export class CaptchaService {
  public captchaResponse: string = '';

  constructor() {}

  public resolved(captchaResponse: string): void {
    const newRes = captchaResponse
      ? `${captchaResponse.substring(0, 7)}...${captchaResponse.substring(-7)}`
      : captchaResponse;

    this.captchaResponse = `${JSON.stringify(newRes)}\n`;
  }

  public onError(errDetail: RecaptchaErrorParameters): void {
    this.captchaResponse += 'ERROR; error details (if any) have been logged to console';
    console.log('reCAPTCHA error; details:', errDetail);
  }
}

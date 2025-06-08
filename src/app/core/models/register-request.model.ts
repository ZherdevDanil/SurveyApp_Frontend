export interface RegisterRequest{
  username: string;
  email: string;
  password: string;
  recaptchaToken?:string;
}
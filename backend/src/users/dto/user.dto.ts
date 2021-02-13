import { IsEmail, IsNotEmpty } from "class-validator";

export class UserDto {

  @IsNotEmpty()
  readonly name: string;
  
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;
}
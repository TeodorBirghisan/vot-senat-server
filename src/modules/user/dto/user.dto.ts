export class UserDto {
  readonly email: string;
  readonly password: string;
  readonly name: string;
  readonly role: string;
  readonly phoneNumber: string;

  constructor(
    email: string,
    password: string,
    name?: string,
    role?: string,
    phoneNumber?: string,
  ) {
    this.email = email;
    this.password = password;
    this.name = name ?? '';
    this.role = role ?? '';
    this.phoneNumber = phoneNumber ?? '';
  }
}

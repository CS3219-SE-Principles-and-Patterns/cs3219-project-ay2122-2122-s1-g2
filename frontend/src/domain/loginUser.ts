export interface LoginProps {
  username: string;
  password: string;
}

export class LoginUser implements LoginProps {
  username: string;
  password: string;

  private constructor(props: LoginProps) {
    this.username = props.username;
    this.password = props.password;
  }

  public static create(props: LoginProps): LoginUser {
    // To perform validation
    return new LoginUser(props);
  }
}

import { LoginProps, LoginUser } from "../domain/loginUser";
import { LoginInfra } from "../infra/login";
export class LoginController {
  public static loginUser = async (props: LoginProps) => {
    const user: LoginUser = LoginUser.create(props);
    return await LoginInfra.loginUser(user);
  };

  public static registerUser = async (props: LoginProps) => {
    const user: LoginUser = LoginUser.create(props);
    return await LoginInfra.registerUser(user);
  };

  public static resetPassword = async (props: LoginProps) => {
    const user: LoginUser = LoginUser.create(props);
    return await LoginInfra.resetPassword(user);
  };

  public static getNewAccessToken = async (props: LoginProps) => {
    const user: LoginUser = LoginUser.create(props);
    return await LoginInfra.getNewAccessToken(user);
  };
  public static verifyToken = async () => {
    return await LoginInfra.verifyToken();
  };
}

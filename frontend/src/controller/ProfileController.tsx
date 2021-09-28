import { Profile, ProfileProps } from "../domain/profile";
import { ProfileInfra } from "../infra/profile";

export class ProfileController {
  public static editProfile = (props: ProfileProps) => {
    const profile: Profile = Profile.create(props);
    return ProfileInfra.editProfile(profile);
  };
}

import { Profile, ProfileProps } from "../domain/profile";
import { ProfileInfra } from "../infra/profile";

export class ProfileController {
  public static editProfile = async (props: ProfileProps) => {
    const profile: Profile = Profile.create(props);
    return await ProfileInfra.editProfile(profile);
  };

  public static createProfile = async (props: ProfileProps) => {
    const profile: Profile = Profile.create(props);
    return await ProfileInfra.createProfile(profile);
  };

  public static getProfile = async (): Promise<Profile> => {
    const res = await ProfileInfra.getProfile();
    return Profile.create({
      languages: res.data.data.languages,
      proficiencies: res.data.data.proficiencies,
      username: res.data.data.username
    });
  };
}

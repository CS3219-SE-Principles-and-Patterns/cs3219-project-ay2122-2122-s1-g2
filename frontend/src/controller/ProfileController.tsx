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
    const data = res.data.data;
    return Profile.create({
      username: data.username,
      languages: data.languages,
      proficiencies: data.proficiencies,
    });
  };
}

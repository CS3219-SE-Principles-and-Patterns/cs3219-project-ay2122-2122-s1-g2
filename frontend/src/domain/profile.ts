export interface ProfileProps {
  username?: string;
  languages: string[];
  proficiencies: number[];
}

export class Profile implements ProfileProps {
  languages: string[];
  proficiencies: number[];
  username?: string;
  private constructor(props: ProfileProps) {
    this.languages = props.languages;
    this.proficiencies = props.proficiencies;
    this.username = props.username;
  }
  public static create(props: ProfileProps): Profile {
    if (props.languages.length === 0) {
      throw new Error("Please select at least one language");
    } else {
      return new Profile(props);
    }
  }
}

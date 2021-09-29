export interface ProfileProps {
  languages: string[];
  proficiencies: number[];
}

export class Profile implements ProfileProps {
  languages: string[];
  proficiencies: number[];
  private constructor(props: ProfileProps) {
    this.languages = props.languages;
    this.proficiencies = props.proficiencies;
  }
  public static create(props: ProfileProps): Profile {
    if (props.languages.length === 0) {
      throw new Error("Please select at least one language");
    } else {
      return new Profile(props);
    }
  }
}

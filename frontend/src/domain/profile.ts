export interface ProfileProps {
  languages: string[];
  proficiency: number;
}

export class Profile implements ProfileProps {
  languages: string[];
  proficiency: number;
  private constructor(props: ProfileProps) {
    this.languages = props.languages;
    this.proficiency = props.proficiency;
  }
  public static create(props: ProfileProps) {
    if (props.languages.length === 0) {
      throw new Error("Please select at least one language");
    } else {
      return new Profile(props);
    }
  }
}

export interface Character {
  id: string;
  name: string;
  status: Status;
  species: string;
  type: string;
  gender: Gender;
  origin: string;
  location: string;
  image: string;
}

export interface UserCharacter {
  id: string;
  isFavorite: boolean;
  character: Character;
}

export enum Status {
  ALIVE = 'Alive',
  DEAD = 'Dead',
  UNKNOWN = 'Unknown',
}

export enum Gender {
  FEMALE = 'Female',
  MALE = 'Male',
  GENDERLESS = 'Genderless',
  UNKNOWN = 'Unknown',
}

export type GetUserCharactersQueryParameters = Partial<{
  userId: number;
  species: string;
  status: Status;
  gender: Gender;
  name: string;
}>;

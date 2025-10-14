export interface GamesByConsole {
  consoleId: string;
  consoleName: string;
  games: Game[];
}
export interface Game {
  id: UUID;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}
export interface GameById {
  id: UUID;
  name: string;
  description: string;
  price: number;
  images: Images[];
  genres: string[];
}
export interface Images {
  url: string;
  type: string;
}
export type UUID = `${string}-${string}-${string}-${string}-${string}`;

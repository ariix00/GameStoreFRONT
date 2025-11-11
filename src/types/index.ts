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
  stock: number | undefined;
}
export interface Images {
  url: string | undefined;
  type: string;
}
export interface Genres {
  name: string;
}
export type UUID = `${string}-${string}-${string}-${string}-${string}`;

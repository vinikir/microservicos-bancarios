export interface User {
  id: number;
  username: string;
  email: string;
  password: string; // Lembre-se: em produção, armazene só hash!
}

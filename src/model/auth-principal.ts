export default interface AuthPrincipal {
  user: User
  accessToken: string;
  roles: string[];
}

export interface User {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
}

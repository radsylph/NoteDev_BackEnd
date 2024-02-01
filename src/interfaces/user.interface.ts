export default interface UserInterface {
  username: string;
  password: string;
  email: string;
  verifyPassword: (password: string) => Promise<boolean>;
}

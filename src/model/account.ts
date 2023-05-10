export default interface Account {
  id: string;
  displayName: string;
  role: string;
  isOrganization: boolean;
  accountType: AccountType;
}

export interface AccountType {
  name: string;
  feature: any;
}

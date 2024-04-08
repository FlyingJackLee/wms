export interface Authority {
  authority: Role | Permission;
}

export enum Role{
  ROLE_DEFAULT,  ROLE_OWNER, ROLE_STAFF, ROLE_ADMIN, BLANK
}

export enum Permission{
  SHOPPING = "PERMISSION:shopping", INVENTORY = "PERMISSION:inventory", STATISTICS = "PERMISSION:statistic"
}

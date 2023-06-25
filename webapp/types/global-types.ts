// Enums
import { ThemeColorsEnum, ThemeModesEnum, MethodsEnum } from "@enums";
import { StringLiteral } from "typescript";

// ----- THEME ----- \\
export type ThemeSliceType = {
  mode: ThemeModesEnum;
  themeColor: ThemeColorsEnum;
};

// ----- TABLE ----- \\
export type ColumnType = {
  name: string;
  key: string;
  show: boolean;
  sortable: boolean;
  sortDirection: "asc" | "desc" | "none";
  sortType: "string" | "number" | "date" | "boolean" | "none";
};
export type TableMetaType = {
  columns: ColumnType[];
  lastSortedColumn: null | ColumnType;
  lastSearch: string;
  lastPage: number;
  lastRowsPerPage: number;
};

// ----- APIS ----- \\
export type ApiType = {
  endpoint: string;
  apiRoute: string;
  method: MethodsEnum;
};
export type ApisType = {
  // AUTH
  signIn: ApiType;
  forgetPassword: ApiType;
  confirmPassword: ApiType;
  changePassword: ApiType;
  requestAttributeVerification: ApiType;
  verifyAttributeVerification: ApiType;
  tenantSignup: ApiType;
  checkSubDomainAvailability: ApiType;
  updateAttributes: ApiType;
  // USER MANAGEMENT
  createUser: ApiType;
  getUserList: ApiType;
  enableUser: ApiType;
  disableUser: ApiType;
  deleteUser: ApiType;
  updateUser: ApiType;
  // POLICY MANAGEMENT
  getPolicyList: ApiType;
  createPolicy: ApiType;
  updatePolicy: ApiType;
  deletePolicy: ApiType;
  attachPolicy: ApiType;
  detachPolicy: ApiType;
  getUserPolicies: ApiType;
  getSelfPolicies: ApiType;
  getResources: ApiType;
  getUserAuthResources: ApiType;
  // ACCOUNTS MANAGEMENT
  updateAccount: ApiType;
  createAccount: ApiType;
  getAccount: ApiType;
  getAccountMetaList: ApiType;
  // INSTITUTE MANAGEMENT
  getInstitute: ApiType;
  getInstituteMetaList: ApiType;
  createInstitute: ApiType;
  updateInstitute: ApiType;
  // MASTER DEGREE
  getDegreeList: ApiType;
  getActiveDegreeListForInstitute: ApiType;
  activateDegree: ApiType;
  // DEPARTMENT
  getDepartmentList: ApiType;
  createDepartment: ApiType;
  updateDepartment: ApiType;
  lockDepartment: ApiType;
  unlockDepartment: ApiType;
  // SUBJECT
  getSubjectList: ApiType;
  createSubject: ApiType;
  updateSubject: ApiType;
  deleteSubject: ApiType;
  // PROGRAM
  getProgramList: ApiType;
  createProgram: ApiType;
  updateProgram: ApiType;
  deleteProgram: ApiType;
  // TEAMS
  getTeamList: ApiType;
  createTeam: ApiType;
  updateTeam: ApiType;
  updateTeamUsers: ApiType;
  addPolicyToTeam: ApiType;
  removePolicyFromTeam: ApiType;
  // COURSE BLUE PRINT
  getCourseBluePrintList: ApiType;
  createCourseBluePrint: ApiType;
  getVersionList: ApiType;
  createVersion: ApiType;
  updateVersion: ApiType;
  activateVersion: ApiType;
  setDefaultVersion: ApiType;
  getInstanceList: ApiType;
  createInstance: ApiType;
  updateInstance: ApiType;
  // ACADEMIC YEAR
  getAcademicYearList: ApiType;
  createAcademicYear: ApiType;
  updateAcademicYear: ApiType;
};

// ----- AUTH ----- \\
export type LoginBodyType = {
  username: string;
  password: string;
  newPassword?: string;
};
export type ForgetPasswordBodyType = {
  username: string;
};
export type ConfirmPasswordBodyType = {
  username: string;
  code: string;
  password: string;
};
export type ChangePasswordBodyType = {
  newPassword: string;
};
export type VerificationType = "email" | "phone_number";
export type TenantSignupType = {
  user_details: {
    name: string;
    phone_number: string;
    email: string;
    password: string;
    username: string;
    picture: string;
  };
  organization_details: {
    logo: string;
    name: string;
    contact: string;
    type: string;
    language: string[];
    address: string;
    city: string;
    state: string;
    country: string;
    zip_code: number | undefined;
    sub_domain: string;
  };
  verification_code?: string;
};
export type UpdateAttributeBodyType = {
  attributes: {
    email: string;
    phone_number: string;
    name: string;
    picture?: string;
  };
};

// ----- USER MANAGEMENT ----- \\
export type CreateUserType = {
  username: string;
  name: string;
  phone_number: string;
  email: string;
  password: string;
  GroupName: string;
  customAttributes: {
    department: string;
    designation: string;
    language: string;
    faculty: string;
  };
  picture?: string;
};
export type UserType = {
  Username: string;
  UserCreateDate: string;
  UserLastModifiedDate: string;
  Enabled: true;
  UserStatus: string;
  sub: string;
  email_verified: string;
  "custom:language": string;
  "custom:department": string;
  name: string;
  phone_number_verified: string;
  phone_number: string;
  "custom:faculty": string;
  "custom:designation": string;
  email: string;
  picture?: string;
};
export type UpdateUserBodyType = {
  username: string;
  attributes: {
    email: string;
    phone_number: string;
    name: string;
    picture?: string;
  };
  customAttributes: {
    language: string;
    faculty: string;
    department: string;
    designation: string;
  };
};

// ----- POLICY MANAGEMENT ----- \\
export type ConditionsType = object;
export type PermissionType = {
  Action: string;
  AccessLevel: string;
  Conditions: ConditionsType;
  ResourceId: string;
  _id: string;
  Description: string;
};
export type StatementType = {
  ResourceType: string;
  Permissions: PermissionType[];
  _id: string;
};
export type PolicyType = {
  _id: string;
  PolicyName: string;
  Description: string;
  PermissionCount: number;
  Statements: StatementType[];
  AccessBucketId: string;
  Subscriptions: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  PolicyId: string;
};
export type PolicyStatementType = {
  Conditions: { [key: string]: string };
  ResourceId: string;
};
export type CreateUpdatePolicyType = {
  PolicyName: string;
  Description: string;
  Statements: PolicyStatementType[];
};
export type AttachDetachPolicyType = {
  Policies: string[];
  Identities: string[];
};
export type ActionType = {
  Action: string;
  Description: string;
  RequiredConditionKey: string[];
  ResourceId: string;
};
export type ResourceType = {
  _id: string;
  Actions: ActionType[];
};
export type UserResourcesType = {
  [key: string]: string[];
};

// ------- ACCOUNTS MANAGEMENT -----
export type AccountMetaType = {
  Meta: {
    AccountName: string;
    Logo: string;
    AccountType: string;
  };
  Address: string;
  account_id: string;
};
export type AccountType = {
  account_id?: string;
  Meta: {
    AccountName: string;
    Logo: string;
    AccountType:
      | "Manufacturing"
      | "Trading"
      | "Retaile"
      | "Wholesale"
      | "Export"
      | "Others";
    Languages: string[];
  };
  Address: {
    AddressLine: string;
    City: string;
    State: string;
    Country: string;
    Pincode: string;
  };
  Account: {
    Name: string;
    Phone: string;
    Mobile: String;
    Email: String;
  };
  AccountInfo: {
    AccountGST: string;
    AccountPAN: string;
  };
  AccountConfig: {
    AutoBackup: boolean;
  };
};

// ------ CATALOG ------ \\
export type ProductMetaType = {
  Meta: {
    CatalogName: string;
    CatalogID: string;
  };
  Properties: string;
  product_id: string;
};
export type ProductType = {
  product_id?: string;
  Meta: {
    CatalogName: string;
    CatalogID: string;
    SpecialProduct: boolean;
  };
  Properties: {
    Description: string;
    Price: number;
    Rating: number;
  };
  Inventory: {
    TotalQuantity: string;
  };
  Category: {
    CategoryCode: string;
    CategoryName: string;
  };
  SubCategory: {
    SubCategoryCode: string;
    SubCategoryName: string;
  };
  Images: {
    ProductImages: string[];
  };
};

// ----- MASTER DEGREE ----- \\
export type DegreeType = {
  _id: string;
  DegreeName: string;
  DegreeCode: string;
  DegreeShortName: string;
  Subscriptions?: string[];
  createdAt?: string;
  updatedAt?: string;
};

// ------- PRODUCT CATEGORY -- \\
export type CategoryType = {
  _id: string;
  CategoryName: string;
  CategoryCode: string;
  CategoryShortName: string;
  Status: "LOCKED" | "UNLOCKED";
  account_id: string;
  createdAt: string;
  updatedAt: string;
};
export type CreateUpdateCategoryType = {
  CategoryName: string;
  CategoryCode: string;
  CategoryShortName: string;
};

// ------- PRODUCT SUBCATEGORY ----- \\
export type SubCategoryType = {
  _id: string;
  CategoryCode: string;
  CategoryName: string;
  SubCategoryName: string;
  SubCategoryCode: string;
  SubCategoryShortName: string;
  Rate: number;
  Status: "LOCKED" | "UNLOCKED";
  account_id: string;
  createdAt: string;
  updatedAt: string;
};
export type CreateUpdateSubCategoryType = {
  SubCategoryName: string;
  SubCategoryCode: string;
  SubCategoryShortName: string;
  Rate: number;
};

// ------- PACKAGING TYPE --- \\
export type PackagingType = {
  _id: string;
  Name: string;
  Rate: number;
  createdAt: string;
  updatedAt: string;
};
export type CreateUpdatePackagingType = {
  Name: string;
  Rate: number;
};

// ----- DEPARTMENT ----- \\
export type DepartmentType = {
  _id: string;
  DepartmentName: string;
  DepartmentCode: string;
  DepartmentShortName: string;
  Status: "LOCKED" | "UNLOCKED";
  Subscriptions: string[];
  institute_id: string;
  createdAt: string;
  updatedAt: string;
};
export type CreateUpdateDepartmentType = {
  DepartmentName: string;
  DepartmentCode: string;
  DepartmentShortName: string;
};

// ----- SUBJECT ----- \\
export type MarksPatternType = {
  Type: string;
  MinMarks: number;
  MaxMarks: number;
  PassingMarks: number;
  Label: string;
  subject_id?: string;
};
export type SubjectType = {
  SubjectName: string;
  SubjectShortName: string;
  SubjectCredits: number;
  SubjectCode: string;
  YearWiseMaxSeats: number;
  SubjectMedium: string[];
  MarksPattern: MarksPatternType[];
  _archive: { status: false };
  subject_id: string;
  Subscriptions: string[];
  institutesubject_id: string;
  createdAt: string;
  updatedAt: string;
};
export type CreateUpdateSubjectType = {
  SubjectName: string;
  SubjectShortName: string;
  SubjectCredits: number;
  SubjectCode: string;
  YearWiseMaxSeats: number;
  SubjectMedium: string[];
  MarksPattern: MarksPatternType[];
};

// ----- PROGRAM ----- \\
export type ProgramType = {
  _id: string;
  ProgramName: string;
  ProgramCode: string;
  BranchName: string;
  Degree: DegreeType;
  Department: DepartmentType;
  Subscriptions: string[];
  institute_id: string;
  _archive: { status: boolean };
  createdAt: string;
  updatedAt: string;
};
export type CreateUpdateProgramType = {
  ProgramName: string;
  ProgramCode: string;
  BranchName: string;
  Degree: string;
  Department: string;
};

// ----- TEAMS ----- \\
export type TeamType = {
  TeamCode?: string | undefined;
  TeamName: string;
  TeamDescription: string;
  institute_id: string;
  Owner: string;
  TeamAssociation: {
    Name: string;
    Ref: string;
    Meta: {};
  }[];
  Status: "Active" | "Suspend" | "Archived" | "Created";
  Components: { Policy: { PoliciesId: string[] } };
  Tasks: {
    Description: string;
    Name: string;
    AssignedTo: string[];
    DueDate: Date;
    CreatedBy: string;
    Reference: {};
  }[];
  Board: {
    Title: string;
    Description: string;
  }[];
  Events: {
    Scope?: string | undefined;
    Name: string;
    Description: string;
    Meta: {};
    Source: string;
  }[];
  TeamUserSubscriptions: {
    User: string;
    Profile: string;
  }[];
  createdAt: string;
  updatedAt: string;
};
export type CreateUpdateTeamType = {
  TeamName: string;
  TeamCode: string;
  TeamDescription: string;
};
export type UpdateTeamUsersType = {
  users: string[];
};
export type AddPolicyToTeamType = {
  Policies: string[];
};

// ------ ACCOUNT FORM BLUEPRINT ------ \\
export type AccountBluePrintType = {
  _id: string;
  AccountName: string;
  AccountType: string;
  Name: string;
  Phone: string;
  _active: { status: boolean };
  createdAt: string;
  updatedAt: string;
};
export type CreateUpdateAccountBluePrintType = {
  AccountName: string;
  Name: string;
  Phone: string;
};

// ----- COURSE BLUE PRINT ----- \\
export type AssessmentSubjectType = {
  Subject: string;
  SubjectName: string;
  Credits: number;
  Elective: boolean;
  _id?: string;
};
export type AssessmentType = {
  Name: string;
  FailureCriteria: number;
  PassCriteria: number;
  ProcessingCriteria: number;
  Subjects: AssessmentSubjectType[];
  CourseYear: number;
  _id?: string;
};
export type CreateCbpAndCreateUpdateVersionType = {
  Name?: string;
  Branch?: string;
  Code?: string;
  Program?: string;
  Electives?: boolean;
  Duration?: number;
  AssessmentPerPeriod?: number;
  Assessments?: AssessmentType[];
};
export type CourseBluePrintType = {
  _id: string;
  Identifier: string;
  Revisions?: CourseBluePrintRevisionType[];
  DefaultVersion: number;
  TotalRevision: number;
  course_blueprint_id: string;
  institute_id: string;
  createdAt: string;
  updatedAt: string;
};
export type CourseBluePrintRevisionType = {
  CourseBluePrintVersion: string;
  CourseBluePrintVersionId: string;
  Status: string;
  _id: string;
  Revision: number;
};
export type GetVersionListType = {
  _id: string;
  Revisions: GetVersionListRevisionType[];
  DefaultVersion: number;
  TotalRevision: number;
  course_blueprint_id: string;
  institute_id: string;
  createdAt: string;
  updatedAt: string;
};
export type GetVersionListRevisionType = {
  CourseBluePrintVersion: {
    _id: string;
    Name: string;
    Branch: string;
    Code: string;
    Duration: number;
    Program: string;
    Electives: false;
    AssessmentPerPeriod: number;
    Assessments: AssessmentType[];
    course_blueprint_version_id: string;
    institute_id: string;
    createdAt: string;
    updatedAt: string;
  };
  CourseBluePrintVersionId: string;
  Status: "Draft" | "Active" | "Inactive" | "Archived";
  _id: string;
  Revision: number;
};
export type InstanceType = {
  _id: string;
  CourseBluePrintId: string;
  CourseBluePrintVersionId: string;
  CourseAcademicYearMap: {
    CourseYear: number;
    AcademicYear: {
      _id: string;
      Name: string;
      Year: number;
      institute_id: string;
      Subscriptions: any[];
      __v: number;
    };
    _id: string;
  }[];
  Sessions: any[];
  course_instance_id: string;
  institute_id: string;
  createdAt: string;
  updatedAt: string;
  CourseBluePrintVersion?: {
    _id: string;
    Name: string;
    Branch: string;
    Code: string;
    MaxDuration: number;
    MinDuration: number;
    Program: string;
    Electives: boolean;
    AssessmentPerPeriod: number;
    MaxAssessmentPerPeriod: number;
    Assessments: AssessmentType[];
    course_blueprint_version_id: string;
    institute_id: string;
    createdAt: string;
    updatedAt: string;
  };
  CourseBluePrint?: {
    _id: string;
    Revisions: {
      CourseBluePrintVersion: string;
      CourseBluePrintVersionId: string;
      Status: string;
      _id: string;
      Revision: number;
    }[];
    DefaultVersion: number;
    TotalRevision: number;
    course_blueprint_id: string;
    institute_id: string;
    createdAt: string;
    updatedAt: string;
  };
};
export type CourseAcademicYearMapType = {
  AcademicYear: string;
  CourseYear: number | null;
};
export type CreateUpdateInstanceType = {
  CourseBluePrintId: string;
  CourseBluePrintVersionId: string;
  CourseAcademicYearMap: CourseAcademicYearMapType[];
};

// ----- ACADEMIC YEAR ----- \\
export type AcademicYearType = {
  _id: string;
  Name: string;
  Year: number;
  institute_id: string;
  Subscriptions: [];
  __v: number;
};
export type CreateUpdateAcademicYearType = {
  Name: string;
  Year: number;
};

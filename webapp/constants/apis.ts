// TO DO
// 1. Add endpoints for
//  - accounts management apis : create,update,get,list

const IDMS = process.env.IDMS;
const CAMPUS_COMPUTE = process.env.CAMPUS_COMPUTE;
const GKS = process.env.GKS;

// Types & Enums
import { ApisType } from "@/types/global-types";
import { MethodsEnum } from "@/types/global-enums";

// Constants
import { NO_VALUE } from "./globals";

export const apis: ApisType = {
  // AUTH
  signIn: {
    endpoint: `${IDMS}/auth/sign-in`,
    apiRoute: NO_VALUE,
    method: MethodsEnum.POST,
  },
  forgetPassword: {
    endpoint: `${IDMS}/auth/forget-password`,
    apiRoute: "/api/auth/forget-password",
    method: MethodsEnum.POST,
  },
  confirmPassword: {
    endpoint: `${IDMS}/auth/confirm-password`,
    apiRoute: "/api/auth/confirm-password",
    method: MethodsEnum.POST,
  },
  changePassword: {
    endpoint: `${IDMS}/auth/change-password`,
    apiRoute: "/api/auth/change-password",
    method: MethodsEnum.POST,
  },
  requestAttributeVerification: {
    endpoint: `${IDMS}/auth/verify`,
    apiRoute: "/api/auth/request-attribute-verification",
    method: MethodsEnum.GET,
  },
  verifyAttributeVerification: {
    endpoint: `${IDMS}/auth/verify`,
    apiRoute: "/api/auth/verify-attribute-verification",
    method: MethodsEnum.PUT,
  },
  tenantSignup: {
    endpoint: `${CAMPUS_COMPUTE}/tenant`,
    apiRoute: "/api/auth/tenant-signup",
    method: MethodsEnum.POST,
  },
  checkSubDomainAvailability: {
    endpoint: `${IDMS}/domain`,
    apiRoute: "/api/auth/check-subdomain-availability",
    method: MethodsEnum.GET,
  },
  updateAttributes: {
    endpoint: `${IDMS}/auth/attribute`,
    apiRoute: "/api/auth/update-attributes",
    method: MethodsEnum.PUT,
  },
  // USER MANAGEMENT
  createUser: {
    endpoint: `${IDMS}/user`,
    apiRoute: "/api/user-management/create-user",
    method: MethodsEnum.POST,
  },
  getUserList: {
    endpoint: `${IDMS}/user/users`,
    apiRoute: "/api/user-management/get-user-list",
    method: MethodsEnum.GET,
  },
  enableUser: {
    endpoint: `${IDMS}/user/enable`,
    apiRoute: "/api/user-management/enable-user",
    method: MethodsEnum.PATCH,
  },
  disableUser: {
    endpoint: `${IDMS}/user/disable`,
    apiRoute: "/api/user-management/disable-user",
    method: MethodsEnum.PATCH,
  },
  deleteUser: {
    endpoint: `${IDMS}/user`,
    apiRoute: "/api/user-management/delete-user",
    method: MethodsEnum.DELETE,
  },
  updateUser: {
    endpoint: `${IDMS}/user`,
    apiRoute: "/api/user-management/update-user",
    method: MethodsEnum.PUT,
  },
  // POLICY MANAGEMENT
  getPolicyList: {
    endpoint: `${GKS}/policy`,
    apiRoute: "/api/policy-management/get-policy-list",
    method: MethodsEnum.GET,
  },
  createPolicy: {
    endpoint: `${GKS}/policy`,
    apiRoute: "/api/policy-management/create-policy",
    method: MethodsEnum.POST,
  },
  updatePolicy: {
    endpoint: `${GKS}/policy`,
    apiRoute: "/api/policy-management/update-policy",
    method: MethodsEnum.PATCH,
  },
  deletePolicy: {
    endpoint: `${GKS}/policy`,
    apiRoute: "/api/policy-management/delete-policy",
    method: MethodsEnum.DELETE,
  },
  attachPolicy: {
    endpoint: `${GKS}/policy`,
    apiRoute: "/api/policy-management/attach-policy",
    method: MethodsEnum.PUT,
  },
  detachPolicy: {
    endpoint: `${GKS}/policy`,
    apiRoute: "/api/policy-management/detach-policy",
    method: MethodsEnum.PATCH,
  },
  getUserPolicies: {
    endpoint: `${GKS}/policy`,
    apiRoute: "/api/policy-management/get-user-policies",
    method: MethodsEnum.GET,
  },
  getSelfPolicies: {
    endpoint: `${GKS}/policy/user`,
    apiRoute: "/api/policy-management/get-self-policies",
    method: MethodsEnum.GET,
  },
  getResources: {
    endpoint: `${GKS}/resource-registry/list`,
    apiRoute: "/api/policy-management/get-resources",
    method: MethodsEnum.GET,
  },
  getUserAuthResources: {
    endpoint: `${GKS}/access/resources`,
    apiRoute: "/api/policy-management/get-user-auth-resources",
    method: MethodsEnum.GET,
  },

  // ACCOUNTS MANAGEMENT
  getAccount: {
    endpoint: "",
    apiRoute: "",
    method: MethodsEnum.GET,
  },
  getAccountMetaList: {
    endpoint: "",
    apiRoute: "",
    method: MethodsEnum.GET,
  },
  updateAccount: {
    endpoint: "",
    apiRoute: "",
    method: MethodsEnum.PATCH,
  },
  createAccount: {
    endpoint: "",
    apiRoute: "",
    method: MethodsEnum.POST,
  },

  // INSTITUTE MANAGEMENT
  getInstitute: {
    endpoint: `${CAMPUS_COMPUTE}/setup/institute`,
    apiRoute: "/api/institute-management/get-institute",
    method: MethodsEnum.GET,
  },
  getInstituteMetaList: {
    endpoint: `${CAMPUS_COMPUTE}/setup/institute/meta`,
    apiRoute: "/api/institute-management/get-institute-meta-list",
    method: MethodsEnum.GET,
  },
  createInstitute: {
    endpoint: `${CAMPUS_COMPUTE}/setup/institute`,
    apiRoute: "/api/institute-management/create-institute",
    method: MethodsEnum.POST,
  },
  updateInstitute: {
    endpoint: `${CAMPUS_COMPUTE}/setup/institute`,
    apiRoute: "/api/institute-management/update-institute",
    method: MethodsEnum.PATCH,
  },

  // MASTER DEGREE
  getDegreeList: {
    endpoint: `${CAMPUS_COMPUTE}/setup/degree`,
    apiRoute: "/api/master-degree/get-degree-list",
    method: MethodsEnum.GET,
  },
  getActiveDegreeListForInstitute: {
    endpoint: `${CAMPUS_COMPUTE}/setup/degree`,
    apiRoute: "/api/master-degree/get-active-degree-list-for-institute",
    method: MethodsEnum.GET,
  },
  activateDegree: {
    endpoint: `${CAMPUS_COMPUTE}/setup/degree`,
    apiRoute: "/api/master-degree/activate-degree",
    method: MethodsEnum.POST,
  },
  // DEPARTMENT
  getDepartmentList: {
    endpoint: `${CAMPUS_COMPUTE}/setup/department`,
    apiRoute: "/api/department/get-department-list",
    method: MethodsEnum.GET,
  },
  createDepartment: {
    endpoint: `${CAMPUS_COMPUTE}/setup/department`,
    apiRoute: "/api/department/create-department",
    method: MethodsEnum.POST,
  },
  updateDepartment: {
    endpoint: `${CAMPUS_COMPUTE}/setup/department`,
    apiRoute: "/api/department/update-department",
    method: MethodsEnum.POST,
  },
  lockDepartment: {
    endpoint: `${CAMPUS_COMPUTE}/setup/department`,
    apiRoute: "/api/department/lock-department",
    method: MethodsEnum.PATCH,
  },
  unlockDepartment: {
    endpoint: `${CAMPUS_COMPUTE}/setup/department`,
    apiRoute: "/api/department/unlock-department",
    method: MethodsEnum.PUT,
  },
  // SUBJECT
  getSubjectList: {
    endpoint: `${CAMPUS_COMPUTE}/setup/subject`,
    apiRoute: "/api/subject/get-subject-list",
    method: MethodsEnum.GET,
  },
  createSubject: {
    endpoint: `${CAMPUS_COMPUTE}/setup/subject`,
    apiRoute: "/api/subject/create-subject",
    method: MethodsEnum.POST,
  },
  updateSubject: {
    endpoint: `${CAMPUS_COMPUTE}/setup/subject`,
    apiRoute: "/api/subject/update-subject",
    method: MethodsEnum.PATCH,
  },
  deleteSubject: {
    endpoint: `${CAMPUS_COMPUTE}/setup/subject`,
    apiRoute: "/api/subject/delete-subject",
    method: MethodsEnum.DELETE,
  },
  // PROGRAM
  getProgramList: {
    endpoint: `${CAMPUS_COMPUTE}/setup/program`,
    apiRoute: "/api/program/get-program-list",
    method: MethodsEnum.GET,
  },
  createProgram: {
    endpoint: `${CAMPUS_COMPUTE}/setup/program`,
    apiRoute: "/api/program/create-program",
    method: MethodsEnum.POST,
  },
  updateProgram: {
    endpoint: `${CAMPUS_COMPUTE}/setup/program`,
    apiRoute: "/api/program/update-program",
    method: MethodsEnum.PATCH,
  },
  deleteProgram: {
    endpoint: `${CAMPUS_COMPUTE}/setup/program`,
    apiRoute: "/api/program/delete-program",
    method: MethodsEnum.DELETE,
  },
  // TEAMS
  getTeamList: {
    endpoint: `${CAMPUS_COMPUTE}/team`,
    apiRoute: "/api/teams/get-team-list",
    method: MethodsEnum.GET,
  },
  createTeam: {
    endpoint: `${CAMPUS_COMPUTE}/team`,
    apiRoute: "/api/teams/create-team",
    method: MethodsEnum.POST,
  },
  updateTeam: {
    endpoint: `${CAMPUS_COMPUTE}/team`,
    apiRoute: "/api/teams/update-team",
    method: MethodsEnum.PATCH,
  },
  updateTeamUsers: {
    endpoint: `${CAMPUS_COMPUTE}/team/user`,
    apiRoute: "/api/teams/update-team-users",
    method: MethodsEnum.PATCH,
  },
  addPolicyToTeam: {
    endpoint: `${CAMPUS_COMPUTE}/team/policy`,
    apiRoute: "/api/teams/add-policy-to-team",
    method: MethodsEnum.PATCH,
  },
  removePolicyFromTeam: {
    endpoint: `${CAMPUS_COMPUTE}/team/policy`,
    apiRoute: "/api/teams/remove-policy-from-team",
    method: MethodsEnum.DELETE,
  },
  // COURSE BLUE PRINT
  getCourseBluePrintList: {
    endpoint: `${CAMPUS_COMPUTE}/course/blueprint`,
    apiRoute: "/api/course-blue-print/get-course-blue-print-list",
    method: MethodsEnum.GET,
  },
  createCourseBluePrint: {
    endpoint: `${CAMPUS_COMPUTE}/course/blueprint`,
    apiRoute: "/api/course-blue-print/create-course-blue-print",
    method: MethodsEnum.POST,
  },
  getVersionList: {
    endpoint: `${CAMPUS_COMPUTE}/course/blueprint`,
    apiRoute: "/api/course-blue-print/get-version-list",
    method: MethodsEnum.GET,
  },
  createVersion: {
    endpoint: `${CAMPUS_COMPUTE}/course/blueprint`,
    apiRoute: "/api/course-blue-print/create-version",
    method: MethodsEnum.POST,
  },
  updateVersion: {
    endpoint: `${CAMPUS_COMPUTE}/course/blueprint`,
    apiRoute: "/api/course-blue-print/update-version",
    method: MethodsEnum.PATCH,
  },
  activateVersion: {
    endpoint: `${CAMPUS_COMPUTE}/course/blueprint`,
    apiRoute: "/api/course-blue-print/activate-version",
    method: MethodsEnum.PATCH,
  },
  setDefaultVersion: {
    endpoint: `${CAMPUS_COMPUTE}/course/blueprint`,
    apiRoute: "/api/course-blue-print/set-default-version",
    method: MethodsEnum.PATCH,
  },
  getInstanceList: {
    endpoint: `${CAMPUS_COMPUTE}/course/instance`,
    apiRoute: "/api/course-blue-print/get-instance-list",
    method: MethodsEnum.GET,
  },
  createInstance: {
    endpoint: `${CAMPUS_COMPUTE}/course/instance`,
    apiRoute: "/api/course-blue-print/create-instance",
    method: MethodsEnum.POST,
  },
  updateInstance: {
    endpoint: `${CAMPUS_COMPUTE}/course/instance`,
    apiRoute: "/api/course-blue-print/update-instance",
    method: MethodsEnum.PATCH,
  },
  // ACADEMIC YEAR
  getAcademicYearList: {
    endpoint: `${CAMPUS_COMPUTE}/setup/academic/year`,
    apiRoute: "/api/academic-year/get-academic-year-list",
    method: MethodsEnum.GET,
  },
  createAcademicYear: {
    endpoint: `${CAMPUS_COMPUTE}/setup/academic/year`,
    apiRoute: "/api/academic-year/create-academic-year",
    method: MethodsEnum.POST,
  },
  updateAcademicYear: {
    endpoint: `${CAMPUS_COMPUTE}/setup/academic/year`,
    apiRoute: "/api/academic-year/update-academic-year",
    method: MethodsEnum.PATCH,
  },
};

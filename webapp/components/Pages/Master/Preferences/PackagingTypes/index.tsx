// // React
// import React, { useState, useEffect } from "react";

// // MUI
// import { Box, Typography } from "@mui/material";

// // Components
// import Header from "./Components/Header";
// import CreateUpdatePackagingTypeModal from "./Modals/CreateUpdatePackagingTypeModal";
// import LockUnlockPackagingTypeModal from "./Modals/LockUnlockPackagingTypeModal";
// import PackagingTypesTable from "./Components/PackagingTypesListTable";
// // import AccessManager from "@common/AccessManager";

// // Toast
// import toast from "react-hot-toast";

// // Redux
// import { useDispatch, useSelector } from "react-redux";
// import { loadingActions } from "@/store/loading/loading-slice";
// // import { manageAccessState } from "@/store/access/access-actions";

// // HTTP Helpers
// import axios from "axios";
// import { apis } from "@/constants/apis";

// // Types & Enums
// import {
//   PackagingType,
//   CreateUpdatePackagingType,
// } from "@/types/global-types";

// // Mock Data
// const mockdata = [
//   {
//     _id: "1",
//     Name: "Box",
//     Rate: 20,
//     createdAt: "1 June 2023",
//     updatedAt: "1 June 2023",
//   },
//   {
//     _id: "2",
//     Name: "Plastic Bag",
//     Rate: 20,
//     createdAt: "1 July 2023",
//     updatedAt: "1 July 2023",
//   },
// ];

// const PackagingTypePage = () => {
//   // States
//   const [packagingTypeList, setPackagingTypeList] = useState<PackagingType[]>([]);
//   const [selectedPackagingType, setSelectedPackagingType] =
//     useState<PackagingType | null>(null);

//   const [
//     showCreateUpdateSubCategoryModal,
//     setShowCreateUpdateSubCategoryModal,
//   ] = useState(false);
//   const [showLockUnlockSubCategoryModal, setShowLockUnlockSubCategoryModal] =
//     useState(false);
//   const [isLockUnlock, setIsLockUnlock] = useState<"lock" | "unlock" | null>(
//     null
//   );

//   //   // Redux States
//   //   const selectedInstituteId = useSelector(
//   //     (state: any) => state.institutes.selectedInstituteId
//   //   );

//   const selectedAccountId = "ACC01";

//   // Redux Dispatch Functions
//   const dispatch = useDispatch();
//   const startLoading = () => dispatch(loadingActions.startLoading());
//   const stopLoading = () => dispatch(loadingActions.stopLoading());

//   // Handlers
//   const handleGetSubCategoryList = async (accountId: string) => {
//     startLoading();
//     try {
//       //   const response = await axios.get(
//       //     `${apis.getDepartmentList.apiRoute}?instituteId=${instituteId}`
//       //   );
//       selectedPackagingType(mockdata);
//     } catch (error: any) {
//       setPackagingTypeList([]);
//       toast.error("Something went wrong fetching category list");
//     } finally {
//       stopLoading();
//     }
//   };
//   const handleCreateUpdateSubCategory = async (
//     body: CreateUpdatePackagingType,
//     accountId: string,
//     subCategoryId?: string
//   ) => {
//     startLoading();
//     // const api = departmentId
//     //   ? `${apis.updateDepartment.apiRoute}?instituteId=${instituteId}&departmentId=${departmentId}`
//     //   : `${apis.createDepartment.apiRoute}?instituteId=${instituteId}`;
//     try {
//       //   const response = await axios.post(api, body);
//       toast.success("Packaging Type Added Successfully");
//       setShowCreateUpdatePackagingTypeModal(false);
//       handlePackagingTypeList(accountId);
//     } catch (error: any) {
//       toast.error(error?.message || "Something went wrong");
//     } finally {
//       stopLoading();
//     }
//   };
//   const handleLockUnlockSubCategory = async (
//     accountId: string,
//     subCategoryId: string,
//     type: "lock" | "unlock"
//   ) => {
//     startLoading();
//     try {
//       //   const response =
//       //     type === "lock"
//       //       ? await axios.patch(
//       //           `${apis.lockDepartment.apiRoute}?instituteId=${instituteId}&departmentId=${departmentId}`
//       //         )
//       //       : await axios.put(
//       //           `${apis.unlockDepartment.apiRoute}?instituteId=${instituteId}&departmentId=${departmentId}`
//       //         );
//       toast.success("Locked Sub Category Successfully");
//       setSelectedSubCategory(null);
//       setShowCreateUpdateSubCategoryModal(false);
//       setIsLockUnlock(null);
//       handleGetSubCategoryList(accountId);
//     } catch (error: any) {
//       toast.error(error?.message || "Something went wrong");
//     } finally {
//       stopLoading();
//     }
//   };

//   return (
//     <>
//       <Box className="flex-1 flex flex-col gap-[1.25rem]">
//         <Header />
//         <SubCategoryListTable
//           subCategoryList={subCategoryList}
//           selectedSubCategory={selectedSubCategory}
//           setSelectedSubCategory={setSelectedSubCategory}
//           openCreateUpdateSubCategoryModal={() =>
//             setShowCreateUpdateSubCategoryModal(true)
//           }
//           openLockSubCategoryModal={() => {
//             setShowLockUnlockSubCategoryModal(true);
//             setIsLockUnlock("lock");
//           }}
//           openUnlockSubCategoryModal={() => {
//             setShowLockUnlockSubCategoryModal(true);
//             setIsLockUnlock("unlock");
//           }}
//         />
//       </Box>
//       <CreateUpdateSubCategoryModal
//         open={showCreateUpdateSubCategoryModal}
//         handleClose={() => {
//           setSelectedSubCategory(null);
//           setShowCreateUpdateSubCategoryModal(false);
//         }}
//         selectedSubCategory={selectedSubCategory}
//         handleCreateUpdateSubCategory={handleCreateUpdateSubCategory}
//         selectedSubCategoryId={selectedAccountId}
//       />
//       <LockUnlockSubCategoryModal
//         open={
//           selectedSubCategory !== null &&
//           showLockUnlockSubCategoryModal &&
//           isLockUnlock !== null
//         }
//         handleClose={() => {
//           setSelectedSubCategory(null);
//           setShowLockUnlockSubCategoryModal(false);
//           setIsLockUnlock(null);
//         }}
//         selectedSubCategory={selectedSubCategory}
//         handleLockUnlockSubCategory={handleLockUnlockSubCategory}
//         isLock={isLockUnlock}
//         selectedSubCategoryId={selectedAccountId}
//       />
//     </>
//   );
// };

// export default PackagingTypePage;

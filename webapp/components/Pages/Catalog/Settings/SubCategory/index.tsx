// React
import React, { useState, useEffect } from "react";

// MUI
import { Box, Typography } from "@mui/material";

// Components
import Header from "./Components/Header";
import CreateUpdateSubCategoryModal from "./Modals/CreateUpdateSubCategoryModal";
import LockUnlockSubCategoryModal from "./Modals/LockUnlockSubCategoryModal";
import SubCategoryListTable from "./Components/SubCategoryListTable";
// import AccessManager from "@common/AccessManager";

// Toast
import toast from "react-hot-toast";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { loadingActions } from "@/store/loading/loading-slice";
// import { manageAccessState } from "@/store/access/access-actions";

// HTTP Helpers
import axios from "axios";
import { apis } from "@/constants/apis";

// Types & Enums
import {
  SubCategoryType,
  CreateUpdateSubCategoryType,
} from "@/types/global-types";

// Mock Data
const mockdata = [
  {
    _id: "1",
    SubCategoryName: "Test Sub Category 01",
    SubCategoryCode: "TSC001",
    SubCategoryShortName: "TSC01",
    CategoryName: "Category 01",
    Rate: 1000,
    Status: "LOCKED",
    account_id: 1,
    createdAt: "1 June 2023",
    updatedAt: "1 June 2023",
  },
  {
    _id: "2",
    SubCategoryName: "Test Sub Category 02",
    SubCategoryCode: "TSC002",
    SubCategoryShortName: "TSC02",
    CategoryName: "Category 02",
    Rate: 2000,
    Status: "UNLOCKED",
    account_id: 2,
    createdAt: "1 July 2023",
    updatedAt: "1 July 2023",
  },
];

const SubCategoryPage = () => {
  // States
  const [subCategoryList, setSubCategoryList] = useState<SubCategoryType[]>([]);
  const [selectedSubCategory, setSelectedSubCategory] =
    useState<SubCategoryType | null>(null);

  const [
    showCreateUpdateSubCategoryModal,
    setShowCreateUpdateSubCategoryModal,
  ] = useState(false);
  const [showLockUnlockSubCategoryModal, setShowLockUnlockSubCategoryModal] =
    useState(false);
  const [isLockUnlock, setIsLockUnlock] = useState<"lock" | "unlock" | null>(
    null
  );

  //   // Redux States
  //   const selectedInstituteId = useSelector(
  //     (state: any) => state.institutes.selectedInstituteId
  //   );

  const selectedAccountId = "ACC01";

  // Redux Dispatch Functions
  const dispatch = useDispatch();
  const startLoading = () => dispatch(loadingActions.startLoading());
  const stopLoading = () => dispatch(loadingActions.stopLoading());

  // Handlers
  const handleGetSubCategoryList = async (accountId: string) => {
    startLoading();
    try {
      //   const response = await axios.get(
      //     `${apis.getDepartmentList.apiRoute}?instituteId=${instituteId}`
      //   );
      setSubCategoryList(mockdata);
    } catch (error: any) {
      setSubCategoryList([]);
      toast.error("Something went wrong fetching category list");
    } finally {
      stopLoading();
    }
  };
  const handleCreateUpdateSubCategory = async (
    body: CreateUpdateSubCategoryType,
    accountId: string,
    subCategoryId?: string
  ) => {
    startLoading();
    // const api = departmentId
    //   ? `${apis.updateDepartment.apiRoute}?instituteId=${instituteId}&departmentId=${departmentId}`
    //   : `${apis.createDepartment.apiRoute}?instituteId=${instituteId}`;
    try {
      //   const response = await axios.post(api, body);
      toast.success("Sub Category Added Successfully");
      setShowCreateUpdateSubCategoryModal(false);
      handleGetSubCategoryList(accountId);
    } catch (error: any) {
      toast.error(error?.message || "Something went wrong");
    } finally {
      stopLoading();
    }
  };
  const handleLockUnlockSubCategory = async (
    accountId: string,
    subCategoryId: string,
    type: "lock" | "unlock"
  ) => {
    startLoading();
    try {
      //   const response =
      //     type === "lock"
      //       ? await axios.patch(
      //           `${apis.lockDepartment.apiRoute}?instituteId=${instituteId}&departmentId=${departmentId}`
      //         )
      //       : await axios.put(
      //           `${apis.unlockDepartment.apiRoute}?instituteId=${instituteId}&departmentId=${departmentId}`
      //         );
      toast.success("Locked Sub Category Successfully");
      setSelectedSubCategory(null);
      setShowCreateUpdateSubCategoryModal(false);
      setIsLockUnlock(null);
      handleGetSubCategoryList(accountId);
    } catch (error: any) {
      toast.error(error?.message || "Something went wrong");
    } finally {
      stopLoading();
    }
  };

  return (
    <>
      <Box className="flex-1 flex flex-col gap-[1.25rem]">
        <Header />
        <SubCategoryListTable
          subCategoryList={subCategoryList}
          selectedSubCategory={selectedSubCategory}
          setSelectedSubCategory={setSelectedSubCategory}
          openCreateUpdateSubCategoryModal={() =>
            setShowCreateUpdateSubCategoryModal(true)
          }
          openLockSubCategoryModal={() => {
            setShowLockUnlockSubCategoryModal(true);
            setIsLockUnlock("lock");
          }}
          openUnlockSubCategoryModal={() => {
            setShowLockUnlockSubCategoryModal(true);
            setIsLockUnlock("unlock");
          }}
        />
      </Box>
      <CreateUpdateSubCategoryModal
        open={showCreateUpdateSubCategoryModal}
        handleClose={() => {
          setSelectedSubCategory(null);
          setShowCreateUpdateSubCategoryModal(false);
        }}
        selectedSubCategory={selectedSubCategory}
        handleCreateUpdateSubCategory={handleCreateUpdateSubCategory}
        selectedSubCategoryId={selectedAccountId}
      />
      <LockUnlockSubCategoryModal
        open={
          selectedSubCategory !== null &&
          showLockUnlockSubCategoryModal &&
          isLockUnlock !== null
        }
        handleClose={() => {
          setSelectedSubCategory(null);
          setShowLockUnlockSubCategoryModal(false);
          setIsLockUnlock(null);
        }}
        selectedSubCategory={selectedSubCategory}
        handleLockUnlockSubCategory={handleLockUnlockSubCategory}
        isLock={isLockUnlock}
        selectedSubCategoryId={selectedAccountId}
      />
    </>
  );
};

export default SubCategoryPage;

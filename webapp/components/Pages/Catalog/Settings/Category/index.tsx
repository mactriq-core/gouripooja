// React
import React, { useState, useEffect } from "react";

// MUI
import { Box, Typography } from "@mui/material";

// Components
import Header from "./Components/Header";
import CreateUpdateCategoryModal from "./Modals/CreateUpdateCategoryModal";
import LockUnlockCategoryModal from "./Modals/LockUnlockCategoryModal";
import CategoryListTable from "./Components/CategoryListTable";
// import AccessManager from "@common/AccessManager";

// Toast
import toast from "react-hot-toast";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { loadingActions } from "@/store/loading/loading-slice";
import { manageAccessState } from "@/store/access/access-actions";

// HTTP Helpers
import axios from "axios";
import { apis } from "@/constants/apis";

// Types & Enums
import { CategoryType, CreateUpdateCategoryType } from "@/types/global-types";

// Mock Data
const mockdata = [
  {
    _id: "1",
    CategoryName: "Test Category 01",
    CategoryCode: "TC001",
    CategoryShortName: "TC01",
    Status: "LOCKED",
    account_id: 1,
    createdAt: "1 June 2023",
    updatedAt: "1 June 2023",
  },
  {
    _id: "2",
    CategoryName: "Test Category 02",
    CategoryCode: "TC002",
    CategoryShortName: "TC02",
    Status: "UNLOCKED",
    account_id: 2,
    createdAt: "1 July 2023",
    updatedAt: "1 July 2023",
  },
];

const CategoryPage = () => {
  // States
  const [categoryList, setCategoryList] = useState<CategoryType[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<CategoryType | null>(
    null
  );

  const [showCreateUpdateCategoryModal, setShowCreateUpdateCategoryModal] =
    useState(false);
  const [showLockUnlockCategoryModal, setShowLockUnlockCategoryModal] =
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
  const handleGetCategoryList = async (accountId: string) => {
    startLoading();
    try {
      //   const response = await axios.get(
      //     `${apis.getDepartmentList.apiRoute}?instituteId=${instituteId}`
      //   );
      setCategoryList(mockdata);
    } catch (error: any) {
      setCategoryList([]);
      toast.error("Something went wrong fetching category list");
    } finally {
      stopLoading();
    }
  };
  const handleCreateUpdateCategory = async (
    body: CreateUpdateCategoryType,
    accountId: string,
    categoryId?: string
  ) => {
    startLoading();
    // const api = departmentId
    //   ? `${apis.updateDepartment.apiRoute}?instituteId=${instituteId}&departmentId=${departmentId}`
    //   : `${apis.createDepartment.apiRoute}?instituteId=${instituteId}`;
    try {
      //   const response = await axios.post(api, body);
      toast.success("Category Added Successfully");
      setShowCreateUpdateCategoryModal(false);
      handleGetCategoryList(accountId);
    } catch (error: any) {
      toast.error(error?.message || "Something went wrong");
    } finally {
      stopLoading();
    }
  };
  const handleLockUnlockCategory = async (
    accountId: string,
    categoryId: string,
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
      toast.success("Locked Category Successfully");
      setSelectedCategory(null);
      setShowCreateUpdateCategoryModal(false);
      setIsLockUnlock(null);
      handleGetCategoryList(accountId);
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
        <CategoryListTable
          categoryList={categoryList}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          openCreateUpdateCategoryModal={() =>
            setShowCreateUpdateCategoryModal(true)
          }
          openLockCategoryModal={() => {
            setShowLockUnlockCategoryModal(true);
            setIsLockUnlock("lock");
          }}
          openUnlockCategoryModal={() => {
            setShowLockUnlockCategoryModal(true);
            setIsLockUnlock("unlock");
          }}
        />
      </Box>
      <CreateUpdateCategoryModal
        open={showCreateUpdateCategoryModal}
        handleClose={() => {
          setSelectedCategory(null);
          setShowCreateUpdateCategoryModal(false);
        }}
        selectedCategory={selectedCategory}
        handleCreateUpdateCategory={handleCreateUpdateCategory}
        selectedCategoryId={selectedAccountId}
      />
      <LockUnlockCategoryModal
        open={
          selectedCategory !== null &&
          showLockUnlockCategoryModal &&
          isLockUnlock !== null
        }
        handleClose={() => {
          setSelectedCategory(null);
          setShowLockUnlockCategoryModal(false);
          setIsLockUnlock(null);
        }}
        selectedCategory={selectedCategory}
        handleLockUnlockCategory={handleLockUnlockCategory}
        isLock={isLockUnlock}
        selectedCategoryId={selectedAccountId}
      />
    </>
  );
};

export default CategoryPage;

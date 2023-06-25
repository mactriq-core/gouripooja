// React
import React, { useMemo, useEffect, useState } from "react";

// MUI
import {
  Box,
  Divider,
  Modal,
  Toolbar,
  IconButton,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  InputAdornment,
  OutlinedInput,
} from "@mui/material";

// Components
// import AccessManager from "@/components/Common/AccessManager";

// Icons
import { Close } from "@mui/icons-material";

// Toast
import { toast } from "react-hot-toast";

// Types & Enums
import {
  SubCategoryType,
  CreateUpdateSubCategoryType,
} from "@/types/global-types";

const CreateUpdateSubCategoryModal = ({
  open,
  handleClose,
  selectedSubCategory,
  handleCreateUpdateSubCategory,
  selectedSubCategoryId,
}: {
  open: boolean;
  handleClose: () => void;
  selectedSubCategory: SubCategoryType | null;
  handleCreateUpdateSubCategory: (
    body: CreateUpdateSubCategoryType,
    account_id: string,
    categoryId?: string
  ) => Promise<void>;
  selectedSubCategoryId: string;
}) => {
  // States
  const isUpdate = useMemo(
    () => selectedSubCategory !== null,
    [selectedSubCategory]
  );
  const [body, setBody] = useState<CreateUpdateSubCategoryType>({
    SubCategoryName: "",
    SubCategoryCode: "",
    SubCategoryShortName: "",
    Rate: 0,
  });

  // Handlers
  const clearBody = () => {
    setBody({
      SubCategoryName: "",
      SubCategoryCode: "",
      SubCategoryShortName: "",
      Rate: 0,
    });
  };
  const handleCloseModal = () => {
    clearBody();
    handleClose();
  };
  const handleCreateUpdate = async () => {
    if (
      !body.SubCategoryName ||
      !body.SubCategoryCode ||
      !body.SubCategoryShortName
    ) {
      toast.error("Please fill all the fields");
      return;
    }
    if (isUpdate && selectedSubCategory !== null) {
      await handleCreateUpdateSubCategory(
        body,
        selectedSubCategoryId,
        selectedSubCategory?._id
      );
    } else {
      await handleCreateUpdateSubCategory(body, selectedSubCategoryId);
    }
  };

  // Effects
  useEffect(() => {
    if (isUpdate && selectedSubCategory !== null && open) {
      setBody({
        SubCategoryName: selectedSubCategory?.SubCategoryName || "",
        SubCategoryCode: selectedSubCategory?.SubCategoryCode || "",
        SubCategoryShortName: selectedSubCategory?.SubCategoryName || "",
        Rate: selectedSubCategory?.Rate || 0,
      });
    }
    if (!isUpdate && open) {
      clearBody();
    }
  }, [isUpdate, selectedSubCategory, open]);

  return (
    <Modal open={open} onClose={handleCloseModal}>
      <Box
        sx={{ bgcolor: "background.paper", boxShadow: 10 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[95%] max-w-[37.5rem] max-h-[95vh] round flex flex-col"
      >
        <Toolbar className="!min-h-[3.75rem] px-[1.25rem] flex items-center justify-between">
          <Typography variant="body1" className="!font-semibold">
            {isUpdate ? "Edit Category" : "Create Category"}
          </Typography>
          <IconButton onClick={handleCloseModal}>
            <Close />
          </IconButton>
        </Toolbar>
        <Divider />
        {/* <AccessManager padding keyName="createDepartment_updateDepartment"> */}
        <Box className="flex flex-col gap-[1.25rem] p-[1.25rem] overflow-y-auto scrollbar">
          <div className="grid grid-cols-2 sm:grid-cols-1 gap-[1.25rem]">
            <TextField
              label="Sub Category Name"
              variant="outlined"
              size="small"
              value={body.SubCategoryName}
              onChange={(e) =>
                setBody({ ...body, SubCategoryName: e.target.value })
              }
            />
            <TextField
              label="Sub Category Code"
              variant="outlined"
              size="small"
              value={body.SubCategoryCode}
              onChange={(e) =>
                setBody({ ...body, SubCategoryCode: e.target.value })
              }
            />
            <TextField
              label="Sub Category Short Name"
              variant="outlined"
              size="small"
              value={body.SubCategoryShortName}
              onChange={(e) =>
                setBody({ ...body, SubCategoryShortName: e.target.value })
              }
            />
            <TextField
              label="Rate"
              variant="outlined"
              size="small"
              type="number"
              value={body.Rate}
              onChange={(e) =>
                setBody({ ...body, Rate: parseInt(e.target.value) })
              }
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
          <div className="flex items-center justify-end sm:justify-center gap-[0.625rem]">
            <Button variant="outlined" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button variant="contained" onClick={handleCreateUpdate}>
              {isUpdate ? "Save Changes" : "Create"}
            </Button>
          </div>
        </Box>
        {/* </AccessManager> */}
      </Box>
    </Modal>
  );
};

export default CreateUpdateSubCategoryModal;

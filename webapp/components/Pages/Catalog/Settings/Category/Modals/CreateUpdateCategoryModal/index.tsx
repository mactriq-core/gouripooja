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
} from "@mui/material";

// Components
// import AccessManager from "@/components/Common/AccessManager";

// Icons
import { Close } from "@mui/icons-material";

// Toast
import { toast } from "react-hot-toast";

// Types & Enums
import { CategoryType, CreateUpdateCategoryType } from "@/types/global-types";

const CreateUpdateCategoryModal = ({
  open,
  handleClose,
  selectedCategory,
  handleCreateUpdateCategory,
  selectedCategoryId,
}: {
  open: boolean;
  handleClose: () => void;
  selectedCategory: CategoryType | null;
  handleCreateUpdateCategory: (
    body: CreateUpdateCategoryType,
    account_id: string,
    categoryId?: string
  ) => Promise<void>;
  selectedCategoryId: string;
}) => {
  // States
  const isUpdate = useMemo(() => selectedCategory !== null, [selectedCategory]);
  const [body, setBody] = useState<CreateUpdateCategoryType>({
    CategoryName: "",
    CategoryCode: "",
    CategoryShortName: "",
  });

  // Handlers
  const clearBody = () => {
    setBody({
      CategoryName: "",
      CategoryCode: "",
      CategoryShortName: "",
    });
  };
  const handleCloseModal = () => {
    clearBody();
    handleClose();
  };
  const handleCreateUpdate = async () => {
    if (!body.CategoryName || !body.CategoryCode || !body.CategoryShortName) {
      toast.error("Please fill all the fields");
      return;
    }
    if (isUpdate && selectedCategory !== null) {
      await handleCreateUpdateCategory(
        body,
        selectedCategoryId,
        selectedCategory?._id
      );
    } else {
      await handleCreateUpdateCategory(body, selectedCategoryId);
    }
  };

  // Effects
  useEffect(() => {
    if (isUpdate && selectedCategory !== null && open) {
      setBody({
        CategoryName: selectedCategory?.CategoryName || "",
        CategoryCode: selectedCategory?.CategoryCode || "",
        CategoryShortName: selectedCategory?.CategoryShortName || "",
      });
    }
    if (!isUpdate && open) {
      clearBody();
    }
  }, [isUpdate, selectedCategory, open]);

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
              label="Category Name"
              variant="outlined"
              size="small"
              value={body.CategoryName}
              onChange={(e) =>
                setBody({ ...body, CategoryName: e.target.value })
              }
            />
            <TextField
              label="Category Code"
              variant="outlined"
              size="small"
              value={body.CategoryCode}
              onChange={(e) =>
                setBody({ ...body, CategoryCode: e.target.value })
              }
            />
            <TextField
              label="Category Short Name"
              variant="outlined"
              size="small"
              value={body.CategoryShortName}
              onChange={(e) =>
                setBody({ ...body, CategoryShortName: e.target.value })
              }
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

export default CreateUpdateCategoryModal;

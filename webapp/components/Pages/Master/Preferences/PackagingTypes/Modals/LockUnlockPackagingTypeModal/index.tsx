// React
import React, { useMemo, useState } from "react";

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
// import AccessManager from "@common/AccessManager";

// Icons
import { Close } from "@mui/icons-material";

// Types & Enums
import { PackagingType } from "@/types/global-types";

const LockUnlockPackagingTypeModal = ({
  open,
  handleClose,
  selectedPackagingType,
  handleLockUnlockPackagingType,
  isLock,
  selectedPackagingTypeId,
}: {
  open: boolean;
  handleClose: () => void;
  selectedPackagingType: PackagingType | null;
  handleLockUnlockPackagingType: (
    accountId: string,
    categoryId: string,
    type: "lock" | "unlock"
  ) => Promise<void>;
  isLock: "lock" | "unlock" | null;
  selectedPackagingTypeId: string;
}) => {
  // Lock/Unlock States
  const IsLock = useMemo(() => isLock === "lock", [isLock]);
  const IsUnlock = useMemo(() => isLock === "unlock", [isLock]);

  // Category States
  const PackagingTypeName = selectedPackagingType?.Name;
  const Rate = selectedPackagingType?._id;
  const [packagingType, setPackagingType] = useState("");

  // Description States
  const LockDescription =
    "This will lock changes for the Category and Category details no longer will be available for changes.";
  const UnlockDescription = "This will unlock changes for the Category.";
  const description = IsLock
    ? LockDescription
    : IsUnlock
    ? UnlockDescription
    : "";

  // Button States
  const buttonText = IsLock ? "Lock" : IsUnlock ? "Unlock" : "";

  // Handlers
  const handleCloseModal = () => {
    setPackagingType("");
    handleClose();
  };

  return (
    <Modal open={open} onClose={handleCloseModal}>
      <Box
        sx={{ bgcolor: "background.paper", boxShadow: 10 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[95%] max-w-[37.5rem] max-h-[95vh] round flex flex-col"
      >
        <Toolbar className="!min-h-[3.75rem] px-[1.25rem] flex items-center justify-between">
          <Typography variant="body1" className="!font-semibold">
            {IsLock && "Lock Packaging Types"}
            {IsUnlock && "Unlock Packaging Type"}
          </Typography>
          <IconButton onClick={handleCloseModal}>
            <Close />
          </IconButton>
        </Toolbar>
        <Divider />
        {/* <AccessManager keyName="loadDepartment_unlockDepartment" padding> */}
        <Box className="flex flex-col gap-[1.25rem] p-[1.25rem] overflow-y-auto scrollbar">
          <Typography variant="body1" className="flex flex-col gap-[0.625rem]">
            <span>{description}</span>
            <span>
              Type <b className="text-red-400">{PackagingTypeName}</b> in the
              text box below and click on &apos;{buttonText}&apos; button to
              confirm.
            </span>
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            label="Packaging Name"
            size="small"
            value={PackagingTypeName}
            onChange={(e) => setPackagingType(e.target.value)}
          />
          <Box className="flex items-center justify-end sm:justify-center gap-[1.25rem]">
            <Button onClick={handleCloseModal} variant="outlined" color="error">
              Cancel
            </Button>
            <Button
              onClick={() => {
                if (IsLock) {
                  handleLockUnlockPackagingType(
                    selectedPackagingType?.Name as string,
                    selectedPackagingTypeId as string,
                    "lock"
                  ).then(() => setPackagingType(""));
                }
                if (IsUnlock) {
                  handleLockUnlockPackagingType(
                    selectedPackagingType?.Name as string,
                    packagingType as string,
                    "unlock"
                  ).then(() => setPackagingType(""));
                }
              }}
              variant="contained"
              color="error"
              disabled={packagingType !== PackagingTypeName}
            >
              {buttonText}
            </Button>
          </Box>
        </Box>
        {/* </AccessManager> */}
      </Box>
    </Modal>
  );
};

export default LockUnlockPackagingTypeModal;

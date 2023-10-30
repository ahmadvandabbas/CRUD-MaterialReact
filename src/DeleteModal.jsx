import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

export const DeleteModal = ({ open, onClose, handleDeleteRow }) => {
  return (
    <Dialog open={open}>
      <DialogTitle textAlign="center">حذف محصول</DialogTitle>
      <DialogContent>
        <h3>آیا شما از حذف محصول مطمان هستید؟</h3>
      </DialogContent>
      <DialogActions sx={{ p: "2.5rem" }}>
        <Button onClick={onClose}>خیر</Button>
        <Button
          color="secondary"
          onMouseDown={onClose}
          onClick={handleDeleteRow}
          variant="contained"
        >
          بله
        </Button>
      </DialogActions>
    </Dialog>
  );
};

import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { default as MuiModal } from "@material-ui/core/Modal";

const modalStyles = theme => {
  const top = 50;
  const left = 50;

  return {
    paper: {
      position: "absolute",
      width: "80%",
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing.unit * 4,
      outline: "none",
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    },
  };
};

function Modal({ classes, onClose, open, children }) {
  return (
    <div>
      <MuiModal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={onClose}
      >
        <div className={classes.paper}>{children}</div>
      </MuiModal>
    </div>
  );
}

Modal.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.object,
};

export default withStyles(modalStyles)(Modal);

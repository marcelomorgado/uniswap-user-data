import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const modalStyles = theme => ({
  paper: {
    position: "absolute",
    width: "80%",
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: "none",
  },
});

const UserField = ({ label, value, onChange }) => {
  return (
    <TextField
      id="outlined-full-width"
      label={label}
      value={value}
      onChange={onChange}
      style={{ margin: 8 }}
      placeholder=""
      helperText=""
      fullWidth
      margin="normal"
      variant="outlined"
      InputLabelProps={{
        shrink: true,
      }}
    />
  );
};

UserField.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

class TransferEtherModal extends React.Component {
  state = {
    from: "",
    to: "",
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  render() {
    const { classes, handleClose, handleTransfer, open } = this.props;
    const { from, to } = this.state;

    const onTransfer = () => {
      handleTransfer(from, to);
      handleClose();
    };

    return (
      <div>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={open}
          onClose={handleClose}
        >
          <div style={getModalStyle()} className={classes.paper}>
            <form className={classes.container} noValidate autoComplete="off">
              <UserField
                label="From"
                value={this.state.from}
                onChange={this.handleChange("from")}
              />
              <UserField
                label="To"
                value={this.state.to}
                onChange={this.handleChange("to")}
              />
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={onTransfer}
              >
                Transfer
              </Button>
            </form>
          </div>
        </Modal>
      </div>
    );
  }
}

TransferEtherModal.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleTransfer: PropTypes.func.isRequired,
};

export default withStyles(modalStyles)(TransferEtherModal);

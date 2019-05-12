import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
  card: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  button: {
    margin: theme.spacing.unit,
  },
});

function User({ user, style, classes, handleTransactions }) {
  const { id, etherBalance } = user;

  return (
    <Card className={classes.card} style={style}>
      <CardContent>
        <Typography variant="h5" component="h2">
          {id}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {`${etherBalance} ETH`}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={() => {
            handleTransactions(id);
          }}
        >
          Transactions
        </Button>
        <Button
          variant="contained"
          color="secondary"
          className={classes.button}
          onClick={() => {}}
        >
          Transfer from
        </Button>
      </CardActions>
    </Card>
  );
}

User.propTypes = {
  user: PropTypes.object.isRequired,
  style: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  handleTransactions: PropTypes.func.isRequired,
};

//export default User;
export default withStyles(styles)(User);

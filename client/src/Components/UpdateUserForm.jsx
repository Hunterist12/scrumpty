import React from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import SaveIcon from '@material-ui/icons/Save';
import HelpIcon from '@material-ui/icons/HelpOutline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles } from '@material-ui/core/styles';
const axios = require('axios');
const api = require('../api');

const styles = {
  card: {
    minWidth: 275,
    maxWidth: 300,
    margin: '10px',
  },
  button: {
    margin: '10px',
  },
  leftIcon: {
    marginRight: '6px',
  },
};

class UpdateUserForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPassword: '',
      newPassword: '',
      newDescription: '',
    };
    this.handleFieldUpdate = this.handleFieldUpdate.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const {
      currentPassword,
      newDescription,
      newPassword,
    } = this.state;

    if (this.uploadInput) {
      console.log('Looks like you\'re trying to update your profile pic!');
      const fileData = new FormData();
      fileData.append('file', this.uploadInput.files[0]);  
      axios.post('/users/pic', fileData, { headers: { 'Content-Type': 'multipart/form-data' } });
    }

    api.updateUser(currentPassword, newPassword, newDescription).then((res) => {
      if (!res) {
      // fire error snackbar
      } else {
        this.setState({ currentPassword: '', newPassword: '' });
        // fire success snackbar
        setTimeout(() => {
          this.props.history.push('/');
        }, 1500);
      }
    });
  }

  handleFieldUpdate(e) {
    const { id, value } = e.target;
    this.setState({ [id]: value });
  }

  render() {
    const { classes, user } = this.props;
    const {
      currentPassword,
      newDescription,
      newPassword,
    } = this.state;
    const submitDisabled = (newPassword === '') && (newDescription === '') && (this.uploadInput !== undefined);

    return (
      <form onSubmit={this.handleSubmit}>
        <Card className={classes.card}>
          <CardContent>
            <Typography variant="headline" gutterBottom>
              Welcome, {user.username}!
            </Typography>
          </CardContent>
        </Card>
        <Card className={classes.card}>
          <CardContent>
            <TextField
              required
              type="password"
              id="currentPassword"
              label="Current Password"
              value={currentPassword}
              margin="normal"
              onChange={this.handleFieldUpdate}
            />
            <Tooltip title="We require your current password to make any changes to your profile because we're SUPER SECURE!">
              <HelpIcon />
            </Tooltip>
          </CardContent>
        </Card>
        <Card className={classes.card}>
          <CardContent>
            <TextField
              required
              type="password"
              id="newPassword"
              label="New Password"
              value={newPassword}
              margin="normal"
              onChange={this.handleFieldUpdate}
            />
            <TextField
              id="newDescription"
              label="New Description"
              multiline
              placeholder={user.description}
              value={newDescription}
              margin="normal"
              onChange={this.handleFieldUpdate}
            />
            <input ref={(ref) => { this.uploadInput = ref; }} type="file" />
          </CardContent>
        </Card>
        <Button variant="contained" disabled={submitDisabled} color="primary" type="submit" className={classes.button}>
          <SaveIcon className={classes.leftIcon} />
          Save Changes
        </Button>
      </form>
    );
  }
}

export default withStyles(styles)(UpdateUserForm);

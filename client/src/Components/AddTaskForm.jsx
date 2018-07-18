import React from 'react';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Icon from '@material-ui/core/Icon';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import api from '../api';
import Tasks from './Tasks.jsx';
import { StatusCode } from '../../../lib/shared';


const dropdownMenuOptions = [{ label: 'Low', value: 0 },
{ label: 'Medium', value: 1 },
{ label: 'High', value: 2 },
{ label: 'Critical', value: 3 }];

class AddTaskForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title:'', description:'', priority_code:0, difficulty:0
    };

    this.titleChange = this.titleChange.bind(this);
    this.descriptionChange = this.descriptionChange.bind(this);
    this.priorityChange = this.priorityChange.bind(this);
    this.difficultyChange = this.difficultyChange.bind(this);
    //this.etaChange = this.etaChange.bind(this);
    this.reload = this.props.reload;
    this.onSubmit = this.onSubmit.bind(this);
    this.closeTask = props.closeTask;
   
  }

  onSubmit(e) {
    e.preventDefault();
    console.log(this.state.task);
    const {
      title, description, priority_code, difficulty,
    } = this.state;
    
    api.addTask({
      title, description, priority_code, difficulty,
    }).then(res => {this.reload(); this.closeTask();});
  }

  titleChange(e) {
    e.preventDefault();
    this.setState({ title: e.target.value });
  }

  descriptionChange(e) {
    e.preventDefault();
    this.setState({ description: e.target.value });
  }

  priorityChange(e) {
    e.preventDefault();
    this.setState({ priority_code: e.target.value });
  }

  difficultyChange(e) {
    e.preventDefault();
    this.setState({ difficulty: e.target.value });
  }

  render() {
    return (
      <div>
        <CardContent style={{ padding: '5px', textAlign: 'center' }}>
          <form onSubmit={this.onSubmit}>
            <div>
              <TextField required id="title" label="Title" defaultValue={this.state.title} margin="normal" onChange={this.titleChange} />
              <TextField required id="description" label="Description" defaultValue={this.state.description} margin="normal" onChange={this.descriptionChange} />
            </div>

            <TextField id="priority" select label="Priority" defaultValue={this.state.priority_code} value={this.state.priority_code} onChange={this.priorityChange} margin="normal">
              {dropdownMenuOptions.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>

            <TextField id="difficulty" select label="Difficulty" value={this.state.difficulty} onChange={this.difficultyChange} defaultValue={this.state.difficulty} margin="normal">
              {dropdownMenuOptions.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>

            <div style={{ textAlign: 'center' }}>
              <Button type="submit">
                Save
              </Button>
              
            </div>
          </form>
        </CardContent>
      </div>
    );
  }
}

export default AddTaskForm;
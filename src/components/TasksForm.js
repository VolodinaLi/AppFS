import React from 'react';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import './TasksForm.css';

class TasksForm extends React.Component {
	constructor(props) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.state = {
			inputValues: {}
		};
	}

	handleSubmit() {
		let result = true;
		const answers = this.props.answers;
		let count = 0;
		for (let i = 0; i < answers.length; i++)
		{
			if (answers[i].text !== this.state.inputValues[answers[i].taskId])
				result = false;
			else
				count++;
		}
		alert(count + " из " + answers.length + " правильных ответов");
	}
	render() {
		return (
			<Paper className="taskFormPaper">
				<form autoComplete="off">
	            	<div>
	              	{
	              		this.props.tasks.map((task) => (
	                  		<Paper className="taskFormPaper" key={task.id} elevation={0}>
	                    		<Typography>{task.id}. {task.text}</Typography>
	                    		<TextField 
	                    			id="standard-basic" 
	                    			label="Ответ" 
	                    			onChange={(event) => { 
	                    					this.state.inputValues[task.id]=event.target.value.split(" ").join("");
	                    				}
	                    			}
	                    		/>
	                  		</Paper>
	                	))
	                }
	            	</div>
	            	<Button
				        variant="contained"
				        color="primary"
	            		onClick={ this.handleSubmit }
				    >
				        Отправить
	      			</Button>
	          	</form>
          	</Paper>
        );
	}
}
 export default TasksForm;
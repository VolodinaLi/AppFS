import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
function getPaddingStyle(level) {
	return {
		paddingLeft: `${level*20}px`
	};
}
function prepareData(data, root, level) {
	let a = [];
	for (let i = 0; i < data.length; i++) {
		if (data[i].parentId === root) {
			let obj = {
				id: data[i].id,
				text: data[i].text,
				level: level,
				subList: prepareData(data, data[i].id, level + 1)
			}
			a.push(obj);
		}
	}
	if (a.length === 0) {
		a = null;
	}
	return a;
}


class TaskNavigation extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			expandedItems: [1],
			data: prepareData(props.data, "0", 0),
			SelectedId: 1
		};
		this.renderItem = this.renderItem.bind(this);
		this.isExpanded = this.isExpanded.bind(this);
		this.toggleExpanded = this.toggleExpanded.bind(this);
	}
	isExpanded(item) {
		return (this.state.expandedItems.indexOf(item.id) !== -1);
	}
	hasChildren(item) {
		return (item.subList && item.subList.length);
	}
	changeSelectedItem(item) {
		this.setState({selectedId: item.id});
		this.props.onSelectedIdChanged(item.id);
	}
	toggleExpanded(item) {
		let newExpandedItems = [...this.state.expandedItems];
		if (this.hasChildren(item)) {
			if (this.isExpanded(item)) {
				newExpandedItems.splice(newExpandedItems.indexOf(item.id), 1);
			}
			else {
				newExpandedItems.push(item.id);
			}
			this.setState({expandedItems: newExpandedItems});
		}
	}
	renderItem(item) {
		return (
			<div key={item.id}>
				<ListItem button 
					selected={this.state.selectedId === item.id}
					onClick={() => { 
										this.changeSelectedItem(item);
				 					}}>
			        <ListItemText primary={item.text} style={getPaddingStyle(item.level)}/>

			        {this.hasChildren(item) ?
			        				(<IconButton size="small" onClick={(e) => { 
										this.toggleExpanded(item);
										e.stopPropagation();
				 					}}>
				 					{this.isExpanded(item) ? <ExpandLess /> : <ExpandMore />}
				 					</IconButton>) : <></>}
			    </ListItem>
				{
					
					this.hasChildren(item) ? 
						<Collapse in={this.isExpanded(item)}>
							{item.subList.map(this.renderItem)}
						</Collapse>
					: <></>
				}
			</div>
		);
	}
	render() {
		return (
			<List className={this.props.className}>
				{this.state.data.map(this.renderItem)}
			</List>
		);
	}
}

export default TaskNavigation;












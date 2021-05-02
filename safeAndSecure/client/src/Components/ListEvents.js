//Imports
import React,{Component} from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import WarningIcon from '@material-ui/icons/Warning';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container'
import axios from 'axios';
import './../App.css';

//styling for classes
const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: '100%',
    backgroundColor: theme.palette.background.paper
  }
});

//component to display the trigger events
class ListEvents extends Component {
    constructor(props) {
        super(props);
        this.state = {
            events: []
        }
    }
    //standard get events from database
    componentDidMount() {
        axios.get('http://localhost:5000/events')
            .then(response => {
                if (response.data) {
                    console.log('did mount')
                this.setState({
                    events: response.data
              })
            }
        })
        .catch(error => {
            console.log(error)
        })
    };
    render(){
        const {classes} = this.props;
        return(
            <div>
                <p className={"mainText"}>Event Notifications</p>
                <Container maxWidth="sm">
                    <List className={classes.root}>
                        {this.state.events.map(({trigger,date,_id})=>(
                            <ListItem key={_id.toString()} icon={<WarningIcon/>}>
                                <ListItemAvatar>
                                    <WarningIcon color="primary" />
                                </ListItemAvatar>
                                <div>
                                    <p>Trigger: {trigger}</p>
                                    <p>Date: {date}</p>
                                </div>
                            </ListItem>
                        ))}
                    </List>
                </Container>
            </div>
        );
    };
};

//export
export default withStyles(styles)(ListEvents);

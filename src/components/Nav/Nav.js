import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './Nav.css';
import { withStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import TagFace from '@material-ui/icons/TagFaces';
import People from '@material-ui/icons/PeopleOutline';
import ListIcon from '@material-ui/icons/List';
import Today from '@material-ui/icons/Today';
import TimeToLeave from '@material-ui/icons/TimeToLeave';

const styles = theme => ({
  list: {
    width: 300,
  },
  drawerHeader: {
    ...theme.mixins.toolbar,
    color: 'white',
  },
  icon: {
    width: '40px',
    height: '40px',
  },
  noUnderline: {
    textDecoration: 'none',
  }
});

class Nav extends Component {
  state = {
    right: false,
  }

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open,
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <div className="nav">
        { // if it is not guest page, show navigation button
          !window.location.hash.includes('guest') ?
          <>
            <Link to="/main">
              <h2 className="nav-title">Party Pooper Planner</h2>
            </Link>
            <div className="nav-right">
              {this.props.user.id && (
                <>
                  <IconButton
                    aria-label="Open drawer"
                    onClick={this.toggleDrawer('right', true)}
                    className={classes.drawerHeader}
                  >
                    <MenuIcon className={classes.icon} />
                  </IconButton>
                  <SwipeableDrawer
                    anchor="right"
                    open={this.state.right}
                    onClose={this.toggleDrawer('right', false)}
                    onOpen={this.toggleDrawer('right', true)}
                  >
                    <div
                      tabIndex={0}
                      role="button"
                      onClick={this.toggleDrawer('right', false)}
                      onKeyDown={this.toggleDrawer('right', false)}
                    >
                      <div className={classes.list}>
                        <List>
                          <ListItem key="Name">
                            <h2>{this.props.user.user_name} <TagFace color="primary" /></h2>
                          </ListItem>
                        </List>
                        <Divider />
                        <List>
                          <Link className={classes.noUnderline} to="/main">
                            <ListItem button key="Main">
                              <ListItemIcon><Today /></ListItemIcon>
                              <ListItemText primary="Main" />
                            </ListItem>
                          </Link>
                          <Link className={classes.noUnderline} to="/group">
                            <ListItem button key="Group">
                              <ListItemIcon><ListIcon /></ListItemIcon>
                              <ListItemText primary="Group" />
                            </ListItem>
                          </Link>
                          <Link className={classes.noUnderline} to="/friend">
                            <ListItem button key="Friend">
                              <ListItemIcon><People /></ListItemIcon>
                              <ListItemText primary="Friend" />
                            </ListItem>
                          </Link>
                        </List>
                        <Divider />
                        {
                          this.props.user.admin_cd === '0' &&
                          <>
                            <List>
                              <Link className={classes.noUnderline} to="/admin">
                                <ListItem button key="Admin">
                                  <ListItemIcon><People /></ListItemIcon>
                                  <ListItemText primary="Admin" />
                                </ListItem>
                              </Link>
                            </List>
                            <Divider />
                          </>
                        }
                        <List>
                          <ListItem button key="Logout">
                            <ListItemIcon><TimeToLeave /></ListItemIcon>
                            <ListItemText primary="Log Out" onClick={() => this.props.dispatch({ type: 'LOGOUT' })} />
                          </ListItem>
                        </List>
                      </div>
                    </div>
                  </SwipeableDrawer>
                </>
              )}
            </div>
          </> :
          <h2 className="nav-title">Party Pooper Planner</h2>
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps)(withStyles(styles)(Nav));

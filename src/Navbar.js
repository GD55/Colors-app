import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from "@material-ui/styles";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Slider from 'rc-slider';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import 'rc-slider/assets/index.css';
import styles from './styles/NavbarStyle';

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = { format: 'hex', open: false };
    }
    handleFormatChange = (e) => {
        this.setState({ format: e.target.value, open: true }, () => {
            this.props.handleChange(this.state.format);
        });
    }
    closeSnackbar = () => {
        this.setState({ open: false });
    }
    render() {
        const { level, changeLevel, showSlider, classes } = this.props;
        const { format, open } = this.state;
        return (
            <header className={classes.Navbar}>
                <div className={classes.logo}>
                    <Link to='/'>React Color Picker</Link>
                </div>
                {showSlider &&
                    <div>
                        <span>Level: {level}</span>
                        <div className={classes.slider}>
                            <Slider
                                defaultValue={level}
                                min={100}
                                max={900}
                                step={100}
                                onAfterChange={changeLevel}
                            />
                        </div>
                    </div>
                }
                <div className={classes.selectContainer}>
                    <Select value={format} onChange={this.handleFormatChange}>
                        <MenuItem value='hex'>HEX - #ffffff</MenuItem>
                        <MenuItem value='rgb'>rgb(255,255,255)</MenuItem>
                        <MenuItem value='rgba'>rgba(255,255,255,1.0)</MenuItem>
                    </Select>
                </div>
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    open={open}
                    autoHideDuration={3000}
                    onClose={this.closeSnackbar}
                    message={<span id='message-id'>Format Changed To {format.toUpperCase()}</span>}
                    ContentProps={{
                        "aria-describedby": "message-id"
                    }}
                    action={[
                        <IconButton
                            size="small"
                            aria-label="close"
                            color="inherit"
                            onClick={this.closeSnackbar}
                        >
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    ]}
                />
            </header>
        );
    }
}

export default withStyles(styles)(Navbar);
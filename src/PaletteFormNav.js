import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import PaletteMetaForm from './PaletteMetaForm';
import styles from './styles/PaletteFormNavStyles';

class PaletteFormNav extends Component {
    state = {
        formShowing: false
    }

    showForm = () => {
        this.setState({ formShowing: true });
    }

    hideForm = () => {
        this.setState({ formShowing: false });
    }

    render() {
        const { classes, open, handleSubmit, palettes, handleDrawerOpen } = this.props;
        const { formShowing } = this.state;
        return (
            <div className={classes.root}>
                <CssBaseline />
                <AppBar
                    position="fixed"
                    color='default'
                    className={clsx(classes.appBar, {
                        [classes.appBarShift]: open,
                    })}
                >
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            className={clsx(classes.menuButton, open && classes.hide)}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" noWrap>
                            Create A Palette
                        </Typography>
                    </Toolbar>
                    <div className={classes.navBtns}>
                        <Link to='/' className={classes.link}>
                            <Button
                                className={classes.button}
                                variant='contained'
                                color='secondary'
                            >
                                Go Back
                            </Button>
                        </Link>
                        <Button
                            className={classes.button}
                            variant="contained"
                            color="primary"
                            onClick={this.showForm}
                        >
                            Save Palette
                        </Button>
                    </div>
                </AppBar>
                {formShowing && (
                    <PaletteMetaForm
                        handleSubmit={handleSubmit}
                        palettes={palettes}
                        hideForm={this.hideForm}
                    />
                )}
            </div>
        );
    }
}

export default withStyles(styles, { withTheme: true })(PaletteFormNav);
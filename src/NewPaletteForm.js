import React, { Component } from 'react';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { Button } from '@material-ui/core';
import DraggableColorList from './DraggableColorList';
import { arrayMove } from 'react-sortable-hoc';
import PaletteFormNav from './PaletteFormNav';
import ColorPickerForm from './ColorPickerForm';
import styles from './styles/NewPaletteFormStyles';
import seedColors from './seedColors';

class NewPaletteForm extends Component {
    static defaultProps = {
        maxColors: 20
    }

    state = {
        open: false,
        colors: seedColors[0].colors
    };

    handleDrawerOpen = () => {
        this.setState({ open: true });
    };

    handleDrawerClose = () => {
        this.setState({ open: false });
    };

    addNewColor = (newColor) => {
        this.setState({ colors: [...this.state.colors, newColor] });
    }

    handleChange = (evt) => {
        this.setState({ [evt.target.name]: evt.target.value });
    }

    handleSubmit = (newPalette) => {
        newPalette.id = newPalette.paletteName.toLowerCase().replace(/ /g, '-');
        newPalette.colors = this.state.colors;
        this.props.savePalette(newPalette);
        this.props.history.push('/');
    }

    removeColor = (colorName) => {
        this.setState({
            colors: this.state.colors.filter(color => color.name !== colorName)
        });
    }

    onSortEnd = ({ oldIndex, newIndex }) => {
        this.setState(({ colors }) => ({
            colors: arrayMove(colors, oldIndex, newIndex),
        }));
    };

    clearPalette = () => {
        this.setState({ colors: [] });
    }

    addRandomColor = () => {
        const { palettes } = this.props;
        let isDuplicate = true;
        let randomPalette;
        let randomColor;
        while (isDuplicate) {
            randomPalette = palettes[Math.floor(Math.random() * palettes.length)];
            randomColor = randomPalette.colors[Math.floor(Math.random() * randomPalette.colors.length)];
            isDuplicate = this.state.colors.some(color => color.name === randomColor.name);
        }
        this.setState({ colors: [...this.state.colors, randomColor] });
    }

    render() {
        const { classes, maxColors, palettes } = this.props;
        const { open, colors } = this.state;
        const paletteFull = colors.length >= maxColors;
        return (
            <div className={classes.root} >
                <PaletteFormNav
                    open={open}
                    palettes={palettes}
                    handleDrawerOpen={this.handleDrawerOpen}
                    handleSubmit={this.handleSubmit}
                />
                <Drawer
                    className={classes.drawer}
                    variant="persistent"
                    anchor="left"
                    open={open}
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                >
                    <div className={classes.drawerHeader}>
                        <IconButton onClick={this.handleDrawerClose}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </div>
                    <Divider />
                    <div className={classes.container}>
                        <Typography variant='h5' gutterBottom>
                            Design Your Palette
                        </Typography>
                        <div className={classes.buttons}>
                            <Button
                                variant='contained'
                                color='secondary'
                                onClick={this.clearPalette}
                                className={classes.button}
                            >
                                Clear Palette
                        </Button>
                            <Button
                                variant='contained'
                                color='primary'
                                onClick={this.addRandomColor}
                                disabled={paletteFull}
                                className={classes.button}
                            >
                                Random Color
                        </Button>
                        </div>
                        <ColorPickerForm
                            paletteFull={paletteFull}
                            colors={colors}
                            addNewColor={this.addNewColor}
                        />
                    </div>
                </Drawer>
                <main
                    className={clsx(classes.content, {
                        [classes.contentShift]: open,
                    })}
                >
                    <div className={classes.drawerHeader} />
                    <DraggableColorList
                        colors={this.state.colors}
                        removeColor={this.removeColor}
                        axis='xy'
                        onSortEnd={this.onSortEnd}
                        distance={20}
                    />
                </main>
            </div>
        );
    }
}

export default withStyles(styles, { withTheme: true })(NewPaletteForm);
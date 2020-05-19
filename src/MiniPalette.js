import React, { PureComponent } from 'react';
import { withStyles } from '@material-ui/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import styles from './styles/MiniPaletteStyles';

class MiniPalette extends PureComponent {
    handleDeletePalette = (e) => {
        e.stopPropagation();
        this.props.openDialog(this.props.id);
    }

    handleClick = () => {
        this.props.goToPalette(this.props.id)
    }

    render() {
        const { classes, paletteName, emoji, colors } = this.props;
        return (
            <div className={classes.root} onClick={this.handleClick}>
                <DeleteIcon
                    className={classes.deleteIcon}
                    style={{ transition: "all 0.3s ease-in-out" }}
                    onClick={this.handleDeletePalette}
                />
                <div className={classes.colors}>
                    {colors.map(color => (
                        <div
                            className={classes.minicolor}
                            style={{ backgroundColor: color.color }}
                            key={color.name}
                        ></div>
                    ))}
                </div>
                <h5 className={classes.title}>
                    {paletteName} <span className={classes.emoji}>{emoji}</span>
                </h5>
            </div>
        );
    }
}

export default withStyles(styles)(MiniPalette);
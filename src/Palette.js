import React, { Component } from 'react';
import ColorBox from './ColorBox';
import Navbar from './Navbar';
import PaletteFooter from './PaletteFooter';
import { withStyles } from "@material-ui/styles";
import styles from './styles/PaletteStyles';

class Palette extends Component {
    constructor(props) {
        super(props);
        this.state = { level: 500, format: 'hex' };
    }
    changeLevel = (level) => {
        this.setState({ level });
    }
    changeFormat = (format) => {
        this.setState({ format });
    }
    render() {
        const { colors, paletteName, emoji, id } = this.props.palette;
        const { classes } = this.props;
        const { level, format } = this.state;
        return (
            <div className={classes.Palette}>
                <Navbar
                    changeLevel={this.changeLevel}
                    level={level}
                    handleChange={this.changeFormat}
                    showSlider={true}
                />
                <div className={classes.colors}>
                    {colors[level].map(color => (
                        <ColorBox
                            key={color.id}
                            id={color.id}
                            background={color[format]}
                            name={color.name}
                            paletteId={id}
                            showingFullPalette={true}
                        />
                    ))}
                </div>
                <PaletteFooter paletteName={paletteName} emoji={emoji} />
            </div>
        );
    }
}

export default withStyles(styles)(Palette);
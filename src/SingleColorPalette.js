import React, { Component } from 'react';
import ColorBox from './ColorBox';
import Navbar from './Navbar';
import PaletteFooter from './PaletteFooter';
import { withStyles } from "@material-ui/styles";
import { Link } from 'react-router-dom';
import styles from './styles/PaletteStyles';

class SingleColorPalette extends Component {
    constructor(props) {
        super(props);
        this._shades = this.gatherShades(this.props.palette, this.props.colorId);
        this.state = { format: 'hex' };
    }
    gatherShades(palette, colorToFilterBy) {
        let shades = [];
        for (let key in palette.colors) {
            shades = shades.concat(
                palette.colors[key].filter(color => color.id === colorToFilterBy)
            );
        }
        return shades.slice(1);
    }
    changeFormat = (format) => {
        this.setState({ format });
    }
    render() {
        const { format } = this.state;
        const { paletteName, emoji, id } = this.props.palette;
        const { classes } = this.props;
        return (
            <div className={classes.Palette}>
                <Navbar
                    handleChange={this.changeFormat}
                    showSlider={false}
                />
                <div className={classes.colors}>
                    {this._shades.map(shade =>
                        <ColorBox
                            key={shade.name}
                            background={shade[format]}
                            name={shade.name}
                            showingFullPalette={false}
                        />
                    )}
                    <div className={classes.goBack}>
                        <Link to={`/palette/${id}`}>Go Back</Link>
                    </div>
                </div>
                <PaletteFooter paletteName={paletteName} emoji={emoji} />
            </div>
        );
    }
}

export default withStyles(styles)(SingleColorPalette);
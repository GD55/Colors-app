import React, { Component } from 'react';
import { Button } from '@material-ui/core';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { ChromePicker } from 'react-color';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles/ColorPickerFormStyles';

class ColorPickerForm extends Component {
    state = {
        currenColor: 'yellow',
        newColorName: ''
    }

    componentDidMount() {
        ValidatorForm.addValidationRule('isColorNameUnique', (value) =>
            this.props.colors.every(
                ({ name }) => name.toLowerCase() !== value.toLowerCase()
            )
        );
        ValidatorForm.addValidationRule('isColorUnique', (value) =>
            this.props.colors.every(
                ({ color }) => color !== this.state.currenColor
            )
        );
    }

    updateColor = (newColor) => {
        this.setState({ currenColor: newColor.hex });
    };

    handleChange = (evt) => {
        this.setState({ [evt.target.name]: evt.target.value });
    }

    handleSubmit = () => {
        const newcolor = {
            name: this.state.newColorName,
            color: this.state.currenColor
        }
        this.props.addNewColor(newcolor);
        this.setState({ newColorName: '' });
    }

    render() {
        const { paletteFull, classes } = this.props;
        const { currenColor, newColorName } = this.state;
        return (
            <div>
                <ChromePicker
                    color={currenColor}
                    onChangeComplete={this.updateColor}
                    className={classes.picker}
                />
                <ValidatorForm
                    onSubmit={this.handleSubmit}
                    ref='form'
                    instantValidate={false}
                >
                    <TextValidator
                        value={newColorName}
                        className={classes.colorNameInput}
                        variant='filled'
                        margin='normal'
                        placeholder='Color Name'
                        onChange={this.handleChange}
                        name='newColorName'
                        validators={['required', 'isColorNameUnique', 'isColorUnique']}
                        errorMessages={[
                            'this field is required',
                            'Color name must be unique',
                            'Color already in use'
                        ]}
                    />
                    <Button
                        variant='contained'
                        color='primary'
                        type='submit'
                        style={{
                            backgroundColor: paletteFull
                                ? "grey"
                                : currenColor
                        }}
                        disabled={paletteFull}
                        className={classes.addColor}
                    >
                        {paletteFull ? 'Palette Full' : 'ADD COLOR'}
                    </Button>
                </ValidatorForm>
            </div>
        );
    }
}

export default withStyles(styles)(ColorPickerForm);
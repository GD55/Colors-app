import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Picker } from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css'

class PaletteMetaForm extends Component {
    state = {
        stage: 'form',
        newPaletteName: ''
    }

    componentDidMount() {
        ValidatorForm.addValidationRule('isPaletteNameUnique', (value) =>
            this.props.palettes.every(
                ({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
            )
        );
    }

    handleChange = (evt) => {
        this.setState({ [evt.target.name]: evt.target.value });
    }

    showEmojiPicker = () => {
        this.setState({ stage: 'emoji' });
    }

    savePalette = (emoji) => {
        const newPalette = {
            paletteName: this.state.newPaletteName,
            emoji: emoji.native,
        }
        this.props.handleSubmit(newPalette);
        this.setState({ stage: '' });
    }

    render() {
        const { stage, newPaletteName } = this.state;
        const { hideForm } = this.props;
        return (
            <div>
                <Dialog open={stage === 'emoji'} onClose={hideForm}>
                    <DialogTitle id="form-dialog-title">Pick a Palette Emoji</DialogTitle>
                    <Picker title='Pick a Palette Emoji' onSelect={this.savePalette} />
                </Dialog>
                <Dialog open={stage === 'form'} onClose={hideForm} aria-labelledby="form-dialog-title">
                    {/*  */}
                    <DialogTitle id="form-dialog-title">Choose a Palette Name</DialogTitle>

                    <ValidatorForm onSubmit={this.showEmojiPicker}>
                        <DialogContent>
                            <DialogContentText>
                                Please enter a name for your new palette, Make sure it's unique!
                            </DialogContentText>
                            <TextValidator
                                label="Palette Name"
                                value={newPaletteName}
                                name='newPaletteName'
                                onChange={this.handleChange}
                                fullWidth
                                placeholder='Palette Name'
                                validators={['required', 'isPaletteNameUnique']}
                                errorMessages={['this field is required', 'Palette name must be unique']}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={hideForm} color="primary">
                                Cancel
                            </Button>
                            <Button
                                variant='contained'
                                color='primary'
                                type='submit'
                            >
                                Save Palette
                            </Button>
                        </DialogActions>
                    </ValidatorForm>
                </Dialog>
            </div>
        );
    }
}

export default PaletteMetaForm;
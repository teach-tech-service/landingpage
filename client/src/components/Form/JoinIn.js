import React from 'react';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from '@material-ui/core/Typography';
import FormHelperText from '@material-ui/core/FormHelperText'
import './JoinIn.css';

export default class JoinIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            imie: '',
            email: '',
            lastName: '',
            nameError: null,
            emailError: null,
            checkErrName: false,
            checkErrEmail: false,
            checkErrPass: false,
            formControl1: false,
            formControl2: false,

        }
    }

    handleChange = event => {
        const target = event.target;
        const name = target.name;
        this.setState({ [name]: event.target.value }, () => {
            if (name === "imie") {
                this.validateName();
            } else if (name === "email") {
                this.validateEmail();
            }
        });
    };

    validateName = () => {
        const { imie } = this.state;
        if (imie !== "") {
            this.setState({
                nameError: 4 > imie.length >= 1 ? 'Nazwa musi posiadać więcej niż trzy znaki' : null,
                checkErrName: imie.length > 3 ? false : true,
            });
        } else {
            this.setState({
                nameError: null,
                checkErrName: false
            });
        }

    }

    validateEmail = () => {
        const { email } = this.state;

        if (email !== "") {
            this.setState({
                emailError: email.length > 3 ? null : 'Email musi posiadać więcej niż trzy znaki',
                checkErrEmail: email.length > 3 ? false : true,
            });
        } else {
            this.setState({
                emailError: null,
                checkErrEmail: false
            });
        }

    }

    handleCheckbox = name => e => {
        this.setState({ ...this.state, [name]: e.target.checked })
    }

    sendUser = _ => {
        const { imie, email, lastName } = this.state;
        fetch(`http://localhost:5000/api/users?name=${imie}&email=${email}&lastname=${lastName}`)
            .then(res => res.json())
            .catch(err => console.log(err))
    }

    handleSubmit = event => {
        event.preventDefault();
        this.sendUser()

    };

    render() {
        const { email, imie, formControl1, formControl2 } = this.state;
        const isEnabled = email.length > 3 && imie.length > 3 && formControl1 && formControl2 && !document.getElementById("email-helper-text");
        return (
            <ValidatorForm
                ref="form"
                onSubmit={this.handleSubmit}
                className="tts-form"
            >
                <TextValidator
                    variant="outlined"
                    margin="normal"
                    required
                    id="imie"
                    label="Imie"
                    name="imie"
                    className="tts-inputField"
                    value={this.state.imie}
                    onChange={this.handleChange}
                    onBlur={this.validateName}
                    error={this.state.checkErrName}
                    validators={['required']}
                    errorMessages={['this field is required']}
                />
                <FormHelperText className={this.state.nameError !== null ? "tts-labelField" : "tts-labelField-d"} >{this.state.nameError}</FormHelperText>
                <TextField
                    variant="outlined"
                    margin="normal"
                    className="tts-inputField"
                    name="lastName"
                    label="Nazwisko"
                    id="lastName"
                    autoComplete="current-lastName"
                    validators={['required']}
                    errorMessages={['this field is required']}
                    value={this.state.lastName}
                    onChange={this.handleChange}
                />
                <TextValidator
                    variant="outlined"
                    margin="normal"
                    required
                    className="tts-inputField"
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    value={this.state.email}
                    onChange={this.handleChange}
                    onBlur={this.validateEmail}
                    error={this.state.checkErrEmail}
                    validators={['required', 'isEmail']}
                    errorMessages={['this field is required', 'Podany email jest nie poprawny']}
                />
                <FormHelperText className={this.state.emailError !== null ? "tts-labelField" : "tts-labelField-d"}>{this.state.emailError}</FormHelperText>

                <FormControl component="fieldset" className="" required>
                    <FormGroup>
                        <FormControlLabel
                            className="tts-labelFormControl"
                            control={<Checkbox checked={formControl1} onChange={this.handleCheckbox('formControl1')} value="formControl1" />}
                            label={<Typography className="tts-checkbox" >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur non nulla nibh. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. In risus odio, egestas at nunc mollis, mollis consectetur turpis.</Typography>}
                        />
                        <FormControlLabel
                            className="tts-labelFormControl"
                            control={<Checkbox checked={formControl2} onChange={this.handleCheckbox('formControl2')} value="formControl2" />}
                            label={<Typography className="tts-checkbox" >Etiam eleifend lorem ut quam dictum, sit amet rhoncus felis pellentesque. Curabitur id nisi id magna gravida posuere. Etiam ut metus et quam interdum hendrerit ac sed nulla. Aenean porttitor orci eu odio malesuada suscipit.</Typography>}
                        />
                    </FormGroup>
                </FormControl>
                <Button
                    type="submit"
                    variant="contained"
                    className="tts-btn-submit"
                    disabled={!isEnabled}
                >
                    Zapisz się
                    </Button>
            </ValidatorForm>
        );
    }
}

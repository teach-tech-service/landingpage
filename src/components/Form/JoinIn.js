import React from 'react';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from '@material-ui/core/Typography';
import FormHelperText from '@material-ui/core/FormHelperText'
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import './JoinIn.css';

const emailRegex = RegExp(
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

export default class JoinIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            imie: '',
            email: '',
            password: '',
            nameError: '',
            emailError: '',
            passwordErr: '',
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
            if (name == "imie") {
                this.validateName();
            } else if (name == "email") {
                this.validateEmail();
            } else {
                this.validatePass();
            }
        });
    };

    validateName = () => {
        const { imie } = this.state;
        if (imie != "") {
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

        if (email != "") {
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

    validatePass = () => {
        const { password } = this.state;

        if (password != "") {
            this.setState({
                passwordErr: password.length > 8 ? null : 'Hasło musi posiadać więcej niż 8 znaki',
                checkErrPass: password.length > 8 ? false : true,
            });
        } else {
            this.setState({
                passwordErr: null,
                checkErrPass: false
            });
        }

    }

    handleCheckbox = name => e => {
        this.setState({ ...this.state, [name]: e.target.checked })
    }

    handleSubmit = event => {
        event.preventDefault();
        const { imie, email, checkErrName, checkErrEmail } = this.state;
        if (checkErrEmail || checkErrName) {
            alert(`ZJEBAŁEŚ`);
        } else {
            alert(`Your state values: \n 
            name: ${imie} \n 
            email: ${email}`);
        }
    };

    render() {
        const { email, password, imie, formControl1, formControl2 } = this.state;
        const isEnabled = email.length > 3 && password.length > 8 && imie.length > 3 && formControl1 && formControl2;
        return (

            <form noValidate onSubmit={this.handleSubmit} className="tts-form">
                <TextField
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
                />
                <div className='tts-labelField'>{this.state.nameError}</div>
                <TextField
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
                />

                <div className='tts-labelField'>{this.state.emailError}</div>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    className="tts-inputField"
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={this.state.password}
                    onChange={this.handleChange}
                    onBlur={this.validatePass}
                    error={this.checkErrPass}
                />
                <div className='tts-labelField'>{this.state.passwordErr}</div>
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
            </form>

        );
    }
}

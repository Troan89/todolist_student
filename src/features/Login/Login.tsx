import {
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormLabel,
    Grid,
    TextField
} from "@material-ui/core";
import { useFormik} from "formik";
import * as Yup from 'yup';
import {useDispatch} from "react-redux";
import {loginTC} from "./auth-reducer";
import {useAppDispatch, useAppSelector} from "../../app/store";
import {Navigate} from "react-router-dom";

export const Login = () => {
    const isLoggedIn = useAppSelector(state=> state.auth.isLoggedIn)

    const validationLogin = Yup.object().shape({
        password: Yup.string()
            .min(3, 'small symbol')
            .required('Required'),
        email: Yup.string()
            .email('Invalid email')
            .required('Required'),

    })

    const dispatch = useAppDispatch()

    const formik = useFormik({
        validationSchema: validationLogin,
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        onSubmit: values => {
            dispatch(loginTC(values))
        },

    })

    if(isLoggedIn) {
        return <Navigate to={'/'} />
    }

    return <Grid container justifyContent={"center"}>
        <Grid item justifyContent={"center"}>
            <form onSubmit={formik.handleSubmit}>
                <FormControl>
                    <FormLabel>
                        <p>To log in get registered
                            <a href={'https://social-network.samuraijs.com/'}
                               target={'_blank'}> here
                            </a>
                        </p>
                        <p>or use common test account credentials:</p>
                        <p>Email: free@samuraijs.com</p>
                        <p>Password: free</p>
                    </FormLabel>
                    <FormGroup>
                        <TextField label={"Email"} margin={"normal"} {...formik.getFieldProps('email')}/>
                        {formik.errors.email && <div style={{color: 'red'}}>{formik.errors.email}</div>}
                        <TextField type={"password"} label={"Password"}
                                   {...formik.getFieldProps('password')}/>
                        {formik.errors.password && <div style={{color: 'red'}}>{formik.errors.password}</div>}
                        <FormControlLabel
                            control={<Checkbox {...formik.getFieldProps('rememberMe')} checked={formik.values.rememberMe}/>}
                            label={"Remember me"}/>
                        <Button type={"submit"} variant={"contained"} color={"primary"}>Login</Button>
                    </FormGroup>
                </FormControl>
            </form>

        </Grid>
    </Grid>
}
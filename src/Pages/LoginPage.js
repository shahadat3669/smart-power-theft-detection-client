import React from 'react'
import { LockOutlined } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import {
    Avatar,
    Checkbox,
    Container,
    FormControlLabel,
    TextField,
    Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { login, } from '../features/authSlice'
const LoginPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading, error } = useSelector(state => ({ ...state.auth }));
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const { email, password } = formData;
    const onInputChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleSubmit = event => {
        event.preventDefault();
        if (email && password) {
            dispatch(login({ formData, navigate, toast }));
        }
    };
    useEffect(() => {
        error && toast.error(error);
    }, [error]);
    return (
        <Container>
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}>
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlined />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        onChange={onInputChange}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        onChange={onInputChange}
                        autoComplete="current-password"
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    />

                    <LoadingButton
                        onClick={handleSubmit}
                        loading={loading}
                        loadingIndicator="Loading..."
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}>
                        Sign In
                    </LoadingButton>
                </Box>
            </Box>
        </Container>
    )
}

export default LoginPage
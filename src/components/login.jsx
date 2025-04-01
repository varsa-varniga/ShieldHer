import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  Button,
  Divider,
  Link,
  Alert
} from '@mui/material';
import { Visibility, VisibilityOff, Google } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import authService from '../api/auth';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const response = await authService.login(formData);
      if (response) {
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ 
        marginTop: 8, 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        padding: 4, 
        boxShadow: 3, 
        borderRadius: 2,
        border: '1px solid grey',
        backgroundColor: 'transparent'
      }}>
        <Typography component="h1" variant="h5" sx={{ mb: 3, color: 'white' }}>
          Login
        </Typography>
        
        {error && <Alert severity="error" sx={{ width: '100%', mb: 2 }}>{error}</Alert>}

        <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={formData.email}
            onChange={handleChange}
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'whitesmoke',
                  borderRadius: '10px'
                },
                '&:hover fieldset': {
                  borderColor: 'whitesmoke'
                }
              },
              '& .MuiInputLabel-root': {
                color: 'whitesmoke'
              },
              '& .MuiInputBase-input': {
                color: 'white'
              }
            }}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            id="password"
            autoComplete="current-password"
            value={formData.password}
            onChange={handleChange}
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'whitesmoke',
                  borderRadius: '10px'
                },
                '&:hover fieldset': {
                  borderColor: 'whitesmoke'
                }
              },
              '& .MuiInputLabel-root': {
                color: 'whitesmoke'
              },
              '& .MuiInputBase-input': {
                color: 'white'
              }
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                    sx={{ color: 'whitesmoke' }}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />

          <Box sx={{ textAlign: 'right', mt: 1 }}>
            <Link component={RouterLink} to="/forgotPassword" variant="body2" sx={{ color: 'whitesmoke' }}>
              Forgot password?
            </Link>
          </Box>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={loading}
            sx={{ 
              mt: 3, 
              mb: 2, 
              py: 1.5,
              borderRadius: '10px',
              fontWeight: 600
            }}
          >
            {loading ? 'Logging in...' : 'Login'}
          </Button>

          <Divider sx={{ 
            my: 3,
            color: 'whitesmoke',
            '&::before, &::after': {
              borderColor: 'whitesmoke'
            }
          }}>OR</Divider>

          <Button
            fullWidth
            variant="outlined"
            startIcon={<Google />}
            sx={{ 
              mb: 2, 
              py: 1.5,
              color: 'whitesmoke',
              borderColor: 'whitesmoke',
              borderRadius: '10px',
              '&:hover': {
                borderColor: 'whitesmoke'
              }
            }}
          >
            Continue with Google
          </Button>

          <Box sx={{ textAlign: 'center', mt: 2 }}>
            <Typography variant="body2" sx={{ color: 'whitesmoke' }}>
              Don't have an account?{' '}
              <Link component={RouterLink} to="/signup" sx={{ fontWeight: 'bold', color: 'white' }}>
                Sign up
              </Link>
            </Typography>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
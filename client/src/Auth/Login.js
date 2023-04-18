import {useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import "../css/Auth.css"
import Navbar1 from "../components/Navbar"

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © Thammasat University'}
      <Link color="inherit" href="https://mui.com/">
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignIn() {

  const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	async function loginUser(event) {
		event.preventDefault()

		const response = await fetch('https://e-learning-backends.onrender.com/api/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				email,
				password,
			}),
		})
		
		const data = await response.json()
		console.log(data)
		if (data.user) {
			localStorage.setItem('token', data.user)
			localStorage.setItem('role', data.role)
			alert('Login successful')
			window.location.href = '/'
		} else {
			alert('Please check your username and password')
		}
	}


  return (
    <div>
      <Navbar1/>
      <div className='box_auth'>
        <div className='inner_box_auth'>
        <ThemeProvider theme={theme}>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5" tabIndex={0}>
                Sign in
              </Typography>
              <Box component="form" onSubmit={loginUser} noValidate sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  placeholder="Email Address"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link href="#" variant="body2">
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href="#" variant="body2">
                      Don't have an account? Sign Up
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Container>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </ThemeProvider>

        </div>
      </div>
    </div>
  );
}
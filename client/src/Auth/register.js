import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import "../css/Auth.css"
import Navbar1 from "../components/Navbar"
import { FormGroup } from '@mui/material';

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

export default function SignUp() {

  useEffect(() => {
    document.title = 'Register page';
  }, []);

	const navigate = useNavigate()

	const [name, setName] = useState('')
	const [lastname, setLastName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
  const [role, setRole] = useState('')

	
	async function registerUser(event) {

		event.preventDefault()

		const response = await fetch('http://localhost:5000/api/register', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				name,
				email,
				password,
				role
			}),
		})

		const data = await response.json()

		if (data.status === 'ok') {
			navigate('/login')
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
              <Typography component="h1" variant="h5">
                Sign up
              </Typography>
              <Box component="form" noValidate onSubmit={registerUser} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="given-name"
                      name="firstName"
                      required
                      fullWidth
                      id="firstName"
                      label="First Name"
                      autoFocus
              onChange={(e) => setName(e.target.value)}
              placeholder='First Name'
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      id="lastName"
                      label="Last Name"
                      name="lastName"
                      autoComplete="family-name"
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last Name"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="new-password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    
                  </Grid>
                </Grid>

                <br></br>
                Select Role

                {/* <FormGroup>
                  <FormControlLabel control={()=>{setRole("teacher")}} label="teacher" />
                  <FormControlLabel control={()=>{setRole("student")}} label="student" />
                </FormGroup> */}

                {/* <Checkbox
                  label="teacher"
                  checked=""
                  onChange={()=>{setRole("teacher")}}
                  inputProps={{ 'aria-label': 'controlled' }}
                />

                <Checkbox 
                  label="student"
                  unchecked
                  onChange={()=>{setRole("student")}}
                  inputProps={{ 'aria-label': 'controlled' }}
                /> */}
                <FormGroup>
                  <FormControlLabel placeholder='teacher' control={<Checkbox />} onClick={()=>{setRole("teacher")}} label="teacher" />
                  <FormControlLabel placeholder='student' control={<Checkbox />} onClick={()=>{setRole("student")}} label="student" />
                </FormGroup>

                {console.log("xxxxxxaaaaaxxxx",role)}

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >

                  Sign Up
                </Button>
                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <Link href="#" variant="body2">
                      Already have an account? Sign in
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
            
              
            <Copyright sx={{ mt: 5 }} />
          </Container>
        </ThemeProvider>
        

        </div>
      </div>
    </div>
  );
}
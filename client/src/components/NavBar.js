import { AppBar, Container, Toolbar, Typography, Button } from '@mui/material'
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

// The hyperlinks in the NavBar contain a lot of repeated formatting code so a
// helper component NavText local to the file is defined to prevent repeated code.
const NavText = ({ href, text, isMain }) => {
  return (
    <Typography
      variant={isMain ? 'h5' : 'h7'}
      noWrap
      style={{
        marginRight: '30px',
        fontFamily: 'serif',
        fontWeight: 700,
        letterSpacing: '.3rem',
      }}
    >
      <NavLink
        to={href}
        style={{
          color: 'inherit',
          textDecoration: 'none',
        }}
      >
        {text}
      </NavLink>
    </Typography>
  )
}


// Here, we define the NavBar. Note that we heavily leverage MUI components
// to make the component look nice. Feel free to try changing the formatting
// props to how it changes the look of the component.
export default function NavBar() {
  const navigate = useNavigate();

  const logout = () => {
  window.sessionStorage.clear();
  navigate('/');
}
  return (
    <AppBar position='static'>
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          <NavText href='/home' text='FlavorFinder' isMain />
          <NavText href='/search' text='SEARCH' />
          <NavText href='/recipes' text='RECIPES'/>
          <NavText href='/reviews' text='REVIEWS'/>
          <NavText href='/likes' text='LIKES' />
          <NavText href='/' text='LOGIN'/>

          <Button variant="contained" color="secondary"  onClick={() => logout() } >
            LOGOUT
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
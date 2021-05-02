//modified version of the MUI templaye for photoalbum 
//Imports
import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { CardMedia } from '@material-ui/core';
import cam from './Images/cam.png';
import sens from './Images/sensors.png';
import cloud from './Images/cloud.png';
import emergencyLight from './Images/emergency.png';
import { Link } from 'react-router-dom';

//Theme for the colouring
const theme = createMuiTheme({
    palette: {
      primary: {
        main: '#6200ea',
      },
      secondary: {
        main: '#ffffff',
      },
    },
  });

//style classes for components
const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
    marginTop: '15vh'
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    margin: '2vh'
  },
  cardMedia: {
    paddingTop: '56.25%', 
  },
  cardContent: {
    flexGrow: 1,
  },
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(12, 1fr)',
    gridGap: theme.spacing(3),
  }
}));

//The lading page component
export default function LandingPage() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <ThemeProvider theme={theme}> 
      <CssBaseline />
      <main>
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              SecureAndSafe
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
              A simple yet effective way to protect yourself and your home from any unwanted visitors.
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justify="center">
                <Grid item>
                  <Link to="/login">
                    <Button variant="contained" color="primary"  as={Link} to="/login">
                      Sign In
                    </Button>
                  </Link>
                </Grid>
              </Grid>
            </div>
          </Container>
        </div>
        <Grid container spacing={3}>
          <Grid item xs={3}>
            <Card className={classes.card}>
              <CardMedia
                className={classes.cardMedia}
                image={cam}
                title="Camera"
              />
              <CardContent className={classes.cardContent}>
                <Typography gutterBottom variant="h5" component="h2">
                  Camera Integration
                </Typography>
                <Typography>
                  Set up the system to take photos and videos of any intruders.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={3}>
            <Card className={classes.card}>
              <CardMedia
                className={classes.cardMedia}
                image={sens}
                title="sensors"
              />
              <CardContent className={classes.cardContent}>
                <Typography gutterBottom variant="h5" component="h2">
                  Sensors
                </Typography>
                <Typography>
                  The system can be modfied and improved upon with different sensors to fit your individual needs.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={3}>
            <Card className={classes.card}>
              <CardMedia
                className={classes.cardMedia}
                image={cloud}
                title="Cloud"
              />
              <CardContent className={classes.cardContent}>
                <Typography gutterBottom variant="h5" component="h2">
                  Backup your data
                </Typography>
                <Typography>
                  Your data is stored securely on an external database.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={3}>
            <Card className={classes.card}>
              <CardMedia
                className={classes.cardMedia}
                image={emergencyLight}
                title="emergencyLight"
              />
              <CardContent className={classes.cardContent}>
                <Typography gutterBottom variant="h5" component="h2">
                  Warning System
                </Typography>
                <Typography>
                  Includes both audio and visual deterrents for any would be intruders.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </main>
      <footer className={classes.footer}>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
          Tanish Shah RUHacks2021 Project
        </Typography>
      </footer>
      </ThemeProvider>
    </React.Fragment>
  );
}
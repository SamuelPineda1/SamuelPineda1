import React from 'react';
import { Box, Container, Typography, Button} from '@mui/material';
import Grid from "@mui/material/Grid";

export const Hero: React.FC = () => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <Box
      component="header"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        backgroundColor: 'background.default',
        pt: { xs: 10, md: 12 }, // space for navbar
      }}
    >
      <Container maxWidth="md">
        <Grid container spacing={6} alignItems="center">
          {/* Left side text */}
          <Grid size={{xs:12, md:7}} >
            <Typography
              variant="overline"
              sx={{ color: 'primary.main', letterSpacing: '0.18em' }}
            >
              SOFTWARE DEVELOPER · ONTARIO, CANADA
            </Typography>

            <Typography
              variant="h2"
              sx={{ mt: 2, mb: 2, fontSize: { xs: '2.4rem', md: '3.4rem' }, lineHeight: 1.05 }}
            >
              Building modern, efficient full-stack applications.
            </Typography>

            <Typography variant="body1" sx={{ color: 'text.secondary', maxWidth: 520, mb: 4 }}>
              I’m Samuel, a Computer Systems student working with React, TypeScript, 
              FastAPI, .NET, and SQL. I focus on clean code, debugging, and practical, 
              scalable solutions.
            </Typography>

            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <Button
                variant="contained"
                size="large"
                onClick={() => scrollTo('contact')}
              >
                Contact me
              </Button>
              <Button
                variant="outlined"
                size="large"
                onClick={() => scrollTo('projects')}
              >
                View projects
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

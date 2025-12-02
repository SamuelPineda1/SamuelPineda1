import React from 'react';
import { Typography, Box, Chip, Stack } from '@mui/material';
import { Section } from '../components/Section';

export const About: React.FC = () => {
  return (
    <Section id="about">
      <Typography variant="overline" sx={{ color: 'primary.main' }}>
        ABOUT
      </Typography>
      <Typography variant="h3" sx={{ mt: 1, mb: 2, fontSize: { xs: '1.8rem', md: '2.2rem' } }}>
        A bit about me
      </Typography>

      <Typography variant="body1" sx={{ color: 'text.secondary', mb: 3 }}>
        Detail-oriented and passionate Software Engineering student with hands-on experience in full-stack web development using
        React, TypeScript, Python (FastAPI), C#, and SQL. Skilled in creating scalable and efficient applications, with a strong
        foundation in debugging, data structures, and API integration. Recognized for logical problem-solving and teamwork in Agile
        environments. Excited to contribute to innovative, projects while expanding expertise across both frontend and backend 
        technologies.

      </Typography>

      <Box>
        <Typography variant="subtitle2" sx={{ mb: 1 }}>
          Focus areas right now:
        </Typography>
        <Stack direction="row" flexWrap="wrap" gap={1}>
          <Chip label="Full-stack development" variant="outlined" />
            <Chip label="API design & integration" variant="outlined" />
            <Chip label="Database modeling" variant="outlined" />
            <Chip label="Debugging & problem solving" variant="outlined" />
            <Chip label="Agile teamwork" variant="outlined" />
        </Stack>
      </Box>
    </Section>
  );
};

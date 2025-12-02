import React from 'react';
import {
  Typography,
  Box,
  Card,
  CardContent,
  Chip,
  Stack,
  Link as MuiLink,
} from '@mui/material';
import { Section } from '../components/Section';

type Project = {
  title: string;
  description: string;
  tech: string[];
  github?: string;
  demo?: string;
};

const projects: Project[] = [
  {
    title: 'Sports Investor App',
    description:
      'Full-stack system for evaluating bets using FastAPI, React, and PostgreSQL with automation for data ingestion and reporting.',
    tech: ['FastAPI', 'React', 'TypeScript', 'PostgreSQL', 'n8n'],
    github: 'https://github.com/SamuelPineda1/sports-investor-app',
  },
  {
    title: 'Notes App (Full-Stack)',
    description:
      'Authentication-enabled notes manager built with React, Material UI, .NET, and Entity Framework Core.',
    tech: ['React', 'TypeScript', '.NET', 'EF Core', 'Material UI'],
  },
  {
    title: 'FrenchieFans',
    description:
      'Built an interactive web-based puzzle game implementing score tracking and move validation, improving usability and logic comprehension.',
    tech: ['WordPress', 'Astra', 'JavaScript'],
  },
  {
    title: 'Triangular Peg Solitaire',
    description:
      'WordPress + Astra site with blog + affiliate product recommendations focused on French Bulldogs.',
    tech: ['JavaScript', 'SVG'],
    demo: `${import.meta.env.BASE_URL}/triangle-game/index.html`,
  },
];

export const Projects: React.FC = () => {
  return (
    <Section id="projects">
      <Typography variant="overline" sx={{ color: 'primary.main' }}>
        PROJECTS
      </Typography>
      <Typography variant="h3" sx={{ mt: 1, mb: 4, fontSize: { xs: '1.8rem', md: '2.2rem' } }}>
        Selected work
      </Typography>

      <Stack spacing={3}>
        {projects.map((project) => (
          <Card key={project.title} elevation={0} sx={{ backgroundColor: 'background.paper' }}>
            <CardContent>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  gap: 2,
                  flexWrap: 'wrap',
                }}
              >
                <Box>
                  <Typography variant="h6" sx={{ mb: 1 }}>
                    {project.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
                    {project.description}
                  </Typography>
                  <Stack direction="row" flexWrap="wrap" gap={1} sx={{ mb: 1 }}>
                    {project.tech.map((t) => (
                      <Chip key={t} label={t} size="small" variant="outlined" />
                    ))}
                  </Stack>
                </Box>

                <Stack direction="row" spacing={1}>
                  {project.github && (
                    <MuiLink
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      underline="hover"
                      sx={{ fontSize: 14 }}
                    >
                      GitHub
                    </MuiLink>
                  )}
                  {project.demo && (
                    <MuiLink
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      underline="hover"
                      sx={{ fontSize: 14 }}
                    >
                      Live demo
                    </MuiLink>
                  )}
                </Stack>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Stack>
    </Section>
  );
};

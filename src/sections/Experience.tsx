import React from 'react';
import { Typography, Stack, Box } from '@mui/material';
import { Section } from '../components/Section';

type ExperienceItem = {
  title: string;
  place: string;
  period: string;
  description: string;
};

const items: ExperienceItem[] = [
  {
    title: "Junior Full-Stack Developer (Co-op)",
    place: "MEDIC – Mohawk College",
    period: "Jan 2025 – Aug 2025",
    description:
      "Developed reusable React + Material UI components, built backend templates with FastAPI and PostgreSQL, participated in Agile sprints, assisted with planning and testing, and delivered product demos to improve UX."
  },
  {
    title: "Freelance Web Developer",
    place: "Self-employed – Canada",
    period: "2024 – Present",
    description:
      "Designed and launched responsive WordPress sites with Astra and Spectra blocks. Improved SEO, performance, and mobile usability for clients across multiple industries."
  },
];

export const Experience: React.FC = () => {
  return (
    <Section id="experience">
      <Typography variant="overline" sx={{ color: 'primary.main' }}>
        EXPERIENCE
      </Typography>
      <Typography variant="h3" sx={{ mt: 1, mb: 4, fontSize: { xs: '1.8rem', md: '2.2rem' } }}>
        Where I&apos;ve been
      </Typography>

      <Stack spacing={3}>
        {items.map((item) => (
          <Box key={item.title}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              {item.title}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', mb: 0.5 }}>
              {item.place} · {item.period}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {item.description}
            </Typography>
          </Box>
        ))}
      </Stack>
    </Section>
  );
};

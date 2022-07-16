import {
  Discord,
  Email,
  Github,
  Medium,
  Twitter,
} from '@frontend/shared-icons';
import { IconButton, Stack, Typography } from '@mui/material';
import { useIntl } from 'react-intl';

export const Footer = () => {
  const intl = useIntl();

  const socialIcons = [
    {
      title: intl.formatMessage({ defaultMessage: 'Github' }),
      icon: <Github />,
      href: 'https://github.com/mstable',
    },
    {
      title: intl.formatMessage({ defaultMessage: 'Discord' }),
      icon: <Discord />,
      href: 'https://discord.gg/pgCVG7e',
    },
    {
      title: intl.formatMessage({ defaultMessage: 'Twitter' }),
      icon: <Twitter />,
      href: 'https://twitter.com/mstable_',
    },
    {
      title: intl.formatMessage({ defaultMessage: 'Medium' }),
      icon: <Medium />,
      href: 'https://medium.com/mstable',
    },
    {
      title: intl.formatMessage({ defaultMessage: 'Email' }),
      icon: <Email />,
      href: 'mailto:info@mstable.org',
    },
  ];

  return (
    <Stack
      direction={{ xs: 'column', md: 'row' }}
      py={4}
      alignItems="center"
      spacing={1.5}
    >
      <Typography>
        <strong>{intl.formatMessage({ defaultMessage: 'mStable' })}</strong>
        &nbsp;|&nbsp;Meta-Vaults
      </Typography>
      <Stack
        direction="row"
        flexGrow={1}
        justifyContent="flex-end"
        alignItems="center"
        spacing={0.5}
      >
        {socialIcons.map((social) => (
          <IconButton
            color="secondary"
            key={social.title}
            href={social.href}
            target="_blank"
          >
            {social.icon}
          </IconButton>
        ))}
      </Stack>
    </Stack>
  );
};

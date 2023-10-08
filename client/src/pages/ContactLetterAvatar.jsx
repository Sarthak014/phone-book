import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import { useEffect } from 'react';
import { useState } from 'react';
import { Box } from '@mui/material';

function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(firstName, lastName, name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${firstName[0]}${lastName[0]}`,
  };
}

const ContactLetterAvatar = ({ firstName, lastName }) => {
  const [fullName, setFullName] = useState('');

  useEffect(() => {
    const name = lastName ? firstName+' '+lastName : firstName;
    setFullName(name);
  }, [firstName, lastName]);

  return (
    <Box sx={{ display:'flex', justifyContent:'center',alignItems:'center', flexGrow:0 }}>
      <Avatar {...stringAvatar(firstName, lastName, fullName)} />
    </Box>
  );
}

export default ContactLetterAvatar;


import { Box, styled, Typography } from '@mui/material';

const Image =styled(Box)({
    backgroundImage : 'url(https://images.unsplash.com/photo-1488998427799-e3362cec87c3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGJsb2clMjBiYWNrZ3JvdW5kJTIwYmFubmVyfGVufDB8fDB8fHww)',
    height: '50vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',

});


const Heading = styled(Typography)`
color: black;
font-size: 70px;

`

const SubHeading = styled(Typography)`

color: white;
background-color: black;
`

const Banner = () => {
  return (
    <Image>
        <Heading>BLOG</Heading>
        <SubHeading>LOREM IPSUM</SubHeading>
       </Image>
  );
};

export default Banner;

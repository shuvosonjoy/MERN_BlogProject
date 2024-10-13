import { AppBar,styled,Toolbar, Typography } from "@mui/material";



const Component = styled(AppBar)`
background-color: #FFFFFF;
color: #000000;


`;

const Container = styled(Toolbar)`
justify-content: center;
&>p{
padding: 20px;
}

`;

export const  Header = ()=>{
    return( 
        <Component>
            <Container>
                <Typography>Home</Typography>
                <Typography>About</Typography>
                <Typography>Contact</Typography>
                <Typography>Logout</Typography>
            </Container>
        </Component>
    );
}
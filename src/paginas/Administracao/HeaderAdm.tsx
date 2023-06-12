import {
    AppBar,
    Box,
    Button,
    Container,
    Link,
    Paper,
    Toolbar,
    Typography,
  } from "@mui/material";
  import { Link as LinkRouter, Outlet } from "react-router-dom";
  
  const HeaderAdm = () => {
    return (
      <>
        <AppBar position="static">
          <Container maxWidth="xl">
            <Toolbar>
              <Typography variant="h5">Administração</Typography>
              <Box sx={{ display: "flex", flexGrow: "1" }}>
                <Link component={LinkRouter} to={"/admin/restaurantes"}>
                  <Button sx={{ my: "2", color: "white" }}>Restaurantes</Button>
                </Link>
                <Link component={LinkRouter} to={"/admin/restaurantes/novo"}>
                  <Button sx={{ my: "2", color: "white" }}>
                    Novo restaurantes
                  </Button>
                </Link>
                <Link component={LinkRouter} to={"/admin/pratos"}>
                  <Button sx={{ my: "2", color: "white" }}>
                    Pratos
                  </Button>
                </Link>
                <Link component={LinkRouter} to={"/admin/pratos/novo"}>
                  <Button sx={{ my: "2", color: "white" }}>
                    Adicionar Pratos
                  </Button>
                </Link>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
  
        <Box>
          <Container maxWidth="lg" sx={{ mt: 5 }}>
            <Paper sx={{ p: 2 }}>
                <Outlet/>
            </Paper>
          </Container>
        </Box>
      </>
    );
  }
  
  export default HeaderAdm;
  
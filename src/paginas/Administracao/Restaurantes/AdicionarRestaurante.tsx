import {
  Box,
  Button,
  Container,
  Link,
  Paper,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import IRestaurante from "../../../interfaces/IRestaurante";
import http from "../../../componentes/http";

function AdicionarRestaurante() {
  const params = useParams();

  useEffect(() => {
    if (params.id) {
      http.get<IRestaurante>(`restaurantes/${params.id}/`)
        .then((response) => setNovoRestaurante(response.data.nome));
    }
  }, [params]);

  const [novoRestaurante, setNovoRestaurante] = useState("");

  const formDefault = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (params.id) {
      http
        .put(`restaurantes/${params.id}/`, {
          nome: novoRestaurante,
        })
        .then(() => {
          alert("Restaurante atualizado com Sucesso");
        });
    } else {
      http
        .post("restaurantes/", {
          nome: novoRestaurante,
        })
        .then(() => {
          alert("Restaurante cadastrado com Sucesso");
        });
    }
  };

  return (
    <>
      <Box>
        <Container maxWidth="lg" sx={{ mt: 5 }}>
          <Paper sx={{ p: 2 }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography component="h1" variant="h5">
                Formulário de Restaurantes
              </Typography>
              <Box
                component="form"
                onSubmit={formDefault}
                sx={{ width: "100%" }}
              >
                <TextField
                  label="Cadastrar restaurante"
                  variant="standard"
                  value={novoRestaurante}
                  onChange={(event) => setNovoRestaurante(event.target.value)}
                  fullWidth
                  required
                />
                <Button
                  sx={{ marginTop: 1 }}
                  fullWidth
                  type="submit"
                  variant="outlined"
                >
                  Salvar
                </Button>
              </Box>
            </Box>
          </Paper>
        </Container>
      </Box>
    </>
  );
}

export default AdicionarRestaurante;

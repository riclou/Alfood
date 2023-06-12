import { TagSharp } from "@mui/icons-material";
import {
    Box,
    Button,
    Container,
    FormControl,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    TextField,
    Typography,
  } from "@mui/material";
  import { useEffect, useState } from "react";
import http from "../../../componentes/http";
import ITag from "../../../interfaces/ITags";
import IRestaurante from "../../../interfaces/IRestaurante";
  
  function AdicionarPrato() {
  
    const [novoPrato, setNovoPrato] = useState("");
    const [descricao, setDescricao] = useState("");

    const [tags, setTags] = useState<ITag[]>([])
    const [tag, setTag] = useState("")

    const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([])
    const [restaurante, setRestaurante] = useState("")

    const [imagem, setImagem] = useState<File | null>(null)

    useEffect(() => {
      http.get<{ tags: ITag[] }> ("tags/")
      .then(response => setTags(response.data.tags))
      http.get<IRestaurante[]>("restaurantes/")
      .then(response => setRestaurantes(response.data))
    }, [])
  
    const formDefault = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const formData = new FormData()
      
      formData.append("nome", novoPrato)
      formData.append("descricao", descricao)

      formData.append("tag", tag)
      formData.append("restaurante", restaurante)

      if(imagem){
        formData.append("imagem", imagem)
      }

      http.request({
        url: "pratos/",
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data"
       },
       data: formData
      })
      .then(() => {
        setNovoPrato("")
        setDescricao("")
        setTag("")
        setRestaurante("")
        alert("Prato cadastrado com sucesso!")})
      .catch((error) => console.log(error))
    }

    const verificarArquivo = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files?.length) {
        setImagem(event.target.files[0])
      } else {
        setImagem(null)
      }
    }

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
                  Formulário de Pratos
                </Typography>
                <Box
                  component="form"
                  onSubmit={formDefault}
                  sx={{ width: "100%" }}
                >
                  <TextField
                    label="Nome do Prato"
                    variant="standard"
                    value={novoPrato}
                    onChange={(event) => setNovoPrato(event.target.value)}
                    fullWidth
                    required
                    margin="dense"
                  />
                  <TextField
                    label="Descrição"
                    variant="standard"
                    value={descricao}
                    onChange={(event) => setDescricao(event.target.value)}
                    fullWidth
                    required
                    margin="dense"
                  />
                  <FormControl margin="dense" fullWidth>
                    <InputLabel id="select-tag">Tags</InputLabel>
                    <Select labelId="select-tag" value={tag} onChange={(event => setTag(event.target.value))}>
                        {tags.map(tag => (
                          <MenuItem value={tag.value} key={tag.id}>{tag.value}</MenuItem>
                        ))}
                    </Select>
                  </FormControl>

                  <FormControl margin="dense" fullWidth>
                    <InputLabel id="select-restaurante">Restaurantes</InputLabel>
                    <Select labelId="select-restaurante" value={restaurante} onChange={(event => setRestaurante(event.target.value))}>
                        {restaurantes.map(restaurante => (
                          <MenuItem value={restaurante.id} key={restaurante.id}>{restaurante.nome}</MenuItem>
                        ))}
                    </Select>
                  </FormControl>

                  <input type="file" onChange={verificarArquivo}/>

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
  
  export default AdicionarPrato;
  
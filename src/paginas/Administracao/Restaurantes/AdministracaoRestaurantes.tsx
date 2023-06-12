import { useEffect, useState } from "react"
import IRestaurante from "../../../interfaces/IRestaurante"
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import { Link } from "react-router-dom"
import http from "../../../componentes/http"


function AdministracaoRestaurantes() {

  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([])

  useEffect(() => {
    http.get("restaurantes/")
    .then((response) => {
      setRestaurantes(response.data)
    })
  }, [])

  const deletarRestaurante = (excluirRestaunte: IRestaurante) => {
    http.delete(`restaurantes/${excluirRestaunte.id}/`)
    .then(() => {
      const listaRestaurantes = restaurantes.filter(restaurante => restaurante.id !== excluirRestaunte.id)
      setRestaurantes([...listaRestaurantes])
    })
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              Nome
            </TableCell>
            <TableCell>
              Editar
            </TableCell>
            <TableCell>
              Deletar
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {restaurantes.map((restaurante) => <TableRow key={restaurante.id}>
            <TableCell>
              {restaurante.nome}
            </TableCell>
            <TableCell>
            [  <Link to={`/admin/restaurantes/${restaurante.id}`}>Editar</Link> ]
            </TableCell>
            <TableCell>
              <Button variant="outlined" color="error" onClick={() => deletarRestaurante(restaurante)}>
                Excluir
              </Button>
            </TableCell>
          </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default AdministracaoRestaurantes
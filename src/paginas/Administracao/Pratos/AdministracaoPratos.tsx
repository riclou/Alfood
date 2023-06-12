import { useEffect, useState } from "react"
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import { Link } from "react-router-dom"
import http from "../../../componentes/http"
import IPrato from "../../../interfaces/IPrato"


function AdministracaoPratos() {

  const [pratos, setPratos] = useState<IPrato[]>([])

  useEffect(() => {
    http.get("pratos/")
    .then((response) => {
      setPratos(response.data)
    })
  }, [])

  const deletarPrato = (excluirPrato: IPrato) => {
    http.delete(`pratos/${excluirPrato.id}/`)
    .then(() => {
      const listaPratos = pratos.filter(pratos => pratos.id !== excluirPrato.id)
      setPratos([...listaPratos])
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
              Tag
            </TableCell>
            <TableCell>
              Imagem
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
          {pratos.map((pratos) => <TableRow key={pratos.id}>
            <TableCell>
              {pratos.nome}
            </TableCell>
            <TableCell>
              {pratos.tag}
            </TableCell>
            <TableCell>
                [<a href={pratos.imagem} target="_blank" rel="noopener noreferrer">Ver imagem</a>]
            </TableCell>
            <TableCell>
            [  <Link to={`/admin/pratos/${pratos.id}`}>Editar</Link> ]
            </TableCell>
            <TableCell>
              <Button variant="outlined" color="error" onClick={() => deletarPrato(pratos)}>
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

export default AdministracaoPratos
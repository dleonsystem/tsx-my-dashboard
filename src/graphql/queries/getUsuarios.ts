// src/graphql/queries/getUsuarios.ts
import { gql } from "@apollo/client";

export const GET_USUARIOS = gql`
query Usuarios {
  usuarios {
    status
    message
    usuarios {
    id
    nombre
    apellidoPaterno
    apellidoMaterno
    correoElectronico
    telefono
    curp
    fechaNacimiento
    sexo
    rol  
    }
  }
}
`;

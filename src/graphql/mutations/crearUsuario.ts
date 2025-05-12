import { gql } from "@apollo/client";

export const CREAR_USUARIO = gql`
  mutation CrearUsuario($input: UsuarioInput!) {
    crearUsuario(input: $input) {
      status
      message
      token
      usuario {
        id
      }
    }
  }
`;

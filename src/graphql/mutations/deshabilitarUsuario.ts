import { gql } from "@apollo/client";

export const DESHABILITAR_USUARIO = gql`
  mutation DeshabilitarUsuario($deshabilitarUsuarioId: String!) {
    deshabilitarUsuario(id: $deshabilitarUsuarioId) {
      status
      message
      usuario {
        id
      }
    }
  }
`;

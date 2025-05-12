import { gql } from "@apollo/client";

export const ACTUALIZAR_USUARIO = gql`
  mutation ActualizarUsuario($input: ActualizarUsuarioInput!) {
    actualizarUsuario(input: $input) {
      status
      message
      usuario {
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

import { gql } from "@apollo/client";

export const LOGIN_USUARIO = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      status
      message
      token
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

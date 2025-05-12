import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_USUARIOS } from "../graphql/queries/getUsuarios";
import { CREAR_USUARIO } from "../graphql/mutations/crearUsuario";
import { ACTUALIZAR_USUARIO } from "../graphql/mutations/actualizarUsuario";
import UsuarioForm from "./UsuarioForm"; 
import type { UsuarioInput } from "./UsuarioForm";
import { DESHABILITAR_USUARIO } from "../graphql/mutations/deshabilitarUsuario";
import styles from "../styles/UsuarioCrud.module.css";
import { useTranslation } from "react-i18next";


const UsuarioCrud: React.FC = () => {
      const { t } = useTranslation();
  const { data, loading, error, refetch } = useQuery(GET_USUARIOS);
  const [crearUsuario] = useMutation(CREAR_USUARIO);
const [actualizarUsuario] = useMutation(ACTUALIZAR_USUARIO);
const [deshabilitarUsuario] = useMutation(DESHABILITAR_USUARIO);


  const [modoEdicion, setModoEdicion] = useState<"crear" | "editar" | null>(null);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState<UsuarioInput | null>(null);

  if (loading) return <p>Cargando usuarios...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const usuarios = data.usuarios.usuarios;

  const handleCrear = () => {
    setUsuarioSeleccionado(null);
    setModoEdicion("crear");
  };

  const handleEditar = (usuario: UsuarioInput) => {
    setUsuarioSeleccionado(usuario);
    setModoEdicion("editar");
  };
  const handleEliminar = async (id: string) => {
    const confirmar = window.confirm("¿Estás seguro de que deseas deshabilitar este usuario?");
    if (!confirmar) return;
  
    try {
      await deshabilitarUsuario({ variables: { deshabilitarUsuarioId: id } });
      await refetch();
    } catch (err: unknown) {
      if (err instanceof Error) {
        alert("Error al deshabilitar usuario: " + err.message);
      } else {
        alert("Ocurrió un error desconocido.");
      }
    }
  };

  const handleCancelar = () => {
    setUsuarioSeleccionado(null);
    setModoEdicion(null);
  };

  const handleSubmit = async (input: UsuarioInput) => {
    try {
      if (modoEdicion === "crear") {
        await crearUsuario({ variables: { input: { ...input, password: "Temporal123*" } } });
      } else if (modoEdicion === "editar" && input.id) {
        await actualizarUsuario({ variables: { input } });
      }

      await refetch();
      handleCancelar();
    } catch (err: unknown) {
      if (err instanceof Error) {
        alert("Ocurrió un error: " + err.message);
      } else {
        alert("Ocurrió un error desconocido.");
      }
    }
  };

  return (
    <div className={styles.container}>
      <h2>{t("users.title")}</h2>
      <button onClick={handleCrear} className={styles.buttonCrear}>➕ {t("users.addUser")}</button>

      {modoEdicion && (
        <UsuarioForm
          initialData={usuarioSeleccionado ?? undefined}
          onSubmit={handleSubmit}
          onCancel={handleCancelar}
        />
      )}

      <table className={styles.table}>
        <thead>
          <tr>
            <th>{t("users.name")}</th>
            <th>{t("users.email")}</th>
            <th>CURP</th>
            <th>{t("users.role")}</th>
            <th>{t("users.actions")}</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario: UsuarioInput) => (
            <tr key={usuario.id}>
              <td>{usuario.nombre} {usuario.apellidoPaterno}</td>
              <td>{usuario.correoElectronico}</td>
              <td>{usuario.curp}</td>
              <td>{usuario.rol}</td>
              <td>
                <button onClick={() => handleEditar(usuario)}  className={styles.btnEditar}>✏️ {t("users.edit")}</button>
                <button onClick={() => handleEliminar(usuario.id!)}  className={styles.btnEliminar}>
    🗑️ {t("users.delete")}
  </button>
              </td>
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsuarioCrud;

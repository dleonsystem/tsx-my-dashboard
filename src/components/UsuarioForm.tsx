// src/components/UsuarioForm.tsx
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import styles from "../styles/UsuarioForm.module.css";

export type UsuarioInput = {
  id?: string;
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  correoElectronico: string;
  telefono: string;
  curp: string;
  fechaNacimiento: string;
  sexo: string;
  rol: string;
};

type Props = {
  initialData?: UsuarioInput;
  onSubmit: (input: UsuarioInput) => void;
  onCancel: () => void;
};

// ✅ Validación con Yup
const schema = Yup.object({
  nombre: Yup.string().required("Campo requerido"),
  apellidoPaterno: Yup.string().required("Campo requerido"),
  apellidoMaterno: Yup.string().required("Campo requerido"),
  correoElectronico: Yup.string().email("Correo inválido").required("Campo requerido"),
  telefono: Yup.string().required("Campo requerido").matches(/^\d+$/, "Solo números"),
  curp: Yup.string().length(18, "Debe tener 18 caracteres").required(),
  fechaNacimiento: Yup.string().required("Campo requerido"),
  sexo: Yup.string().required("Campo requerido"),
  rol: Yup.string().required("Campo requerido"),
});

const UsuarioForm: React.FC<Props> = ({ initialData, onSubmit, onCancel }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<UsuarioInput>({
    resolver: yupResolver(schema),
    defaultValues: initialData,
  });

  useEffect(() => {
    if (initialData) {
      for (const key in initialData) {
        setValue(key as keyof UsuarioInput, initialData[key as keyof UsuarioInput]);
      }
    }
  }, [initialData, setValue]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.formContainer}>
      {[
        { name: "nombre", label: "Nombre" },
        { name: "apellidoPaterno", label: "Apellido Paterno" },
        { name: "apellidoMaterno", label: "Apellido Materno" },
        { name: "correoElectronico", label: "Correo Electrónico" },
        { name: "telefono", label: "Teléfono" },
        { name: "curp", label: "CURP" },
        { name: "fechaNacimiento", label: "Fecha de Nacimiento", type: "date" },
        { name: "sexo", label: "Sexo" },
        { name: "rol", label: "Rol" },
      ].map(({ name, label, type }) => (
        <div key={name} className={styles.formGroup}>
          <label>{label}</label>
          <input
            type={type ?? "text"}
            {...register(name as keyof UsuarioInput)}
          />
          {errors[name as keyof UsuarioInput] && (
            <span style={{ color: "red", fontSize: "0.9em" }}>
              {(errors[name as keyof UsuarioInput]?.message as string) || ""}
            </span>
          )}
        </div>
      ))}

      <button type="submit">Guardar</button>
      <button type="button" onClick={onCancel}>Cancelar</button>
    </form>
  );
};

export default UsuarioForm;

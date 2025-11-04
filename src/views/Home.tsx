import React, { useState } from "react";
import {
  Pressable,
  Text,
  View,
  StyleSheet,
  Modal,
  FlatList,
  Alert,
} from "react-native";
import Formulario from "../components/Formulario";
import InformacionPaciente from "../components/InformacionPaciente";
import Paciente from "../components/Paciente";

export const Home = () => {
  const [modalVisible, setmodalVisible] = useState(false);
  const [pacientes, setPacientes] = useState<any[]>([]);
  const [paciente, setPaciente] = useState<any>({});
  const [modalpaciente, setModalPaciente] = useState(false);


  const cerrarModal = () => {
    setmodalVisible(false);
    setPaciente({});
  };

  const pacienteEditar = (pacienteEditar: any) => {
    setPaciente(pacienteEditar);
    setmodalVisible(true); 
  };

  const pacienteEliminar = (id: number) => {
    Alert.alert(
      "¿Deseas eliminar este paciente?",
      "Un paciente eliminado no se puede recuperar",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Si, Eliminar",
          onPress: () => {
            const pacientesActualizados = pacientes.filter(
              (pacienteState) => pacienteState.id !== id
            );
            setPacientes(pacientesActualizados);
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Administrador de Citas</Text>
      <Text style={styles.tituloBold}>Veterinaria</Text>

      <Pressable
        style={styles.btnNuevaCita}
        onPress={() => setmodalVisible(true)}
      >
        <Text style={styles.btnTextoNuevaCita}>Nueva cita</Text>
      </Pressable>

      {pacientes.length === 0 ? (
        <Text style={styles.noPacientes}>No hay pacientes aún</Text>
      ) : (
        <FlatList
          style={styles.listado}
          data={pacientes}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            return (
              <Paciente
                item={item}
                setModalPaciente={setModalPaciente}
                setPaciente={setPaciente}
                pacienteEditar={pacienteEditar}
                pacienteEliminar={pacienteEliminar}
              />
            );
          }}
        />
      )}

      {modalVisible && (
        <Formulario
          cerrarModal={cerrarModal}
          modalVisible={modalVisible}
          pacientes={pacientes}
          setPacientes={setPacientes}
          paciente={paciente}
          setPaciente={setPaciente}
        />
      )}

      
      <Modal visible={modalpaciente} animationType="slide">
        <InformacionPaciente
          paciente={paciente}
          
          setPaciente={setPaciente}
          setModalPaciente={setModalPaciente}
        />
      </Modal>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F3F4F6",
    flex: 1,
  },
  titulo: {
    textAlign: "center",
    fontSize: 30,
    color: "#374151",
    fontWeight: "600",
    marginTop: 20,
  },
  tituloBold: {
    fontWeight: "900",
    color: "#6D28D9",
    textAlign: "center",
  },
  btnNuevaCita: {
    backgroundColor: "#6D28D9",
    padding: 15,
    marginTop: 30,
    marginHorizontal: 20,
    borderRadius: 10,
  },
  btnTextoNuevaCita: {
    textAlign: "center",
    color: "#FFF",
    fontSize: 18,
    fontWeight: "900",
    textTransform: "uppercase",
  },
  noPacientes: {
    marginTop: 40,
    textAlign: "center",
    fontSize: 24,
    fontWeight: "600",
  },
  listado: {
    marginTop: 50,
    marginHorizontal: 30,
  },
});
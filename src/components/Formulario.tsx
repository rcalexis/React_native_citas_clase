import React, { useState } from "react";
import {
  Modal,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
  StyleSheet,
  Alert,
} from "react-native";
import DateTimePicker, { DateType } from "react-native-ui-datepicker";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Formulario({
  cerrarModal,
  modalVisible,
  pacientes,
  setPacientes,
  paciente: pacienteObj,
  setPaciente: setPacienteObj,
}: any) {
  const [nombrePaciente, setNombrePaciente] = useState("");
  const [propietario, setPropietario] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [selected, setSelected] = useState<DateType>();

  const handleCita = () => {
    if ([nombrePaciente, propietario, email, telefono, selected].some((campo) => !campo)) {
      Alert.alert("Error", "Llena todos los campos");
      return;
    }

    const nuevoPaciente = {
      id: Date.now(),
      paciente: nombrePaciente,
      propietario,
      email,
      telefono,
      fecha: selected,
    };

    setPacientes([nuevoPaciente, ...pacientes]);

    setPacientes(nuevoPaciente);

    // Limpiar campos
    setNombrePaciente("");
    setPropietario("");
    setEmail("");
    setTelefono("");
    setSelected(undefined);

    cerrarModal();
  };

  return (
    <Modal animationType="slide" visible={modalVisible}>
      <ScrollView style={styles.contenido}>
        <SafeAreaView>
          <Text style={styles.titulo}>Nueva Cita</Text>

          <Pressable style={styles.btnCancelar} onPress={cerrarModal}>
            <Text style={styles.btnCancelarTexto}>X Cancelar</Text>
          </Pressable>

          <View>
            <Text style={styles.label}>Nombre Paciente</Text>
            <TextInput
              style={styles.input}
              placeholder="Nombre del paciente"
              placeholderTextColor="#666"
              value={nombrePaciente}
              onChangeText={setNombrePaciente}
            />
          </View>

          <View>
            <Text style={styles.label}>Nombre Propietario</Text>
            <TextInput
              style={styles.input}
              placeholder="Nombre del propietario"
              placeholderTextColor="#666"
              value={propietario}
              onChangeText={setPropietario}
            />
          </View>

          <View>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Email del propietario"
              placeholderTextColor="#666"
              value={email}
              onChangeText={setEmail}
            />
          </View>

          <View>
            <Text style={styles.label}>Teléfono propietario</Text>
            <TextInput
              style={styles.input}
              placeholder="Teléfono del propietario"
              placeholderTextColor="#666"
              value={telefono}
              onChangeText={setTelefono}
              keyboardType="phone-pad"
            />
          </View>

          <View>
            <Text style={styles.label}>Fecha Cita</Text>
            <View style={styles.fechaContenedor}>
              <DateTimePicker
                mode="single"
                date={selected}
                onChange={({ date }) => setSelected(date)}
              />
            </View>
          </View>

          <Pressable style={styles.btnNuevaCita} onPress={handleCita}>
            <Text style={styles.btnNuevaCitaTexto}>Guardar Cita</Text>
          </Pressable>
        </SafeAreaView>
      </ScrollView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  contenido: {
    backgroundColor: "#6D28D9",
    flex: 1,
  },
  titulo: {
    fontSize: 30,
    fontWeight: "600",
    textAlign: "center",
    marginTop: 30,
    color: "#FFF",
  },
  btnCancelar: {
    marginVertical: 30,
    backgroundColor: "#5827A4",
    marginHorizontal: 30,
    padding: 15,
    borderRadius: 10,
  },
  btnCancelarTexto: {
    color: "#FFF",
    textAlign: "center",
    fontWeight: "900",
    fontSize: 16,
    textTransform: "uppercase",
  },
  label: {
    color: "#FFF",
    marginBottom: 10,
    marginTop: 15,
    fontSize: 20,
    fontWeight: "600",
  },
  input: {
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 10,
  },
  fechaContenedor: {
    backgroundColor: "#FFF",
    borderRadius: 10,
  },
  btnNuevaCita: {
    marginVertical: 50,
    backgroundColor: "#F59E0B",
    paddingVertical: 15,
    marginHorizontal: 30,
    borderRadius: 10,
  },
  btnNuevaCitaTexto: {
    color: "#5827A4",
    textAlign: "center",
    fontWeight: "900",
    fontSize: 16,
    textTransform: "uppercase",
  },
});

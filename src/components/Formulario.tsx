import React, { useState, useEffect } from "react";
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
  
  const [id, setId] = useState<number | null>(null);
  const [nombrePaciente, setNombrePaciente] = useState("");
  const [propietario, setPropietario] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [selected, setSelected] = useState<DateType>();

  
  useEffect(() => {
    if (pacienteObj?.id) {
      setId(pacienteObj.id);
      setNombrePaciente(pacienteObj.paciente);
      setPropietario(pacienteObj.propietario);
      setEmail(pacienteObj.email);
      setTelefono(pacienteObj.telefono);
      setSelected(pacienteObj.fecha); 
    } else {
      setId(null);
      setNombrePaciente("");
      setPropietario("");
      setEmail("");
      setTelefono("");
      setSelected(undefined);
    }
  }, [pacienteObj]); 

  const handleCita = () => {
    if (
      [nombrePaciente, propietario, email, telefono, selected].some(
        (campo) => !campo
      )
    ) {
      Alert.alert("Error", "Todos los campos son obligatorios");
      return;
    }

    
    const pacienteActual = {
      id: id, 
      paciente: nombrePaciente,
      propietario,
      email,
      telefono,
      fecha: selected,
    };

    if (id) {
      pacienteActual.id = id; 
      const pacientesActualizados = pacientes.map((pacienteState: any) =>
        pacienteState.id === pacienteActual.id ? pacienteActual : pacienteState
      );
      setPacientes(pacientesActualizados);
      setPacienteObj({});
    } else {
   
      pacienteActual.id = Date.now(); 
      setPacientes([pacienteActual, ...pacientes]); 
    }

    cerrarModal(); 
  };

  return (
    <Modal animationType="slide" visible={modalVisible}>
      <SafeAreaView style={styles.contenido}>
        <ScrollView>
       
          <Text style={styles.titulo}>
            {id ? "Editar" : "Nueva"} {""}
            <Text style={styles.tituloBold}>Cita</Text>
          </Text>

          <Pressable style={styles.btnCancelar} onPress={cerrarModal}>
            <Text style={styles.btnCancelarTexto}>X Cancelar</Text>
          </Pressable>

          <View style={styles.campo}>
            <Text style={styles.label}>Nombre Paciente</Text>
            <TextInput
              style={styles.input}
              placeholder="Nombre del paciente"
              placeholderTextColor="#666"
              value={nombrePaciente}
              onChangeText={setNombrePaciente}
            />
          </View>

          <View style={styles.campo}>
            <Text style={styles.label}>Nombre Propietario</Text>
            <TextInput
              style={styles.input}
              placeholder="Nombre del propietario"
              placeholderTextColor="#666"
              value={propietario}
              onChangeText={setPropietario}
            />
          </View>

          <View style={styles.campo}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Email del propietario"
              placeholderTextColor="#666"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />
          </View>

          <View style={styles.campo}>
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

          <View style={styles.campo}>
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
            <Text style={styles.btnNuevaCitaTexto}>
              {id ? "Guardar Cambios" : "Guardar Cita"}
            </Text>
          </Pressable>
        </ScrollView>
      </SafeAreaView>
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
  tituloBold: {
    fontWeight: "900",
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
  campo: {
    marginHorizontal: 30,
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
    marginBottom: 20,
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
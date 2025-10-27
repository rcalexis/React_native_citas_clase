import React, { useState } from 'react'
import { Pressable, Text, View, StyleSheet } from 'react-native'
import Formulario from '../components/Formulario'
import { SafeAreaView } from 'react-native-safe-area-context';

export const Home = () => {

  const [modalVisible, setmodalVisible] = useState(false)
  const [pacientes, setPacientes] = useState<any[]>([])
  const [paciente, setPaciente] = useState({})

  const cerrarModal = () => {
    setmodalVisible(false)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Administracion de citas</Text>
      <Text style={styles.tituloBold}>Veterinaria</Text>
      
      {pacientes.length === 0 ?
        <Text style={styles.noPacientes}>No hay pacientes</Text>
        :
        <Text style={styles.noPacientes}>Componente pendiente</Text>
      }
      
      <Pressable
        style={styles.btnNuevaCita}
        onPress={() => setmodalVisible(true)}

      >
        <Text style={styles.btnTextoNuevaCita}>Nueva cita</Text>
      </Pressable>

      {modalVisible &&
        (
          <Formulario
            modalVisible={modalVisible}
            cerrarModal={cerrarModal}
            pacientes={pacientes}
            setPacientes={setPacientes}
            paciente={paciente}
            setPaciente={setPaciente}
          ></Formulario>
        )
      }
    </View>


  )
}




const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F3F4F6',
    flex: 1
  },
  titulo: {
    textAlign: 'center',
    fontSize: 30,
    color: '#374151',
    fontWeight: '600'
  },
  tituloBold: {
    fontWeight: '900',
    color: '#6D28D9',
  },
  btnNuevaCita: {
    backgroundColor: '#6D28D9',
    padding: 15,
    marginTop: 30,
    marginHorizontal: 20,
    borderRadius: 10
  },
  btnTextoNuevaCita: {
    textAlign: 'center',
    color: '#FFF',
    fontSize: 18,
    fontWeight: '900',
    textTransform: 'uppercase'
  },
  noPacientes: {
    marginTop: 40,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '600'
  },
  listado: {
    marginTop: 50,
    marginHorizontal: 30
  }
})

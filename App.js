import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

export default function App() {
  const [tempo, setTempo] = useState(0);
  const [ultimoTempo, setUltimoTempo] = useState(0);
  const [estaRodando, setEstaRodando] = useState(false);
  const [idIntervalo, setIdIntervalo] = useState(null);

  const alternarCronometro = () => {
    if (estaRodando) {
      clearInterval(idIntervalo);
      setUltimoTempo(tempo);
      setEstaRodando(false);
    } else {
      const id = setInterval(() => {
        setTempo((tempoAnterior) => tempoAnterior + 100);
      }, 100);
      setIdIntervalo(id);
      setEstaRodando(true);
    }
  };

  const reiniciarCronometro = () => {
    clearInterval(idIntervalo);
    setTempo(0);
    setEstaRodando(false);
  };

  useEffect(() => {
    return () => {
      clearInterval(idIntervalo);
    };
  }, [idIntervalo]);

  const formatarTempo = (tempo) => {
    const segundos = Math.floor(tempo / 1000);
    const centesimos = Math.floor((tempo % 1000) / 100);
    return `${segundos}.${centesimos}`;
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('./assets/cronometro.png')}
        style={styles.img}
      />
      <Text style={styles.timeText}>{formatarTempo(tempo)}</Text>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.botao} onPress={alternarCronometro}>
          <View style={styles.btnArea}>
            <Text style={styles.btnTexto}>{estaRodando ? 'Pausar' : 'Iniciar'}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.botao} onPress={reiniciarCronometro}>
          <View style={styles.btnArea}>
            <Text style={styles.btnTexto}>Reiniciar</Text>
          </View>
        </TouchableOpacity>
      </View>
      <Text style={styles.lastTimeText}>
        Último tempo: {formatarTempo(ultimoTempo)}s
      </Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#89CFF0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {
    marginBottom: 30,
  },
  timeText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#333',
    position:'absolute',
    top: 330,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  botao: {
    width: 150,
    height: 50,
    borderWidth: 2,
    borderColor: '#dd7b22',
    borderRadius: 25,
    margin: 10,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnArea: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnTexto: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#dd7b22',
  },
  lastTimeText: {
    fontSize: 16,
    color: '#333',
    marginTop: 20,
    fontStyle: 'italic',
  },
});

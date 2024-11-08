import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

export default function App() {
  const [tempoAtual, setTempoAtual] = useState(0);
  const [tempoAnterior, setTempoAnterior] = useState(0);
  const [cronometroAtivo, setCronometroAtivo] = useState(false);
  const [intervaloId, setIntervaloId] = useState(null);

  const alternarCronometro = () => {
    if (cronometroAtivo) {
      clearInterval(intervaloId);
      setTempoAnterior(tempoAtual);
      setCronometroAtivo(false);
    } else {
      const id = setInterval(() => {
        setTempoAtual((tempoPrevio) => tempoPrevio + 100);
      }, 100);
      setIntervaloId(id);
      setCronometroAtivo(true);
    }
  };

  const reiniciarCronometro = () => {
    clearInterval(intervaloId);
    setTempoAtual(0);
    setCronometroAtivo(false);
  };

  useEffect(() => {
    return () => {
      clearInterval(intervaloId);
    };
  }, [intervaloId]);

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
      <Text style={styles.tempoTexto}>{formatarTempo(tempoAtual)}</Text>
      <View style={styles.botoesContainer}>
        <TouchableOpacity style={styles.botao} onPress={alternarCronometro}>
          <View style={styles.btnArea}>
            <Text style={styles.btnTexto}>{cronometroAtivo ? 'Pausar' : 'Iniciar'}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.botao} onPress={reiniciarCronometro}>
          <View style={styles.btnArea}>
            <Text style={styles.btnTexto}>Reiniciar</Text>
          </View>
        </TouchableOpacity>
      </View>
      <Text style={styles.ultimoTempoTexto}>
        Último tempo: {formatarTempo(tempoAnterior)}s
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
  tempoTexto: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#333',
    position: 'absolute',
    top: 330,
  },
  botoesContainer: {
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
  ultimoTempoTexto: {
    fontSize: 16,
    color: '#333',
    marginTop: 20,
    fontStyle: 'italic',
  },
});

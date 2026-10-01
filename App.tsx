import React, { useState } from 'react';
import { WebView } from 'react-native-webview';
import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
type Pagina = 'inicio' | 'sumadora' | 'numeroLetras' | 'tabla' | 'experiencia';
function App() {
  const [pagina, setPagina] = useState<Pagina>('inicio');
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.titulo}>Mi App ITLA</Text>
        <Text style={styles.subtitulo}>
          Introducción al Desarrollo de Aplicaciones Móviles
        </Text>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.menu}
        contentContainerStyle={styles.menuContenido}
      >
        <BotonMenu
          texto="Inicio"
          activo={pagina === 'inicio'}
          onPress={() => setPagina('inicio')}
        />
        <BotonMenu
          texto="Sumadora"
          activo={pagina === 'sumadora'}
          onPress={() => setPagina('sumadora')}
        />
        <BotonMenu
          texto="Número a Letras"
          activo={pagina === 'numeroLetras'}
          onPress={() => setPagina('numeroLetras')}
        />
        <BotonMenu
          texto="Tabla"
          activo={pagina === 'tabla'}
          onPress={() => setPagina('tabla')}
        />
        <BotonMenu
          texto="Experiencia"
          activo={pagina === 'experiencia'}
          onPress={() => setPagina('experiencia')}
        />
      </ScrollView>
      <ScrollView contentContainerStyle={styles.contenido}>
        {pagina === 'inicio' && <Inicio />}
        {pagina === 'sumadora' && <Sumadora />}
        {pagina === 'numeroLetras' && <NumeroALetras />}
        {pagina === 'tabla' && <TablaMultiplicar />}
        {pagina === 'experiencia' && <ExperienciaPersonal />}
      </ScrollView>
    </SafeAreaView>
  );
}
function Inicio() {
  return (
    <View>
      <Text style={styles.pagina}>Página Inicial</Text>
      <Image
        source={require('./assets/images/mi_foto.jpg')}
        style={styles.foto}
        resizeMode="cover"
      />
      <Text style={styles.nombre}>Esteban Mata Acosta</Text>
      <View style={styles.tarjeta}>
        <Text style={styles.label}>Nombre</Text>
        <Text style={styles.valor}>Esteban Josue</Text>
        <Text style={styles.label}>Apellido</Text>
        <Text style={styles.valor}>Mata Acosta</Text>
        <Text style={styles.label}>Matrícula</Text>
        <Text style={styles.valor}>2024-1860</Text>
        <Text style={styles.label}>Correo electrónico</Text>
        <Text style={styles.valor}>20241860@itla.edu.do</Text>
      </View>
    </View>
  );
}
function Sumadora() {
  const [numero1, setNumero1] = useState('');
  const [numero2, setNumero2] = useState('');
  const [resultado, setResultado] = useState<number | null>(null);
  const [mensaje, setMensaje] = useState('');
  const sumar = () => {
    const valor1 = Number(numero1);
    const valor2 = Number(numero2);
    if (numero1.trim() === '' || numero2.trim() === '') {
      setResultado(null);
      setMensaje('Debe ingresar los dos números.');
      return;
    }
    if (isNaN(valor1) || isNaN(valor2)) {
      setResultado(null);
      setMensaje('Ingrese valores numéricos válidos.');
      return;
    }
    setResultado(valor1 + valor2);
    setMensaje('');
  };
  const limpiar = () => {
    setNumero1('');
    setNumero2('');
    setResultado(null);
    setMensaje('');
  };
  return (
    <View>
      <Text style={styles.pagina}>Sumadora</Text>
      <View style={styles.tarjeta}>
        <Text style={styles.descripcion}>
          Introduzca dos números para obtener su suma.
        </Text>
        <Text style={styles.labelInput}>Primer número</Text>
        <TextInput
          style={styles.input}
          placeholder="Ejemplo: 10"
          placeholderTextColor="#9CA3AF"
          keyboardType="numeric"
          value={numero1}
          onChangeText={setNumero1}
        />
        <Text style={styles.labelInput}>Segundo número</Text>
        <TextInput
          style={styles.input}
          placeholder="Ejemplo: 25"
          placeholderTextColor="#9CA3AF"
          keyboardType="numeric"
          value={numero2}
          onChangeText={setNumero2}
        />
        {mensaje !== '' && <Text style={styles.error}>{mensaje}</Text>}
        <Pressable style={styles.botonPrincipal} onPress={sumar}>
          <Text style={styles.textoBoton}>Sumar</Text>
        </Pressable>
        <Pressable style={styles.botonSecundario} onPress={limpiar}>
          <Text style={styles.textoBotonSecundario}>Limpiar</Text>
        </Pressable>
        <View style={styles.resultado}>
          <Text style={styles.resultadoTitulo}>Resultado</Text>
          <Text style={styles.resultadoNumero}>
            {resultado !== null ? resultado : '---'}
          </Text>
        </View>
      </View>
    </View>
  );
}
function NumeroALetras() {
  const [numero, setNumero] = useState('');
  const [resultado, setResultado] = useState('');
  const [mensaje, setMensaje] = useState('');
  const convertir = () => {
    if (numero.trim() === '') {
      setResultado('');
      setMensaje('Debe ingresar un número.');
      return;
    }
    const valor = Number(numero);
    if (!Number.isInteger(valor)) {
      setResultado('');
      setMensaje('Debe ingresar un número entero.');
      return;
    }
    if (valor < 1 || valor > 1000) {
      setResultado('');
      setMensaje('El número debe estar entre 1 y 1000.');
      return;
    }
    setResultado(convertirNumeroALetras(valor));
    setMensaje('');
  };
  const limpiar = () => {
    setNumero('');
    setResultado('');
    setMensaje('');
  };
  return (
    <View>
      <Text style={styles.pagina}>Número a Letras</Text>
      <View style={styles.tarjeta}>
        <Text style={styles.descripcion}>
          Introduzca un número entero del 1 al 1000.
        </Text>
        <Text style={styles.labelInput}>Número</Text>
        <TextInput
          style={styles.input}
          placeholder="Ejemplo: 256"
          placeholderTextColor="#9CA3AF"
          keyboardType="numeric"
          value={numero}
          onChangeText={setNumero}
          maxLength={4}
        />
        {mensaje !== '' && <Text style={styles.error}>{mensaje}</Text>}
        <Pressable style={styles.botonPrincipal} onPress={convertir}>
          <Text style={styles.textoBoton}>Convertir</Text>
        </Pressable>
        <Pressable style={styles.botonSecundario} onPress={limpiar}>
          <Text style={styles.textoBotonSecundario}>Limpiar</Text>
        </Pressable>
        <View style={styles.resultado}>
          <Text style={styles.resultadoTitulo}>Resultado</Text>
          <Text style={styles.resultadoLetras}>
            {resultado !== '' ? resultado : '---'}
          </Text>
        </View>
      </View>
    </View>
  );
}
function convertirNumeroALetras(numero: number): string {
  const unidades = [
    '',
    'uno',
    'dos',
    'tres',
    'cuatro',
    'cinco',
    'seis',
    'siete',
    'ocho',
    'nueve',
  ];
  const especiales = [
    'diez',
    'once',
    'doce',
    'trece',
    'catorce',
    'quince',
    'dieciséis',
    'diecisiete',
    'dieciocho',
    'diecinueve',
  ];
  const veintes = [
    'veinte',
    'veintiuno',
    'veintidós',
    'veintitrés',
    'veinticuatro',
    'veinticinco',
    'veintiséis',
    'veintisiete',
    'veintiocho',
    'veintinueve',
  ];
  const decenas = [
    '',
    '',
    '',
    'treinta',
    'cuarenta',
    'cincuenta',
    'sesenta',
    'setenta',
    'ochenta',
    'noventa',
  ];
  const centenas = [
    '',
    'ciento',
    'doscientos',
    'trescientos',
    'cuatrocientos',
    'quinientos',
    'seiscientos',
    'setecientos',
    'ochocientos',
    'novecientos',
  ];
  if (numero === 1000) {
    return 'mil';
  }
  if (numero === 100) {
    return 'cien';
  }
  if (numero < 10) {
    return unidades[numero];
  }
  if (numero >= 10 && numero <= 19) {
    return especiales[numero - 10];
  }
  if (numero >= 20 && numero <= 29) {
    return veintes[numero - 20];
  }
  if (numero < 100) {
    const decena = Math.floor(numero / 10);
    const unidad = numero % 10;
    if (unidad === 0) {
      return decenas[decena];
    }
    return `${decenas[decena]} y ${unidades[unidad]}`;
  }
  const centena = Math.floor(numero / 100);
  const resto = numero % 100;
  if (resto === 0) {
    return centenas[centena];
  }
  return `${centenas[centena]} ${convertirNumeroALetras(resto)}`;
}
function TablaMultiplicar() {
  const [numero, setNumero] = useState('');
  const [tabla, setTabla] = useState<string[]>([]);
  const [mensaje, setMensaje] = useState('');
  const generarTabla = () => {
    if (numero.trim() === '') {
      setTabla([]);
      setMensaje('Debe ingresar un número.');
      return;
    }
    const valor = Number(numero);
    if (isNaN(valor)) {
      setTabla([]);
      setMensaje('Ingrese un número válido.');
      return;
    }
    const resultados: string[] = [];
    for (let i = 1; i <= 13; i++) {
      resultados.push(`${valor} × ${i} = ${valor * i}`);
    }
    setTabla(resultados);
    setMensaje('');
  };
  const limpiar = () => {
    setNumero('');
    setTabla([]);
    setMensaje('');
  };
  return (
    <View>
      <Text style={styles.pagina}>Tabla de Multiplicar</Text>
      <View style={styles.tarjeta}>
        <Text style={styles.descripcion}>
          Introduzca un número para mostrar su tabla de multiplicar hasta el 13.
        </Text>
        <Text style={styles.labelInput}>Número</Text>
        <TextInput
          style={styles.input}
          placeholder="Ejemplo: 5"
          placeholderTextColor="#9CA3AF"
          keyboardType="numeric"
          value={numero}
          onChangeText={setNumero}
        />
        {mensaje !== '' && <Text style={styles.error}>{mensaje}</Text>}
        <Pressable style={styles.botonPrincipal} onPress={generarTabla}>
          <Text style={styles.textoBoton}>Generar tabla</Text>
        </Pressable>
        <Pressable style={styles.botonSecundario} onPress={limpiar}>
          <Text style={styles.textoBotonSecundario}>Limpiar</Text>
        </Pressable>
        {tabla.length > 0 && (
          <View style={styles.tablaResultado}>
            {tabla.map((operacion, index) => (
              <Text key={index} style={styles.lineaTabla}>
                {operacion}
              </Text>
            ))}
          </View>
        )}
      </View>
    </View>
  );
}
function ExperienciaPersonal() {
  const videoId = 'Me7Th-gGcdE';
  return (
    <View>
      <Text style={styles.pagina}>Experiencia Personal</Text>
      <View style={styles.tarjeta}>
        <Text style={styles.descripcion}>
          En este video explico mi experiencia durante el desarrollo de esta
          aplicación móvil utilizando React Native.
        </Text>
        <View style={styles.videoContainer}>
          <WebView
            source={{
              headers: { Referer: 'https://com.tareamovilitla' },
              uri: `https://www.youtube.com/embed/${videoId}`,
            }}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            allowsFullscreenVideo={true}
            style={styles.video}
          />
        </View>
        <View style={styles.experienciaInfo}>
          <Text style={styles.experienciaTitulo}>Sobre mi experiencia</Text>
          <Text style={styles.experienciaTexto}>
            Durante esta práctica desarrollé una aplicación móvil utilizando
            React Native, trabajando con componentes, estados, entradas de datos
            y lógica de programación.
          </Text>
          <Text style={styles.experienciaTexto}>
            También implementé una sumadora, un traductor de números a letras
            sin utilizar APIs externas y una tabla de multiplicar hasta el 13.
          </Text>
        </View>
      </View>
    </View>
  );
}
function BotonMenu({
  texto,
  activo,
  onPress,
}: {
  texto: string;
  activo: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      style={[styles.botonMenu, activo && styles.botonMenuActivo]}
      onPress={onPress}
    >
      <Text style={[styles.textoMenu, activo && styles.textoMenuActivo]}>
        {texto}
      </Text>
    </Pressable>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F6F8',
  },
  header: {
    backgroundColor: '#14213D',
    padding: 22,
  },
  titulo: {
    color: '#FFFFFF',
    fontSize: 26,
    fontWeight: 'bold',
  },
  subtitulo: {
    color: '#D9E1F2',
    fontSize: 13,
    marginTop: 5,
  },
  menu: {
    maxHeight: 70,
    backgroundColor: '#FFFFFF',
  },
  menuContenido: {
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  botonMenu: {
    backgroundColor: '#E5E7EB',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginHorizontal: 4,
  },
  botonMenuActivo: {
    backgroundColor: '#2563EB',
  },
  textoMenu: {
    color: '#374151',
    fontWeight: '600',
  },
  textoMenuActivo: {
    color: '#FFFFFF',
  },
  contenido: {
    padding: 20,
  },
  pagina: {
    fontSize: 27,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#14213D',
    marginBottom: 20,
  },
  foto: {
    width: 135,
    height: 135,
    borderRadius: 68,
    alignSelf: 'center',
    marginBottom: 15,
    borderWidth: 3,
    borderColor: '#2563EB',
  },
  nombre: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#14213D',
    marginBottom: 20,
  },
  tarjeta: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    elevation: 4,
  },
  label: {
    color: '#6B7280',
    fontSize: 13,
    marginTop: 10,
  },
  valor: {
    color: '#111827',
    fontSize: 17,
    fontWeight: '600',
    marginTop: 2,
  },
  descripcion: {
    color: '#6B7280',
    fontSize: 15,
    marginBottom: 15,
  },
  labelInput: {
    color: '#374151',
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 7,
    marginTop: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 17,
    color: '#111827',
    backgroundColor: '#F9FAFB',
  },
  botonPrincipal: {
    backgroundColor: '#2563EB',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 22,
  },
  textoBoton: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  botonSecundario: {
    borderWidth: 1,
    borderColor: '#2563EB',
    padding: 13,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  textoBotonSecundario: {
    color: '#2563EB',
    fontWeight: 'bold',
  },
  resultado: {
    backgroundColor: '#EFF6FF',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    marginTop: 25,
  },
  resultadoTitulo: {
    color: '#6B7280',
    fontSize: 14,
  },
  resultadoNumero: {
    color: '#14213D',
    fontSize: 35,
    fontWeight: 'bold',
    marginTop: 5,
  },
  error: {
    color: '#DC2626',
    marginTop: 12,
    textAlign: 'center',
    fontWeight: '600',
  },
  resultadoLetras: {
    color: '#14213D',
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 8,
    textAlign: 'center',
  },
  tablaResultado: {
    backgroundColor: '#EFF6FF',
    borderRadius: 12,
    padding: 18,
    marginTop: 25,
  },
  lineaTabla: {
    color: '#14213D',
    fontSize: 18,
    fontWeight: '600',
    marginVertical: 4,
    textAlign: 'center',
  },
  videoContainer: {
    width: '100%',
    height: 220,
    borderRadius: 12,
    overflow: 'hidden',
    marginTop: 15,
    backgroundColor: '#000000',
  },
  video: {
    flex: 1,
  },
  experienciaInfo: {
    marginTop: 25,
  },
  experienciaTitulo: {
    color: '#14213D',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  experienciaTexto: {
    color: '#4B5563',
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 10,
  },
});
export default App;

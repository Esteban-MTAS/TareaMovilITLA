import React from 'react';
import Renderer, { act } from 'react-test-renderer';
import { Pressable, Text, TextInput } from 'react-native';
import { WebView } from 'react-native-webview';
import App from '../App';

jest.mock('react-native', () => ({
  Image: 'Image',
  Pressable: 'Pressable',
  SafeAreaView: 'SafeAreaView',
  ScrollView: 'ScrollView',
  StatusBar: 'StatusBar',
  Text: 'Text',
  TextInput: 'TextInput',
  View: 'View',
  StyleSheet: { create: (styles: object) => styles },
}));
jest.mock('react-native-webview', () => ({ WebView: 'WebView' }));
let app: Renderer.ReactTestRenderer;
beforeEach(async () => {
  await act(() => {
    app = Renderer.create(<App />);
  });
});
afterEach(async () => {
  await act(() => app.unmount());
});
const text = () =>
  app.root
    .findAllByType(Text)
    .map(node => node.props.children)
    .flat()
    .join(' ');
async function press(label: string) {
  const button = app.root
    .findAllByType(Pressable)
    .find(node =>
      node.findAllByType(Text).some(child => child.props.children === label),
    );
  if (!button) {
    throw new Error(`Missing button: ${label}`);
  }
  await act(() => button.props.onPress());
}
async function input(value: string, index = 0) {
  await act(() =>
    app.root.findAllByType(TextInput)[index].props.onChangeText(value),
  );
}
test('sumadora: 20 + 15 = 35', async () => {
  await press('Sumadora');
  await input('20');
  await input('15', 1);
  await press('Sumar');
  expect(text()).toContain('35');
  await press('Limpiar');
  expect(
    app.root.findAllByType(TextInput).map(node => node.props.value),
  ).toEqual(['', '']);
});
test.each([
  [1, 'uno'],
  [15, 'quince'],
  [22, 'veintidós'],
  [48, 'cuarenta y ocho'],
  [100, 'cien'],
  [101, 'ciento uno'],
  [256, 'doscientos cincuenta y seis'],
  [500, 'quinientos'],
  [999, 'novecientos noventa y nueve'],
  [1000, 'mil'],
])('convierte %s a %s', async (number, expected) => {
  await press('Número a Letras');
  await input(String(number));
  await press('Convertir');
  expect(text()).toContain(expected);
});
test.each(['0', '1001', ''])('rechaza entrada %s', async value => {
  await press('Número a Letras');
  await input('22');
  await press('Convertir');
  await input(value);
  await press('Convertir');
  expect(text()).toContain(
    value === ''
      ? 'Debe ingresar un número.'
      : 'El número debe estar entre 1 y 1000.',
  );
  expect(text()).not.toContain('veintidós');
});
test('tabla del 5: trece filas', async () => {
  await press('Tabla');
  await input('5');
  await press('Generar tabla');
  for (let i = 1; i <= 13; i++) {
    expect(text()).toContain(`5 × ${i} = ${5 * i}`);
  }
  expect(
    app.root
      .findAllByType(Text)
      .filter(node => String(node.props.children).includes(' × ')),
  ).toHaveLength(13);
});
test('experiencia muestra el video solicitado', async () => {
  await press('Experiencia');
  expect(app.root.findByType(WebView).props.source.headers).toEqual({
    Referer: 'https://com.tareamovilitla',
  });
  expect(text()).toContain('Experiencia Personal');
  expect(app.root.findByType(WebView).props.source.uri).toBe(
    'https://www.youtube.com/embed/Me7Th-gGcdE',
  );
});

import { AbrigoAnimais } from "./abrigo-animais";

describe('Abrigo de Animais', () => {

  test('Deve rejeitar animal inválido', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('CAIXA,RATO', 'RATO,BOLA', 'Lulu');

    expect(resultado.erro).toBe('Animal inválido');
    expect(resultado.lista).toBeFalsy();
  });

  test('Deve encontrar pessoa para um animal', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'RATO,BOLA', 'RATO,NOVELO', 'Rex,Fofo');

      expect(resultado.lista[0]).toBe('Fofo - abrigo');
      expect(resultado.lista[1]).toBe('Rex - pessoa 1');
      expect(resultado.lista.length).toBe(2);
      expect(resultado.erro).toBeFalsy();
  });

  test('Deve encontrar pessoa para um animal intercalando brinquedos', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('BOLA,LASER',
      'BOLA,NOVELO,RATO,LASER', 'Mimi,Fofo,Rex,Bola');

      expect(resultado.lista[0]).toBe('Bola - abrigo');
      expect(resultado.lista[1]).toBe('Fofo - pessoa 2');
      expect(resultado.lista[2]).toBe('Mimi - abrigo');
      expect(resultado.lista[3]).toBe('Rex - abrigo');
      expect(resultado.lista.length).toBe(4);
      expect(resultado.erro).toBeFalsy();
  });
});

describe('Abrigo de Animais - Testes Adicionais', () => {

  test('Deve rejeitar lista com animal repetido', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('RATO,BOLA', 'RATO,NOVELO', 'Rex,Fofo,Rex');

    expect(resultado.erro).toBe('Animal repetido: Rex');
  });

  test('Deve rejeitar lista com brinquedo repetido para pessoa 1', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('BOLA,RATO,BOLA', 'RATO,NOVELO', 'Rex');

    expect(resultado.erro).toBe('Brinquedo repetido: BOLA');
  });

  test('Deve rejeitar lista com brinquedo inválido para pessoa 2', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('BOLA,RATO', 'RATO,PEDRA', 'Rex');

    expect(resultado.erro).toBe('Brinquedo inválido: PEDRA');
  });

  test('Deve rejeitar brinquedo inválido para a pessoa 1', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('BOLA,PEDRA', 'RATO,BOLA', 'Rex');

    expect(resultado.erro).toBe('Brinquedo inválido: PEDRA');
  });

  test('Deve rejeitar brinquedo repetido para a pessoa 2', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('RATO,BOLA', 'NOVELO,CAIXA,NOVELO', 'Bola');

    expect(resultado.erro).toBe('Brinquedo repetido: NOVELO');
  });

});

describe('Abrigo de Animais - Testes Extras Loco', () => {

 test('Deve permitir que Loco seja adotado pela pessoa 2 se ela já tiver um animal', () => {
  const resultado = new AbrigoAnimais().encontraPessoas(
    'LASER',
    'CAIXA,NOVELO,SKATE,RATO', 
    'Bola,Loco' 
  );
  
  expect(resultado.lista[0]).toBe('Bola - pessoa 2');
  expect(resultado.lista[1]).toBe('Loco - pessoa 2');
  expect(resultado.erro).toBeFalsy();
});

test('Deve permitir que Loco seja adotado pela pessoa 1 se ela já tiver um animal', () => {
  const resultado = new AbrigoAnimais().encontraPessoas(
    'RATO,BOLA,SKATE', 
    'LASER',           
    'Rex,Loco'         
  );

  expect(resultado.lista[0]).toBe('Loco - pessoa 1');
  expect(resultado.lista[1]).toBe('Rex - pessoa 1');
  expect(resultado.erro).toBeFalsy();
});

  test('Não deve permitir que Loco seja adotado se for o primeiro animal', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'RATO,SKATE', 'LASER', 'Loco');
      
    expect(resultado.lista[0]).toBe('Loco - abrigo');
    expect(resultado.erro).toBeFalsy();
  });
});
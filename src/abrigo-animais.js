class AbrigoAnimais {

  animais = {
    'Rex' : { especie: 'cão', brinquedos: ['RATO', 'BOLA'] },
    'Mimi' : { especie: 'gato', brinquedos: ['BOLA', 'LASER'] },
    'Fofo' : { especie: 'gato', brinquedos: ['BOLA', 'RATO', 'LASER'] },
    'Zero' : { especie: 'gato', brinquedos: ['RATO', 'BOLA'] },
    'Bola' : { especie: 'cão', brinquedos: ['CAIXA', 'NOVELO'] },
    'Bebe' : { especie: 'cão', brinquedos: ['LASER', 'RATO', 'BOLA'] },
    'Loco' : { especie: 'jabuti', brinquedos: ['SKATE', 'RATO'] },
  }

  encontraPessoas(brinquedosPessoa1, brinquedosPessoa2, ordemAnimais) {
    const pessoaUmBrinquedos = brinquedosPessoa1.split(',');
    const pessoaDoisBrinquedos = brinquedosPessoa2.split(',');
    const animaisEncontrados = ordemAnimais.split(',');


    // VALIDAÇÃO DOS ANIMAIS
    const animaisVerificados = [];
    for (const nomeAnimal of animaisEncontrados) {
      if (animaisVerificados.includes(nomeAnimal)) {
        return { erro: 'Animal repetido: ' + nomeAnimal };
      }
      animaisVerificados.push(nomeAnimal);
  }

  for (const nomeAnimal of animaisEncontrados) {
      if (!this.animais[nomeAnimal]) {
        return { erro: 'Animal inválido' };
      }
    }

  const todosBrinquedos = [];
    for (const nomeAnimal in this.animais) {
      const animal = this.animais[nomeAnimal];
    for (const brinquedo of animal.brinquedos) {
        if (!todosBrinquedos.includes(brinquedo)) {
          todosBrinquedos.push(brinquedo);
        }
      }
    }

    //VALIDAÇÃO DOS BRINQUEDOS

  const brinquedosP1Verificados = [];
    for (const brinquedo of pessoaUmBrinquedos) {
      if (brinquedosP1Verificados.includes(brinquedo)) {
        return { erro: 'Brinquedo repetido: ' + brinquedo };
      }
      if (!todosBrinquedos.includes(brinquedo)) {
        return { erro: 'Brinquedo inválido: ' + brinquedo };
      }
      brinquedosP1Verificados.push(brinquedo);
    }

  const brinquedosP2Verificados = [];
    for (const brinquedo of pessoaDoisBrinquedos) {
      if (brinquedosP2Verificados.includes(brinquedo)) {
        return { erro: 'Brinquedo repetido: ' + brinquedo };
      }
      if (!todosBrinquedos.includes(brinquedo)) {
        return { erro: 'Brinquedo inválido: ' + brinquedo };
      }
      brinquedosP2Verificados.push(brinquedo);
    }

    // ADOÇÃO DOS ANIMAIS
  
    let adocoesPessoa1 = 0;
    let adocoesPessoa2 = 0;
    const resultado = [];

    for (const nomeAnimal of animaisEncontrados) {
      const animal = this.animais[nomeAnimal];
      let podeAdotarP1 = false;
      let podeAdotarP2 = false;

      if (adocoesPessoa1 < 3) {
        if (nomeAnimal === 'Loco') {
          if (adocoesPessoa1 > 0) {
            let brinquedosLocoEncontrados = 0;
            for (const brinquedoFavorito of animal.brinquedos) {
              if (brinquedosP1Verificados.includes(brinquedoFavorito)) {
                brinquedosLocoEncontrados++;
              }
          }
          if (brinquedosLocoEncontrados === animal.brinquedos.length) {
            podeAdotarP1 = true;
          }
        }
          } else {
            let brinquedosNaOrdem = 0;
            for (const brinquedoPessoa of brinquedosP1Verificados) {
              if (brinquedoPessoa === animal.brinquedos[brinquedosNaOrdem]) {
                brinquedosNaOrdem++;
              }
              if (brinquedosNaOrdem === animal.brinquedos.length) {
                podeAdotarP1 = true;
                break;
              }
            }
          }
        }


        if (adocoesPessoa2 < 3) {
        if (nomeAnimal === 'Loco') {
          if (adocoesPessoa2 > 0) {
            let brinquedosLocoEncontrados = 0;
            for (const brinquedoFavorito of animal.brinquedos) {
              if (brinquedosP2Verificados.includes(brinquedoFavorito)) {
                brinquedosLocoEncontrados++;
              }
          }
          if (brinquedosLocoEncontrados === animal.brinquedos.length) {
            podeAdotarP2 = true;
          }
        }
          } else {
            let brinquedosNaOrdem = 0;
            for (const brinquedoPessoa of brinquedosP2Verificados) {
              if (brinquedoPessoa === animal.brinquedos[brinquedosNaOrdem]) {
                brinquedosNaOrdem++;
              }
              if (brinquedosNaOrdem === animal.brinquedos.length) {
                podeAdotarP2 = true;
                break;
              }
            }
          }
        }


        let resultadoFinal = `${nomeAnimal} - abrigo`;
      if (podeAdotarP1 && !podeAdotarP2) {
        resultadoFinal = `${nomeAnimal} - pessoa 1`;
        adocoesPessoa1++;
      } else if (!podeAdotarP1 && podeAdotarP2) {
        resultadoFinal = `${nomeAnimal} - pessoa 2`;
        adocoesPessoa2++;
      }

      resultado.push(resultadoFinal);
    }
          
      resultado.sort();

      return {
      lista: resultado
    };
  }
}


export { AbrigoAnimais as AbrigoAnimais };



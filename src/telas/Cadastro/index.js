import React, { useState } from 'react';
import { View } from 'react-native';
import Botao from '../../componentes/Botao';
import { EntradaTexto } from '../../componentes/EntradaTexto';
import estilos from './estilos';
import { cadastrar } from '../../Services/requisicoesFirebase';
import { Alerta } from '../../componentes/Alerta';


export default function Cadastro({ navigation }) {  
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmaSenha, setConfirmaSenha] = useState('');
  const [statusError, setStatusError] = useState('')
  const [mensagemError, setMensagemError] = useState('')

  async function realizarCadastro() {
    if(nome == ''){
      setMensagemError('Preencha com seu nome')
      setStatusError('nome')
    }else if(email == ''){
      setMensagemError('Preencha com seu email')
      setStatusError('email')
    }else if(senha == ''){
      setMensagemError('Digite sua senha')
      setStatusError('senha')
    }else if(confirmaSenha == ''){
      setMensagemError('Confirme sua senha')
      setStatusError('confirmaSenha')
    }else if(confirmaSenha != senha){
      setMensagemError('As senhas não conferem')
      setStatusError('confirmaSenha')
    }else {
      const resultado = await cadastrar(nome, email, senha)
      setStatusError('firebase')
      if(resultado == 'sucesso') {
        setMensagemError('Usuario criado com sucesso!')
        setEmail('')
        setSenha('')
        setConfirmaSenha('')
        
      }else {
        setMensagemError(resultado)
      }
    }    
  }

  

  return (
    <View style={estilos.container}>
      <EntradaTexto 
        label="Nome"
        value={nome}
        onChangeText={texto => setNome(texto)}
        error={statusError == 'nome'}
        messageError={mensagemError}
      />
      <EntradaTexto 
        label="E-mail"
        value={email}
        onChangeText={texto => setEmail(texto)}
        error={statusError == 'email'}
        messageError={mensagemError}
      />
      <EntradaTexto
        label="Senha"
        value={senha}
        onChangeText={texto => setSenha(texto)}
        secureTextEntry
        error={statusError == 'senha'}
        messageError={mensagemError}
      />

      <EntradaTexto
        label="Confirmar Senha"
        value={confirmaSenha}
        onChangeText={texto => setConfirmaSenha(texto)}
        secureTextEntry
        error={statusError == 'confirmaSenha'}
        messageError={mensagemError}
      />

      <Alerta 
        mensagem={mensagemError}
        error={statusError == 'firebase'}
        setError={setStatusError}
      />
      
      <Botao onPress={() => realizarCadastro()}>CADASTRAR</Botao>
    </View>
  );
}
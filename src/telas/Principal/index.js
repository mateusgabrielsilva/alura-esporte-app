import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import Cabecalho from '../../componentes/Cabecalho';
import Produto from '../../componentes/Produtos';
import estilos from './estilos';
import { auth, db } from '../../config/firebase';
import { getDoc, doc } from "firebase/firestore";

export default function Principal({ navigation }) {
  let [nameUsuario, setNameUsuario] = useState('')
  const usuario = auth.currentUser
  const uid = usuario.uid

  useEffect(() => {

    (async () => {
      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setNameUsuario(docSnap.data().name)
      } else {
        setNameUsuario('Úsuario não encontrado')
      }
    })();
  }, []);

  function deslogar() {
    auth.signOut();
    navigation.replace('Login')
  }

  return (
    <View style={estilos.container}>
      <Cabecalho logout={deslogar} />
      <Text style={estilos.texto}>Usuário: {nameUsuario}</Text>

      <Produto nome="Tênis" preco="250,00" />
      <Produto nome="Camisa" preco="100,00" />
      <Produto nome="Suplementos" preco="50,00" />
     </View>
  );
}

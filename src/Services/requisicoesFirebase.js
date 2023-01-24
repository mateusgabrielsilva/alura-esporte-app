import { auth, db } from "../config/firebase";
import { doc, setDoc, collection, addDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, AuthErrorCodes } from "firebase/auth";

function errosFirebase(error) {
    let mensagem = ''
    switch(error.code) {
        case AuthErrorCodes.EMAIL_EXISTS:
            mensagem = "Esse email já está em uso"
        break
        case AuthErrorCodes.INVALID_EMAIL:
            mensagem = "Email inválido"
        break
        case AuthErrorCodes.WEAK_PASSWORD:
            mensagem = "A senha precisa de no minimo 6 caracteres!"
        break
        default: 
            mensagem = "Erro desconhecido"
    }
    return mensagem
}

export async function cadastrar(nome, email, senha) {
    const resultado = await createUserWithEmailAndPassword(auth, email, senha)
      .then((dadosDoUsuario) => {
        async function cadastrarNovoUsuario() {
          const uid = dadosDoUsuario.user.uid

          await setDoc(doc(db, "users", uid), {
            name: nome
          });
          
          console.log(dadosDoUsuario)
          return "sucesso"
        }
        cadastrarNovoUsuario()
      })
      .catch((error) => {
        console.log(error)
        return errosFirebase(error)
        // ..
    });
    return resultado
}

export async function logar(email, senha) {
    const resultado = await signInWithEmailAndPassword(auth, email, senha)
      .then((dadosDoUsuario) => {
        // Signed in 
        console.log(dadosDoUsuario)
        return "sucesso"
        // ...
      })
      .catch((error) => {
        console.log(error)
        return "erro"
    });
    return resultado
}


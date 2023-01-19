import React from 'react'
import { Snackbar } from 'react-native-paper'

export function Alerta({mensagem, error = false, setError}) {
    return (
        <Snackbar
            visible={error}
            onDismiss={() => setError(false)}
            duration={1500}
            action={{
                label: "Ok",
                onPress: () => setError(false)
            }}
        >
            {mensagem}
        </Snackbar>
    )
}
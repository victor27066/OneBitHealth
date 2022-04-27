import React, {useState} from "react"
import { View, TextInput, Text, TouchableOpacity } from "react-native"
import ResultImc from "./ResultImc/"
import style from "./style"

export default function Form(){

    const [height, setHeigth] = useState(null)
    const [weight, setWeight] = useState(null)
    const [messageImc, setMessageImc] = useState("Preencha o peso e a altura")
    const [imc, setImc] = useState(null)
    const [textButton, setTextButton] = useState("CALCULAR IMC")
    const [thinOrFat, setThinOrFat] = useState(null)
    const [messageThinOrFat, setMessageThinOrFat] = useState(null)

    function imcCalculator(){
        //Calcula o IMC e seta 2 casas decimais
        var calc = (weight/(height*height)).toFixed(2)
        setImc(calc)
        showThinOrFat(calc)

    }

    function validationImc(){
        if(weight != null && height != null){
            imcCalculator() // Calcula o IMC
            setHeigth(null) // Limpa variável
            setWeight(null) // Limpa variável
            setMessageImc("Seu imc é igual: ")
            setTextButton("Calcular novamente!")
            setMessageThinOrFat("A sua condição atual é:")
            return
        }
        setImc(null)
        setMessageThinOrFat(null)
        setThinOrFat(null)
        setTextButton("CALCULAR IMC")
        setMessageImc("Preencha o peso e a altura")
    }

    function showThinOrFat(imc){
        if(imc > 0 && imc < 18.5){
            setThinOrFat("Baixo Peso !")
        }else if(imc > 18.5 && imc < 24.9){
            setThinOrFat("Intervalo Normal!")
        }else if(imc > 25 && imc < 29.9){
            setThinOrFat("Sobrepeso!")
        }else if(imc > 30 && imc < 34.9){
            setThinOrFat("Obesidade Classe 1!")
        }else if(imc > 35 && imc < 39.9){
            setThinOrFat("Obesidade Classe 2!")
        }else if(imc > 40){
            setThinOrFat("Obesidade Classe 3!")
        }else {
            setThinOrFat("Impreciso!")
        }
    }

    return (
        <View style ={style.formContext}>
            <View style ={style.form}>

                <Text style = {style.formLabel}>Altura</Text>
                <TextInput
                    onChangeText={setHeigth} // Ao digitar o valor já joga para o state
                    value={height}
                    placeholder="Ex. 1.75"
                    keyboardType="numeric"
                    style ={style.input}    
                />

                <Text style = {style.formLabel}>Peso</Text>
                <TextInput
                    onChangeText={setWeight} // Ao digitar o valor ja joga para o state
                    value={weight}
                    placeholder="Ex. 75"
                    keyboardType="numeric"
                    style ={style.input}     
                />

            <TouchableOpacity
                onPress={() => validationImc()}
                style = {style.buttonCalculator}
            >
                <Text style = {style.textButtonCalculator}>
                    {textButton}
                </Text>
            </TouchableOpacity>

            </View>

            <ResultImc messageResultImc={messageImc} resultImc={imc} thinOrFat={thinOrFat} messageThinOrFat={messageThinOrFat}/>

        </View>
    );
}
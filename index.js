
const inicio = new Date(2025,0,23)

function tempo(dataInicio){
    let hoje = new Date()
    let tempoJunto = hoje - dataInicio
    let diasJunto = parseInt(tempoJunto/(1000*60*60*24)).toString()
    let horasJunto = (tempoJunto/(1000*60*60)).toString()
    let minutosJunto = (tempoJunto/(1000*60)).toString()
    let segundosJunto = parseInt(tempoJunto/(1000)).toString()
    
    return {
        tempoJunto,
        diasJunto,
        horasJunto,
        minutosJunto,
        segundosJunto
    }
}



class EfeitoDigitacao{
    #indiceFrases = 0
    #indiceLetra = 0
    #digitando = true

    constructor(elementoID, textos=[], speed = 100){
        this.elemento = document.getElementById(elementoID)
        this.textos = textos
        this.speed = speed
        if(this.elemento === null){
            console.error(`Elemento com id "${elementoID}" não encontrado`)
        }
        this.digitar(this.speed)
    }
    
    
    digitar(){
        const fraseAtual = this.textos[this.#indiceFrases]
        if(this.#digitando){
            this.elemento.textContent = fraseAtual.substring(0,this.#indiceLetra)
            this.#indiceLetra++
            
            if(this.#indiceLetra > fraseAtual.length){
                setTimeout(()=>{
                    this.#digitando=false
                    this.digitar()
                },500)
                return
            }
        }else{
            this.elemento.textContent = fraseAtual.substring(0,this.#indiceLetra)
            this.#indiceLetra--
            
            if(this.#indiceLetra < 0){
                this.#digitando=true
                this.#indiceFrases++
                if(this.#indiceFrases === this.textos.length){
                    this.#indiceFrases = 0
                }
                console.log(this.#indiceFrases)
            }
        }

        setTimeout(()=>this.digitar(), this.speed)
        }

}
let tempoJunto = tempo(inicio)
let frases = ['Oi amor','Eu te amo !', `Feliz ${tempoJunto.diasJunto} dias juntos !`, 'Pare de peidar podre']
new EfeitoDigitacao('titulo', frases)


const longformat = (converted: number[]) => {

    let days: number | string = converted[0]
    let hours: number | string = converted[1]
    let minutes: number | string = converted[2]
    let seconds: number | string = converted[3]

    let dias: string = 'days'
    let horas: string = 'hours'
    let minutos: string = 'minutes'
    let segundos: string = 'seconds'

    if(days <= 0) { 
        days = ' '.trim()
        dias = ' '.trim()
    }

    if(days == 1) dias = dias.replace('s', ' ').trim()

    if(hours <= 0) {
        hours = ' '.trim() 
        horas = ' '.trim()
    }

    if(hours == 1) horas = 'hour'

    if(minutes <= 0) {
        minutes = ' '.trim()
        minutos = ' '.trim()
    }
    if(minutes == 1) minutos = 'minute'

    if(seconds <= 0) {
        seconds = ' '.trim()
        segundos = ' '.trim()
    }
    if(seconds == 1) segundos = 'second'

    let words = [days, dias, hours, horas, minutes, minutos, seconds, segundos]

    words.map(word => word += ' ')

    let joined = words.join(' ').split(/[ ]+/)

    joined.map(join => join += ' ')

    return joined

}


const shortformat = (converted: number[]) => {

    let days: number | string = converted[0]
    let hours: number | string = converted[1]
    let minutes: number | string = converted[2]
    let seconds: number | string = converted[3]

    let dias: string = 'd'
    let horas: string = 'h'
    let minutos: string = 'm'
    let segundos: string = 's'

    if(days <= 0) { 
        days = ' '.trim()
        dias = ' '.trim()
    }

    if(hours <= 0) {
        hours = ' '.trim() 
        horas = ' '.trim()
    }

    if(minutes <= 0) {
        minutes = ' '.trim()
        minutos = ' '.trim()
    }

    if(seconds <= 0) {
        seconds = ' '.trim()
        segundos = ' '.trim()
    }

    days = days + dias
    hours = hours + horas
    minutes = minutes + minutos
    seconds = seconds + segundos

    let words = [days, hours, minutes, seconds]

    words.map(word => word += ' ')

    let joined = words.join(' ').split(/[ ]+/)

    joined.map(join => join += ' ')

    return joined

}

export { longformat as long }
export { shortformat as short }
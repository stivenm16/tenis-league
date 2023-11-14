export function dateNow() {
  const fecha = new Date() // Obtiene la fecha actual

  // Obtener los componentes de la fecha (año, mes y día)
  const año = fecha.getFullYear()
  const mes = ('0' + (fecha.getMonth() + 1)).slice(-2) // El mes se indexa desde 0 (0 = enero)
  const dia = ('0' + fecha.getDate()).slice(-2)

  // Obtener los componentes de la hora (hora, minutos y segundos)
  const hora = ('0' + fecha.getHours()).slice(-2)
  const minutos = ('0' + fecha.getMinutes()).slice(-2)
  const segundos = ('0' + fecha.getSeconds()).slice(-2)

  // Construir la cadena de fecha en el formato necesario ('YYYY-MM-DDTHH:MM:SSZ')
  const fechaFormateada = `${año}-${mes}-${dia}T${hora}:${minutos}:${segundos}Z`

  return fechaFormateada
}

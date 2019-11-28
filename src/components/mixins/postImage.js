import firebase from '../../configFirebase.js'
import router from '../../router'

export default (url, comment, author) => {

    let d = new Date();
    let days = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sabado", "Domingo"];
    alert(firebase.db)

    firebase.db.collection('images').add(
        {
            url,
            comment,
            info: `Colocado por ${author != '' ? author : 'Desconhecido'} na ${days[d.getDay()]}`,
            created_at: new Date().getTime()
        }
    ).then(
        router.push({ name: 'home' })
    )
}

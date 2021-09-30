const key = require('../keys/index.js')
module.exports =function(email){
    return {
        to:email,
        from:key.EMAIL_FROM,
        subject:'Аккаунт создан',
        html:`
            <h1>Добро пожаловать в наш магазин</h1>
            <p>Вы успешно создали аккаунт с email:${email}</p>
            <hr />
            <a href="${key.BASE_LINK}">Магазин курсов</a>
        `
    }
}
const key = require('../keys/index.js')
module.exports = function(email,token){
    return{
        to:email,
        from:key.EMAIL_FROM,
        subject:'Воостановление доступа',
        html:`
            <h1>Вы забыли пароль?</h1>
            <p>Если нет, то проигнорируйте это письмо!</p>
            <p>Иначе нажмите на ссылку ниже:</p>
            <a href="${key.BASE_LINK}/auth/password/${token}">Воостановить доступ</a>
            <hr />
            <a href="${key.BASE_LINK}">Магазин курсов</a>
        `
    }
}
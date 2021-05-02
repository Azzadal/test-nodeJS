const fs = require('fs')
const nodemailer = require('nodemailer')
const loadJsonFile = require('load-json-file')

let config = loadJsonFile.sync('./config.json')

let items = fs.readdirSync(config.reportDirectoryPath).filter(fn => fn.endsWith('.xlsx'))

function attCreate(){
    function Obj(path){
        return {path: path}
    }
    let str = []
    for (let i = 0; i < items.length; i++){
        str[i] = new Obj(`${config.reportDirectoryPath}/${items[i]}`)
    }
    return str
}
const attach = attCreate()

async function main() {
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'testinmailapp@gmail.com',
            pass: 'dtcdbawfswesicor'
        },
        tls:{
            rejectUnAuthorized:true
        }
    });
    transporter.verify(function(error, success) {
        if (error) {
            console.log(error);
        } else {
            console.log('Сервер готов принимать сообщения');
        }
    });

    transporter.sendMail({
        from: '<testinmailapp@gmail.com>',
        to: config.recipients,
        subject: 'Тестовое задание ✔',
        text: 'Содержимое тестового письма',
        html: '<h2 style="color: chocolate">Автоматизированная рассылка файлов</h2>',
        attachments: attach
    });
}

main().catch(console.error);

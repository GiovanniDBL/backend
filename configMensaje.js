const nodemailer = require('nodemailer');
module.exports = (formulario) => {
    var transporter = nodemailer.createTransport({
        host: "easyaccess.com.mx",
        porth: 465,
        secure: 465,

        // service: 'gmail',
        auth: {
            user: 'admin@easyaccess.com.mx', // Cambialo por tu email
            pass: 'web@dmin2021..' // Cambialo por tu password
        }
    });
    const mailOptions = {
        from: `"${formulario.nombre}👋🔔" <${formulario.email}>`,
        to: 'ventas@easyaccess.com.mx', // Cambia esta parte por el destinatario
        subject: formulario.asunto,
        html: `
 <strong>Nombre:</strong> ${formulario.nombre} <br/>
 <strong>E-mail:</strong> ${formulario.email} <br/>
 <strong>Mensaje:</strong> ${formulario.mensaje}
 `
    };
    transporter.sendMail(mailOptions, function(err, info) {
        if (err)
            console.log(err)
        else
            console.log(info);
    });
}
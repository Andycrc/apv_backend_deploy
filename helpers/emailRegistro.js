import nodemailer from "nodemailer"

const emailRegistro = async (datos) => {
    const { email, nombre, token } = datos; 
    
 
    // Looking to send emails in production? Check out our Email API/SMTP product!
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
        }
    });

    const info = await transporter.sendMail({
        from: "APV - Administrador de Pacientes de Veterinaria",
        to: email,
        subject: "Comprueba tu cuenta en APV",
        text: "Comprueba tu cuenta en APV",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; background-color: #f9f9f9;">
            <h2 style="color: #333;">Hola ${nombre},</h2>
            <p style="color: #555;">Gracias por registrarte en APV. Para confirmar tu cuenta, haz clic en el botón de abajo:</p>
            <div style="text-align: center; margin: 20px 0;">
              <a href="${process.env.FRONTEND_URL}/confirmar/${token}" 
                 style="display: inline-block; padding: 12px 24px; font-size: 16px; color: white; background-color: #4CAF50; text-decoration: none; border-radius: 5px; font-weight: bold;">
                Confirmar Cuenta
              </a>
            </div>
            <p style="color: #555;">Si no solicitaste esta cuenta, puedes ignorar este mensaje.</p>
            <p style="color: #888; font-size: 12px;">© ${new Date().getFullYear()} APV - Todos los derechos reservados.</p>
          </div>
        `,
      });
  

  console.log('Mensaje enviado: %s', info.messageId)
};

export default emailRegistro;
import { Resend } from "resend";

const resend = new Resend('re_dm5Fm9PF_CU83b6RaFRmmrz5VPSHuMG5X'); // Crea una instancia de Resend

const enviarCorreo = async (req, res) => {
    try {
        const { productName, productImage, paymentMethod, units, userEmail } = req.body; // Obtener la información del producto y el correo electrónico del usuario del cuerpo de la solicitud

        // Aquí puedes usar la información del producto y el correo electrónico del usuario para enviar el correo electrónico
        const emailContent = `
            <p>Se ha realizado una nueva compra con los siguientes detalles:</p>
            <p><strong>Producto:</strong> ${productName}</p>
            <img src="${productImage}" alt="${productName}" style="max-width: 100px;" />
            <p><strong>Método de pago:</strong> ${paymentMethod}</p>
            <p><strong>Unidades:</strong> ${units}</p>
        `;

        // Configuración del correo electrónico con el correo electrónico del usuario
        const emailOptions = {
            from: 'SHOPTECNOLOGY <onboarding@resend.dev>',
            to: userEmail, // Usar el correo electrónico del usuario autenticado
            subject: 'Nueva compra realizada',
            html: emailContent
        };

        // Envía el correo electrónico utilizando la instancia de Resend
        await resend.emails.send(emailOptions);

        // Envía una respuesta al cliente indicando que el correo electrónico se ha enviado correctamente
        res.status(200).json({ message: 'Correo electrónico enviado correctamente' });
    } catch (error) {
        console.error('Error al enviar el correo electrónico:', error);
        // Envía una respuesta de error al cliente si ocurre algún problema al enviar el correo electrónico
        res.status(500).json({ error: 'Ocurrió un error al enviar el correo electrónico' });
    }
};

export default enviarCorreo;

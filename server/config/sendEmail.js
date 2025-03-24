import { Resend } from 'resend';
import dotenv from 'dotenv';
dotenv.config();

if (!process.env.RESEND_API) {
  throw new Error('RESEND_API is required');
}

const resend = new Resend(process.env.RESEND_API);

const sendEmail = async ({  sendto , subject, html }) => {
    try{
        const { data, error } = await resend.emails.send({
            from: 'Shopmilk  <onboarding@resend.dev>',
            to: sendto,
            subject: subject,
            html: html,
          });

          if (error) {
            return console.error({ error });
          }
          
          return data;
    }catch(errer){
        console.log(errer)
    }
}

export default sendEmail;
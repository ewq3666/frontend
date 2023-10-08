import { Resend } from 'resend';

const resend = new Resend('re_XbvFoC1i_KTUnicYCSKxsPjApJ9DgkSr4');
export const send=async()=>{
    try {
        const res = await resend.emails.send({
          from: 'earnwithquizee@gmail.com',
          to: 'prede46@gmail.com',
          subject: 'hello world',
          text: 'it works!',
        });
        console.log(res);
      } catch (error) {
        console.error(error);
      }
      
}
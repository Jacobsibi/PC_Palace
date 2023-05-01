import emailjs from 'emailjs-com';

export const sendEmail = (e)  => {

    e.preventDefault();
  
    emailjs.sendForm('service_c67h00a', 'template_9l0na6s', e.target, 'gxc1998@autuni.ac.nz')
      .then((result) => {
        console.log(result.text);
      }, (error) => {
        console.log(error.text);
      });

}
  
export default sendEmail;
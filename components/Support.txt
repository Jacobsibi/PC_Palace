import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import styles from '../styles/Support.module.css';

const Support = () => {

  const [message, setMessage] = useState("");

  const form = useRef();


    //Function: send mail using emailJs
    const sendEmail = async (e) => {
      e.preventDefault();
  
  
      //check empty message
      if (message.trim() == "") {
            //true: then show error
            swal("Enter a message", "Message box cannot be left blank", "warning");
          } else {
            //false: then send the message

      // using the imported function to send form, with the address configurations set up from EmailJs and handle the errors as well
      emailjs.sendForm('service_vds5qa2', 'template_36ltlst', form.current, 'at1R64fRA37Jqwu7D')
      .then((result) => {
          swal("Message Sent", "Our customer team will contact you soon", "success");
      }, (error) => {
        swal("Message Not Sent", "Please try again", "error");
      });
          }


    };


  //output
  return (
    <form class={styles.form} ref={form} onSubmit={sendEmail}>
      <label class={styles.label} >Name</label>
      <input class={styles.input} type="text" name="user_name" maxLength={20} required/>
      <label class={styles.label} >Email</label>
      <input class={styles.input} type="email" name="user_email" required pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"/>
      <label class={styles.label}> Message</label>
      <textarea class={styles.messageTextarea} name="message" onChange={(e) => setMessage(e.target.value)} required/>
      <input class={styles.input} type="submit" value="Send" />
    </form>
  );
};

export default Support;

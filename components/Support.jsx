import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import styles from '../styles/Support.module.css';

const Support = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_vds5qa2', 'template_36ltlst', form.current, 'at1R64fRA37Jqwu7D')
      .then((result) => {
          console.log(result.text);
          swal("Message Sent", "Our customer team will contact you soon", "success");
      }, (error) => {
          console.log(error.text);
      });
  };

  return (

    <form class={styles.form} ref={form} onSubmit={sendEmail}>
      <label class={styles.label} >Name</label>
      <input class={styles.input} type="text" name="user_name" required/>
      <label class={styles.label} >Email</label>
      <input class={styles.input} type="email" name="user_email" required pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"/>
      <label class={styles.label}> Message</label>
      <textarea class={styles.textarea} name="message" required/>
      <input class={styles.input} type="submit" value="Send" />
    </form>
  
  );
};

export default Support;

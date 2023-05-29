import React from "react";
import styles from "../styles/Support.module.css";

const ContactUs = ({ form, sendEmail, setName, setEmail, setMessage }) => {
  return (
    <form className={styles.form} ref={form} onSubmit={sendEmail}>
      <h1>Contact Us</h1>
      <label className={styles.label}>Name</label>
      <input
        className={styles.input}
        type="text"
        name="user_name"
        maxLength={20}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <label className={styles.label}>Email</label>
      <input
        className={styles.input}
        type="email"
        name="user_email"
        onChange={(e) => setEmail(e.target.value)}
        required
        pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
      />
      <label className={styles.label}>Message</label>
      <textarea
        className={styles.messageTextarea}
        name="message"
        onChange={(e) => setMessage(e.target.value)}
        required
      />
      <input className={styles.input} type="submit" value="Send" />
    </form>
  );
};

export default ContactUs;

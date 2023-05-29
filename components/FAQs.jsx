import React from "react";
import styles from "../styles/FAQs.module.css";

const FAQs = () => {
  return (
    <div className={styles.faq}>
      <h3 class={styles.h3}>PC Palace Shipping Times</h3>

      <div>
        <p class={styles.question}>How long is the delivery ?</p>
        <p class={styles.answer}>
          On average, it should take about 5 days to process the order to
          inventory after the purchase is made. Once the order is processed
          through inventory, our current estimate for shipping the PC is 7-12
          business days.
        </p>
        <p class={styles.answer}>
          Please note: The days below are estimates that have not factored in
          delays caused by supply or backlog.
        </p>
        <p class={styles.question}>What is the process of your delivery ?</p>
        <ul class={styles.answer}>
          <li>Inventory processing: 1-5 days</li>
          <li>Assembly of PC: 1-2 days</li>
          <li>Testing and QA: 1-2 days</li>
          <li>Quality Assurance: 1-2 days</li>
          <li>Packaging and shipping: 1-2 days</li>
        </ul>
        <p class={styles.answer}>
          Disclaimer: Shipping & Delivery times are subject to change depending
          on FedEx schedules, weather delays, supply chain disruptions, and the
          Holiday Season.
        </p>
        <p class={styles.question}>Do you have other questions ?</p>
        <p class={styles.answer}>
          If you have any further questions or concerns regarding your order,
          please contact one of our support agents to assist you via the
          "Contact Us" option or email at support@pcpalace.com
        </p>
      </div>
    </div>
  );
};

export default FAQs;

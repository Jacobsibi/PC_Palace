import React, { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import styles from "../styles/Support.module.css";

const Support = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const form = useRef();
  const [activeTab, setActiveTab] = useState("tab1"); // Add state for active tab

  //function: refresh page
  function refreshPage() {
    window.location.reload(false);
  }
  //function: send email
  // const sendEmail = async (e) => {
  //   e.preventDefault();
  //   if (message.trim() === "") {
  //     swal("Enter a message", "Message box cannot be left blank", "warning");
  //   } else {
  //     const { user_name, user_email } = e.target.elements; // Get the form field values
  //     const templateParams = {
  //       from_name: name,
  //       from_email: email,
  //       message: message.trim(),
  //     };
  //     emailjs
  //       .sendForm(
  //         "service_vds5qa2",
  //         "template_36ltlst",
  //         form.current,
  //         "at1R64fRA37Jqwu7D"
  //       )
  //       .then(
  //         async (result) => {
  //           await swal(
  //             "Message Sent",
  //             "Our customer team will contact you soon",
  //             "success"
  //           );
  //           refreshPage();
  //         },
  //         (error) => {
  //           swal("Message Not Sent", "Please try again", "error");
  //         }
  //       );
  //   }
  // };

  //function: send email
  const sendEmail = async (e) => {
    e.preventDefault();
    if (message.trim() === "") {
      swal("Enter a message", "Message box cannot be left blank", "warning");
    } else {

      // emailjs
      //   .sendForm("service_vds5qa2", "template_36ltlst", templateParams, "at1R64fRA37Jqwu7D")
      //   .then(
      //     async (result) => {
      //       await swal("Message Sent", "Our customer team will contact you soon", "success");
      //       refreshPage();
      //     },
      //     (error) => {
      //       swal("Message Not Sent", "Please try again", "error");
      //     }
      //   );
      // }

      //using premade function from emailjs
      emailjs
      .send("service_vds5qa2","template_36ltlst",{
        from_name: name,
        from_email: email,
        message: message,
        }, "at1R64fRA37Jqwu7D" )
        .then(
          async (result) => {
            await swal("Message Sent", "Our customer team will contact you soon", "success");
            refreshPage();
          },
          (error) => {
            swal("Message Not Sent", "Please try again", "error");
          }
        );
        }

  };
  

  return (
    <>
      <div>
        <button onClick={() => setActiveTab("tab1")}>Contact Us</button>
        <button onClick={() => setActiveTab("tab2")}>FAQs</button>
        <button onClick={() => setActiveTab("tab3")}>Reviews</button>
      </div>

      {activeTab === "tab1" && (
        <form class={styles.form} ref={form} onSubmit={sendEmail}>
          <h1>Contact Us</h1>
          <label class={styles.label}>Name</label>
          <input
            class={styles.input}
            type="text"
            name="user_name"
            maxLength={20}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <label class={styles.label}>Email</label>
          <input
            class={styles.input}
            type="email"
            name="user_email"
            onChange={(e) => setEmail(e.target.value)}
            required
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
          />
          <label class={styles.label}> Message</label>
          <textarea
            class={styles.messageTextarea}
            name="message"
            onChange={(e) => setMessage(e.target.value)}
            required
          />
          <input class={styles.input} type="submit" value="Send" />
        </form>
      )}
      {activeTab === "tab2" && (
        <div className={styles.faqs}>
          <h3>PC Palace Shipping Times</h3>
          <p>
            On average, it should take about 5 days to process the order to
            inventory after the purchase is made. Once the order is processed
            through inventory, our current estimate for shipping the PC is 7-12
            business days.
          </p>
          <p>
            Please note: The days below are estimates that have not factored in
            delays caused by supply or backlog.
          </p>
          <ul>
            <li>Inventory processing: 1-5 days</li>
            <li>Assembly of PC: 1-2 days</li>
            <li>Testing and QA: 1-2 days</li>
            <li>Quality Assurance: 1-2 days</li>
            <li>Packaging and shipping: 1-2 days</li>
          </ul>
          <p>
            Disclaimer: Shipping & Delivery times are subject to change
            depending on FedEx schedules, weather delays, supply chain
            disruptions, and the Holiday Season.
          </p>
          <p>
            If you have any further questions or concerns regarding your order,
            please contact one of our support agents to assist you via the
            "Contact Us" option or email at support@pcpalace.com.
          </p>
        </div>
      )}
      {activeTab === "tab3" && (
        <div>
          <h1>Reviews</h1>
        </div>
      )}
    </>
  );
};

export default Support;

import React, { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import styles from "../styles/Support.module.css";
import ContactUs from "./ContactUs";
import FAQs from "./FAQs";


const Support = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [activeTab, setActiveTab] = useState("tab1"); //add state for active tab
  const form = useRef();




  //function: send email
  const sendEmail = async (e) => {
    e.preventDefault();
    if (message.trim() === "") {
      swal("Enter a message", "Message box cannot be left blank", "warning");
    } else {
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
         
            setName("");
            setEmail("");
            setMessage("");
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
        <button class={styles.tabButton} onClick={() => setActiveTab("tab1")}>Contact Us</button>
        <button class={styles.tabButton} onClick={() => setActiveTab("tab2")}>FAQs</button>
      </div>

      {activeTab === "tab1" && (<ContactUs
          form={form}
          sendEmail={sendEmail}
          setName={setName}
          setEmail={setEmail}
          setMessage={setMessage}
        />)}
      {activeTab === "tab2" && ( <FAQs />)}
    </>
  );
};

export default Support;

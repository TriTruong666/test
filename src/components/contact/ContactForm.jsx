import emailjs from "@emailjs/browser";
import React, { useRef, useState } from "react";
import { Alert } from "../../components/Alert/Alert";
import useAlert from "../../hooks/useAlert";
import "../../styles/components/contact/contact.css";

export const ContactForm = () => {
  const formRef = useRef();
  const { alert, showAlert, hideAlert } = useAlert();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = ({ target: { name, value } }) => {
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .send(
        import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          to_name: "Your Company Name",
          from_email: form.email,
          message: form.message,
        },
        import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
      )
      .then(
        () => {
          setLoading(false);
          showAlert({
            show: true,
            text: "Thank you for your message! We will get back to you soon.",
            type: "success",
          });
          setForm({ name: "", email: "", message: "" });
          setTimeout(() => {
            hideAlert(false);
          }, 3000);
        },
        (error) => {
          setLoading(false);
          console.error(error);
          showAlert({
            show: true,
            text: "There was an error sending your message. Please try again.",
            type: "danger",
          });
        }
      );
  };

  return (
    <div className="contact-form-container">
      {alert.show && <Alert {...alert} />}
      <h3 className="contact-form-title">Contact Us</h3>
      <form ref={formRef} onSubmit={handleSubmit} className="contact-form">
        <label className="contact-form-label">
          <span className="contact-form-label-text">Full Name</span>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="contact-form-input"
            placeholder="Your Name"
          />
        </label>
        <label className="contact-form-label">
          <span className="contact-form-label-text">Email Address</span>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            className="contact-form-input"
            placeholder="Your Email"
          />
        </label>
        <label className="contact-form-label">
          <span className="contact-form-label-text">Message</span>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            required
            rows={5}
            className="contact-form-input"
            placeholder="Your Message"
          />
        </label>
        <button
          className="contact-form-button"
          type="submit"
          disabled={loading}
        >
          {loading ? "Sending..." : "Send Message"}
        </button>
      </form>
    </div>
  );
};

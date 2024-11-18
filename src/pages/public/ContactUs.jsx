import emailjs from '@emailjs/browser';
import React, { useEffect, useRef, useState } from "react";
import { Alert } from '../../components/Alert/Alert';
import useAlert from "../../hooks/useAlert";
// import styles
import "../../styles/dashboard/contactus/contactus.css";
// import components
import kois from "../../assets/kois.png";
import { Footer } from "../../components/footer/Footer";
import { Navbar } from "../../components/navbar/Navbar";
import { Settingnav } from "../../components/navbar/Settingnav";
// import service

export const ContactUs = () => {
  // state
  const [isAuth, setIsAuth] = useState(false);
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleSetIsAuth = () => {
    if (!token && !user) {
      setIsAuth(false);
    } else {
      setIsAuth(true);
    }
  };

  useEffect(() => {
    handleSetIsAuth();
  }, [handleSetIsAuth]);
  //handle send email
  const formRef = useRef();

  const { alert, showAlert, hideAlert } = useAlert();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({ name: '', email: '', message: '' });

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
          to_name: 'Izumiya Koi',
          from_email: form.email,
          to_email: 'dieuthanhvn1006@gmail.com',
          message: form.message,
        },
        import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY,
      )
      .then(
        () => {
          setLoading(false);
          showAlert({
            show: true,
            text: 'Thank you for your message 😃',
            type: 'success',
          });

          setTimeout(() => {
            hideAlert(false);
            setForm({
              name: '',
              email: '',
              message: '',
            });
          }, [3000]);
        },
        (error) => {
          setLoading(false);
          console.error(error);

          showAlert({
            show: true,
            text: "I didn't receive your message 😢",
            type: 'danger',
          });
        },
      );
  };




  return (
    <div className="ContactUs-container">
      <Navbar />
      {isAuth && <Settingnav />}
      <section className="contact" id="contact">
      {alert.show && <Alert {...alert} />}

      <div className="contact__container">
       

        <div className="contact__content">
          <h3 className="contact__title">Let's talk</h3>
          <p className="contact__description">
            Whether you're looking for a platform that can manage your kois, or you want to selling your products at out page you can leave a message ! Thank you very much
          </p>

          <form ref={formRef} onSubmit={handleSubmit} className="contact__form">
            <label className="contact__form-label">
              <span className="contact__form-label-text">Full Name</span>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="contact__form-input"
                placeholder="ex., John Doe"
              />
            </label>

            <label className="contact__form-label">
              <span className="contact__form-label-text">Email address</span>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="contact__form-input"
                placeholder="ex., johndoe@gmail.com"
              />
            </label>

            <label className="contact__form-label">
              <span className="contact__form-label-text">Your message</span>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows={5}
                className="contact__form-input"
                placeholder="Share your thoughts or inquiries..."
              />
            </label>

            <button className="contact__form-button" type="submit" disabled={loading}>
              {loading ? 'Sending...' : 'Send Message'}
              <img src={kois} alt="arrow-up" className="contact__form-button-arrow" />
            </button>
          </form>
        </div>
      </div>
    </section>
      <Footer />
    </div>
  );
};

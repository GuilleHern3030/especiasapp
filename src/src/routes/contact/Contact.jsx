import { Link } from "react-router-dom";
import { useState } from "react";

import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';

import whtasappIcon from '../../assets/icons/whatsapp-icon.webp';

import styles from "./Contact.module.css";

import { contactLink, title, contactForm, email } from "../../data/client-info.json";
import { credits } from "../../data/references.json";
import useContactLink from "../../hooks/useContactLink";

export default function Contact() {

    const [submitDisabled, setSubmitDisabled] = useState(false);
    const [submitText, setSubmitText] = useState("Enviar");

    const handleClick = async(e, inputs) => {
        e.preventDefault();
        setSubmitDisabled(true);
        setSubmitText("Enviando...");
        try {
            await postMessage(inputs);
            setSubmitText("Enviado!")
        } catch (e) {
            setSubmitText("Error")
            console.warn(e)
        }
    }

    return (<div>
        <Header pageName={title}>
            <Link to="/about"> Nosotros </Link>
            <Link to="/contact"> Contacto </Link>
        </Header>
   
        <div className={styles.contact}>
            <p className={styles.instructions}>Hola! Muchas gracias por visitarnos.</p>


            <p className={styles.instructions}>Puedes escribirnos a nuestro whatsapp:</p>
            <div className={styles.wame}>
                <div className={styles.wame_animation} onClick={useContactLink}>
                    <img src={whtasappIcon} alt="Whatsapp"/>
                </div>
            </div>
            
        </div>

        <Footer color='#000' backgroundColor='#b2afafff' copyrigth='Webpage created by GuilleNH' copyrightHref={credits}/>

    </div>);
}
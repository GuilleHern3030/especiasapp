import { Link } from "react-router-dom";
import { useState } from "react";

import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';

import whtasappIcon from '../../assets/icons/whatsapp-icon.webp';

import logo from '../../assets/images/logo.png'
import styles from "./Contact.module.css";

import { title } from "../../data/client-info.json";
import { credits } from "../../data/references.json";

import useData from "../../hooks/useData";

export default function Contact() {

    const [submitDisabled, setSubmitDisabled] = useState(false);
    const [submitText, setSubmitText] = useState("Enviar");

    const data = useData()

    const handleWhatsApp = () => 
        window.open(data.contactlink, "_blank")

    return (<div>
        <Header pageName={title}>
            <Link to="/about"> Nosotros </Link>
            <Link to="/contact"> Contacto </Link>
        </Header>

        <div className={styles.logo}>
            <img src={logo}/>
        </div>
   
        <div className={styles.contact}>
            <p className={styles.instructions}>Hola! Muchas gracias por visitarnos.</p>

                { data ? <><p className={styles.instructions}>Puedes contactarnos por medio de nuestro correo electrónico:</p>
                    <div className={styles.gmail}>
                        <div className={styles.wame_animation}>
                            <a className={styles.emaillink} aria-label="email" href={`mailto:${data.email}?subject=Contact from ${title}`}><p className={styles.instructions}>{data.email}</p></a>
                        </div>
                        <br/>
                        <br/>
                        <br/>
                    </div>
                </>: null}

            <p className={styles.instructions}>Puedes escribirnos a nuestro whatsapp:</p>
            <div className={styles.wame}>
                <div className={styles.wame_animation} onClick={handleWhatsApp}>
                    <img src={whtasappIcon} alt="Whatsapp"/>
                </div>
            </div>

            <br/>

            <p className={styles.instructions}>O bien, visitarnos en nuestras redes sociales.</p>
            
        </div>

        <Footer color='#000' backgroundColor='#b2afafff' copyrigth='Webpage created by GuilleNH' copyrightHref={credits}/>

    </div>);
}
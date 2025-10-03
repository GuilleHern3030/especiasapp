import { Link } from "react-router-dom";
import image from '../../assets/images/logo.png';
import styles from "./About.module.css";

import Header from '../../components/header/Header';
import Footer from "../../components/footer/Footer";

import { title } from "../../data/client-info.json";
import { credits } from "../../data/references.json";

export default function About() {

    return (<>
        <Header pageName={title}>
            <Link to="/about"> Nosotros </Link>
            <Link to="/contact"> Contacto </Link>
        </Header>
   
        <main className={styles.main}>
            <section className={styles.top}>
                <article>
                    <h2>Sobre nosotros</h2>
                    <p>¡Bienvenidos a { title }!</p>
                    <p>Somos un emprendimiento familiar ubicado en la localidad de Lanús.</p>
                    <p>Nuestra misión es simple: brindar a nuestros clientes una variedad de especias al por menor con precios económicos y accesibles.</p>
                </article>
                <article>
                    <h2>Nuestra historia</h2>
                    <p>Hemos querido cumplir nuestro sueño de fundar nuestro propio emprendimiento familiar.</p>
                    <p>Con una vision y una determinación inquebrantable, abrimos las puertas de nuestro pequeño rincón en Lanús, en el corazón de nuestro barrio.</p>
                </article>
                <article>
                    <h2>Nuestra comunidad</h2>
                    <p>Amamos profundamente a nuestro barrio y a las personas que lo hacen especial.</p>
                    <p>Creemos que no solo se debe alimentar el cuerpo, sino también el alma de la comunidad brindando una atención personalizada y empática con cada cliente.</p>
                </article>
                <article>
                    <h2>Pruébanos</h2>
                    <p>Te invitamos a probar y experimentar el auténtico sabor tradicional de cada especia.</p>
                    <p>Queremos que condimentar una comida sea siempre una experiencia deliciosa.</p>
                    <p>¡Esperamos verte pronto!</p>
                </article>
            </section>
            
            <section className={styles.bottom}>
                <img className={styles.bottomImg} src={image}/>
            </section>

        </main>

        <Footer color='#000' backgroundColor='#b2afafff' copyrigth='Webpage created by GuilleNH' copyrightHref={credits}/>
 
    </>);

}
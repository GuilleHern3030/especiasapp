import { Link } from "react-router-dom"
import styles from "./Privacy.module.css"

// Data
import { title, owner } from "../../data/client-info.json"

// Images
import logo from "../../assets/icons/logo.png"

// Components
import Header from "../../components/header/Header"
import Footer from "../../components/footer/Footer"

export default () => {
    
    return <>

        <Header 
            pageName={title}
            colorOnScroll='#1f1f1fff'
            logo={logo}
            changeBackgroundOnScroll={true}>
            <Link to="/about"> Nosotros </Link>
            {/* <Link to="/gallery"> Galería </Link> */}
            <Link to="/contact"> Contacto </Link>
        </Header>

        <main className={styles.main}>
            <p className={styles.title}>Aviso legal y Política de privacidad</p>

            <p className={styles.subtitle}>Aviso legal</p>
            <p className={styles.text}><b>1.</b> El titular de este sitio web es <b>{owner}</b>, oriundo de Provincia de Buenos Aires, Argentina.</p>
            <p className={styles.text}><b>2.</b> El acceso al sitio web de <b>{title}</b> es gratuito. Todo el contenido es propiedad intelectual de {owner}. Cualquier utilización de los mismos contraria a las normas en materia de propiedad intelectual será perseguida con arreglo a la legislación vigente.</p>

            <p className={styles.subtitle}>Política de privacidad</p>

            <p className={styles.article}>1. USO Y TRATAMIENTO DE DATOS DE CARÁCTER PERSONAL</p>
            <p className={styles.text}>Los datos de carácter personal proporcionados, a través del sitio web, así como los que pudiera facilitar en el futuro en el marco de su relación jurídica con esta entidad, son archivados bajo seguridad en nuestros servidores.</p>
            <p className={styles.text}>El almacenamiento de esta información tiene la finalidad de gestionar, administrar, prestarle los servicios o facilitarle los productos que solicite, facilitar el cumplimiento y ejecución de los contratos que pudiera celebrar, conocer mejor sus gustos y adecuar los servicios a sus preferencias, así como poder ofrecerle nuevos servicios o productos y enviarle información administrativa, técnica, organizativa y/o comercial de forma documental y/o electrónica relacionada con nuestras actividades.</p>
            <p className={styles.text}>Los usuarios garantizan y responden, en cualquier caso, de la veracidad, exactitud, vigencia y autenticidad de la información personal facilitada y se comprometen a mantenerla debidamente actualizada.</p>
            
            <p className={styles.article}>2. EJERCICIO DE DERECHOS: ACCESO, RECTIFICACIÓN, CANCELACIÓN Y OPOSICIÓN</p>
            <p className={styles.text}>Aquellas personas físicas que nos hayan facilitado sus datos, podrán dirigirse a esta entidad, en su calidad de titular de los datos, con el fin de poder ejercitar gratuitamente sus derechos de acceso, rectificación, cancelación y oposición respecto de sus datos, conforme a la normativa vigente.</p>
            <p className={styles.text}>Conforme se establece en el artículo 14, inciso 3 de la Ley Nº 25.326, el titular de los datos personales tiene la facultad de ejercer el derecho de acceso a los mismos en forma gratuita a intervalos no inferiores a seis meses, salvo que se acredite un interés legítimo al efecto. Dado el carácter confidencial de la información, usted no podrá ejercitar sus derechos telefónicamente, sino que lo deberá solicitar por cualquier medio que deje constancia de su envío y de su recepción y remitir copia de su DNI o documento equivalente.</p>
            <p className={styles.text}>El interesado podrá ejercitar sus derechos mediante comunicación por escrito dirigida a {title} en la dirección indicada al inicio o a la dirección de correo electrónico informada en el pie de página.</p>
            <p className={styles.text}>Se informa que la Dirección Nacional de Protección de Datos Personales, Órgano de Control de la Ley Nº 25.326, tiene la atribución de atender las denuncias y reclamos que se interpongan con relación al incumplimiento de las normas sobre protección de datos personales. </p>

            <p className={styles.article}>3. MEDIDAS DE SEGURIDAD</p>
            <p className={styles.text}>Estamos obligados a cumplir con toda la normativa aplicable en materia de medidas de seguridad aplicables a la información y datos de carácter personal.</p>
            <p className={styles.text}>{title} le informa que tiene implantadas las medidas de seguridad de índole técnica y organizativas necesarias para garantizar la seguridad de sus datos de carácter personal y evitar su alteración, pérdida y tratamiento y/o acceso no autorizado, habida cuenta del estado de la tecnología, la naturaleza de los datos almacenados y los riesgos a que están expuestos, ya provengan de la acción humana o del medio físico o natural. Así, {title} ha establecido medidas adicionales en orden a reforzar la confidencialidad e integridad de la información en la organización. No obstante, el usuario debe ser consciente de que las medidas de seguridad en Internet no son inexpugnables y enteramente fiables y que {title} no puede garantizar la inexistencia de virus u otros elementos que pudieran producir alteraciones en los sistemas informáticos (software y hardware) del usuario.</p>
            <p className={styles.text}>{title} continuamente mantiene la supervisión, control y evaluación de los procesos para asegurar el respeto a la privacidad de los datos.</p>

            <p className={styles.article}>4. USO DE COOKIES</p>
            <p className={styles.text}>Las "cookies" constituyen una herramienta empleada por los servidores web para almacenar y recuperar información acerca de sus usuarios. </p>
            <p className={styles.text}>Las "cookies" son mensajes enviados por el servidor al ordenador del usuario, consistentes en archivos de texto que se almacenan en la memoria del ordenador y que recogen información relativa a las páginas que se visitan, el tiempo de conexión a Internet, etc. Las "cookies" vuelven a ser enviadas al servidor cada vez que el usuario entra en esa página.</p>
            <p className={styles.text}>La finalidad de las "cookies" de nuestro sitio web es personalizar los servicios que le ofrecemos, facilitándole información que pueda ser de su interés. Si no desea que se instale en su disco duro una cookie puede configurar el navegador de su ordenador para no recibirlas. Sin embargo, le hacemos notar que, en ese caso, la calidad del funcionamiento del sitio web puede disminuir.</p>
            <p className={styles.text}>Las "cookies" se asocian únicamente con un usuario anónimo y su ordenador, y no proporcionan por sí solas los datos personales del usuario, ni pueden leer datos de su disco duro, ni leer los archivos cookie creados por otros proveedores. </p>
            <p className={styles.text}>Los "logs" son unos archivos almacenados en nuestros servidores que registran datos sobre su navegación y nos permiten seguirle prestando los servicios que solicita. Asimismo, nos ayudan a analizar el funcionamiento del sistema, localizar las incidencias y problemas que puedan surgir y solventarlos en el menor plazo posible.</p>

            <p className={styles.article}>5. MENORES DE EDAD</p>
            <p className={styles.text}>La protección de datos de carácter personal es esencial, por lo que en el supuesto de que el usuario sea menor de edad, éste sólo podrá aportar sus datos personales en los formularios de recogida de los mismos, con el previo consentimiento de los padres o tutores, enviando el formulario correspondiente debidamente firmado por los padres o tutores por correo certificado y con copia del DNI del padre o tutor firmante a la dirección indicada en el pie de página.</p>
            <p className={styles.text}>No respondemos de aquellos datos de menores que sin poder conocer {title} este hecho se haya facilitado sin el consentimiento de los padres o tutores.</p>

            <p className={styles.article}>6. MODIFICACIÓN DE LA POLÍTICA DE PRIVACIDAD</p>
            <p className={styles.text}>{title} se reserva el derecho a modificar su Política de Privacidad. Cualquier modificación de la Política de Privacidad será publicada, antes de su efectiva aplicación. El uso del Web después de dichos cambios, implicará la aceptación de éstos.</p>

            <p className={styles.article}>7. LEGISLACIÓN APLICABLE</p>
            <p className={styles.text}>Cualquier controversia que se derive del uso de este site, será interpretada y sometida de acuerdo con las leyes de Argentina.</p>
        </main>

        <Footer/>

    </>
}
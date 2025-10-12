import { Link } from 'react-router-dom'

import Header from '../../components/header/Header'
import Footer from '../../components/footer/Footer'
import FloatingButton from '../../components/floatingbutton/FloatingButton'
import Table from '../../components/table/Table'

import { credits } from '../../data/references.json'
import { title } from '../../data/client-info.json'

import styles from './Home.module.css'

import logo from '../../assets/images/logo.png'
import logo2 from '../../assets/icons/logo.png'
import useTable from '../../hooks/useTables'

export default function Home() {

    const { areThereSelections } = useTable()

    return <>
        <Header 
            pageName={title}
            colorOnScroll='#1f1f1fff'
            logo={logo2}
            changeBackgroundOnScroll={true}>
            <Link to="/about"> Nosotros </Link>
            <Link to="/contact"> Contacto </Link>
        </Header>
        
        <FloatingButton/>

        <div className={styles.logo}>
            <img src={logo}/>
        </div>

        <div className={styles.table}>
            <Table/>

            { areThereSelections === true ? <div className={styles.ticketbutton}><Link to="/ticket" onClick={() => window.scrollTo({top:0})}>Ver ticket</Link></div> : <></> }

        </div>

        <div style={{paddingTop:'16vw'}} />

        <Footer color='#000' backgroundColor='#b2afafff' copyrigth='Webpage created by GuilleNH' copyrightHref={credits}/>


    </>

}
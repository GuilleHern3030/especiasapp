import { Link } from 'react-router-dom'

import useCells from "../../hooks/useCells";

import Header from '../../components/header/Header'
import Footer from '../../components/footer/Footer'
import FloatingButton from '../../components/floatingbutton/FloatingButton'

import styles from './Ticket.module.css'
import logo from '../../assets/images/logo.png'

import { credits } from '../../data/references.json'
import { title } from '../../data/client-info.json'

const total = (cells) => {
    try {
        let total = 0;
        const prices = cells.items.forEach(item => {
            const price = Number(item.price.replaceAll("$", "").replaceAll(",", "").replaceAll(".", ""))
            if (!isNaN(price)) {
                total += price
            } else throw `${item.price} isn't a number`
        })
        return <div className={styles.items}>
            <p className={`${styles.item} ${styles.total}`}>Total estimado: ${total}</p>
        </div>
    } catch(e) {
        console.error(e)
        return null
    }
}

export default function Ticket() {
    
    const cells = useCells()
    console.log(cells)

    return <>
        <Header 
            pageName={title}
            colorOnScroll='#1f1f1fff'
            logo={logo}
            changeBackgroundOnScroll={true}>
            <Link to="/about"> Nosotros </Link>
            <Link to="/contact"> Contacto </Link>
        </Header>
        
        <div className={styles.logo}>
            <img src={logo}/>
        </div>

        { cells ? <>
            <div className={styles.title}> <p>Ticket</p> </div>
            <hr/>
            <div className={styles.items}>{
                cells.items.map((item, index) => 
                    <p 
                        key={index} 
                        id={cells.keys[index]}
                        className={styles.item}
                    >{`${item.name} (${item.header}): ${item.price}`}</p>
                )
            }</div>
            <hr/>
            {
                total(cells)
            }
        </> : <></>
        }

        <FloatingButton/>
        <Footer color='#000' backgroundColor='#b2afafff' copyrigth='Webpage created by GuilleNH' copyrightHref={credits}/>
    </>

}
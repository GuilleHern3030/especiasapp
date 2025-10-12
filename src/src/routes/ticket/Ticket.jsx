import { Link } from 'react-router-dom'

import useCells from "../../hooks/useCells";

import Header from '../../components/header/Header'
import Footer from '../../components/footer/Footer'
import FloatingButton from '../../components/floatingbutton/FloatingButton'

import styles from './Ticket.module.css'
import logo from '../../assets/images/logo.png'
import logo2 from '../../assets/icons/logo.png'

import { credits, priceundefined } from '../../data/references.json'
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
        return <>
                <hr/>
                <div className={styles.items}>
                    <p className={`${styles.item} ${styles.total}`}>Total estimado: ${total}</p>
                </div>
            </>
    } catch(e) {
        return null
    }
}

export default function Ticket() {
    
    const cells = useCells()

    return <>
        <Header 
            pageName={title}
            colorOnScroll='#1f1f1fff'
            logo={logo2}
            changeBackgroundOnScroll={true}>
            <Link to="/about"> Nosotros </Link>
            <Link to="/contact"> Contacto </Link>
        </Header>
        
        <div className={styles.logo}>
            <img src={logo}/>
        </div>

        <div className={styles.ticket}>
            { cells ? <>
                <div className={styles.title}> <p>Ticket</p> </div>
                <hr/>
                <div className={styles.items}>{
                    cells.items.map((item, index) => 
                        <p 
                            key={index} 
                            id={cells.keys[index]}
                            className={styles.item}
                        >{`${item.name} (${item.header}): ${typeof(item.price) === 'string' ? item.price : priceundefined}`}</p>
                    )
                }</div>
                {
                    total(cells)
                }
            </> : <></>
            }
        </div>

        <FloatingButton/>
        <Footer color='#000' backgroundColor='#b2afafff' copyrigth='Webpage created by GuilleNH' copyrightHref={credits}/>
    </>

}
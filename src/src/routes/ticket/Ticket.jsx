import { Link, useNavigate } from 'react-router-dom'

import useData from "../../hooks/useData";
import useCells from "../../hooks/useCells";
import { ticketParams } from '../../hooks/useTables'

import Header from '../../components/header/Header'
import Footer from '../../components/footer/Footer'
import FloatingButton from '../../components/floatingbutton/FloatingButton'
import Dialog from '../../components/dialog/Dialog'

import styles from './Ticket.module.css'
import logo from '../../assets/images/logo.png'
import logo2 from '../../assets/icons/logo.png'

import { credits, priceundefined } from '../../data/references.json'
import { title } from '../../data/client-info.json'
import { useState } from 'react';

const total = (cells) => {
    try {
        let total = 0;
        cells.items.forEach(item => {
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

    const [ dialog, setDialog ] = useState()

    const data = useData()
    
    const cells = useCells()
    console.log(cells)

    const navigate = useNavigate()

    const handleQuery = () => {
        const params = ticketParams()
        const fullUrl = window.location.href
        const link = encodeURIComponent(fullUrl.split('?')[0] + params)
        window.open(data.contactlink + "?text=Hola, quiero consultar por este producto: \n\r" + link, "_blank")
    }

    const handleBack = () => navigate('/', { replace:true })

    const handleEmptyCart = () => {
        setDialog(<Dialog
            title={"¿Estás seguro de que querés vaciar tu carrito?"}
            onReject={() => setDialog(null)}
            onAccept={() => {
                sessionStorage.clear()
                setDialog(null)
                handleBack()
                window.location.reload()
            }}
        />)
    }

    return <>
        <Header 
            pageName={title}
            colorOnScroll='#1f1f1fff'
            logo={logo2}
            changeBackgroundOnScroll={true}>
            <Link to="/about"> Nosotros </Link>
            <Link to="/contact"> Contacto </Link>
        </Header>

        {dialog}
        
        <div className={styles.logo}>
            <img src={logo}/>
        </div>

        <div className={styles.ticket}>
            { cells ? <>
                <div className={styles.title}> <p>Ticket</p> </div>
                <hr/>
                <div className={styles.items}>{
                    cells.items.map((item, index) => <div key={index} >
                            <p 
                                id={cells.keys[index]}
                                className={styles.item}
                            >{`${item.name} (${item.header}): ${typeof(item.price) === 'string' ? item.price : priceundefined}`}</p>
                        </div>
                    )
                }</div>
                {
                    total(cells)
                }
            </> : <></>
            }
        </div>

        <div className={styles.button}>
            <button onClick={handleQuery}>Consultar</button>
        </div>

        <div className={styles.button} style={{display: cells?.params?.length > 0 ? 'none' : 'grid'}}>
            <button onClick={handleEmptyCart}>Vaciar carrito</button>
        </div>

        <div className={styles.button}>
            <button onClick={handleBack}>Volver</button>
        </div>

        <FloatingButton/>
        <Footer color='#000' backgroundColor='#b2afafff' copyrigth='Webpage created by GuilleNH' copyrightHref={credits}/>
    </>

}
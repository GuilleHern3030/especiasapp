import img from '../../assets/icons/whatsapp-icon.webp'
import styles from './FloatingButton.module.css'
import useData from '../../hooks/useData'
import { ticketParams } from '../../hooks/useSelection'

export default function FloatingButton() {

    const data = useData()

    const handleFloatingButton = () => {
        const params = ticketParams()
        const fullUrl = window.location.href
        const link = encodeURIComponent(fullUrl + "/ticket" + params)
        
        window.open(data.contactlink + "?text=Hola, quiero consultar por este producto: \n\r" + link, "_blank")
    }

    return <div className={styles.floatingbutton} onClick={handleFloatingButton}>
        <img src={img}/>
    </div>

}
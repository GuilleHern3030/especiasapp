import img from '../../assets/icons/whatsapp-icon.webp'
import styles from './FloatingButton.module.css'
import useData from '../../hooks/useData'

export default function FloatingButton() {

    const data = useData()

    const handleFloatingButton = () => 
        window.open(data.contactlink, "_blank")

    return <div className={styles.floatingbutton} onClick={handleFloatingButton}>
        <img src={img}/>
    </div>

}
import img from '../../assets/icons/whatsapp-icon.webp'
import styles from './FloatingButton.module.css'
import useContactLink from '../../hooks/useContactLink'

export default function FloatingButton() {
    return <div className={styles.floatingbutton} onClick={useContactLink}>
        <img src={img}/>
    </div>

}
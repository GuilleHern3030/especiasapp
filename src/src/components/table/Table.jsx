import useTables from '../../hooks/useTables'
import styles from './Table.module.css'

import Tabs from './tabs/Tabs'
import Content from './content/Content'
import useSelection from '../../hooks/useSelection'

export default function Table() {

    const { tabSelected } = useTables()

    return <> 
        { tabSelected != undefined ?
            <>
                <Tabs/>
                <Content/>
            </> : <></>
        }
    </>
}
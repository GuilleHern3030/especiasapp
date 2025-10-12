import useTables from '../../hooks/useTables'

import Tabs from './tabs/Tabs'
import Content from './content/Content'

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
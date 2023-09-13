import Breadcrumbs from 'src/Components/Breadcrumbs/Breadcrumbs'
import WorkersTable from './Components/WorkersTable/WorkersTable'

import { RouterNames } from 'src/router'

import './WorkersPage.scss'

const WorkersPage = () => {
    return (
        <div>
            <Breadcrumbs text='Workers' link={RouterNames.WORKERS} />
            <WorkersTable />
        </div>
    )
}

export default WorkersPage

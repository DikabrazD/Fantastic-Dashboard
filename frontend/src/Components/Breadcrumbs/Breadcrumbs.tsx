import { BreadcrumbsInterface } from './BreadcrumbsInterface'
import { Link } from 'react-router-dom'
import { RouterNames } from 'src/router'

import './Breadcrumbs.scss'

const Breadcrumbs = ({ text, link }: BreadcrumbsInterface) => {
    return (
        <ul className='breadcrumbs'>
            <h2 className='breadcrumbs-header'>{text}</h2>
            <div className='breadcrumbs-list'>
                <li className='breadcrumbs-list-item'>
                    <Link to={RouterNames.DEFAULT}>Home</Link>
                </li>
                <li className='breadcrumbs-list-divider'>/</li>
                <li className='breadcrumbs-list-item'>
                    <Link to={link}>{text}</Link>
                </li>
            </div>
        </ul>
    )
}

export default Breadcrumbs

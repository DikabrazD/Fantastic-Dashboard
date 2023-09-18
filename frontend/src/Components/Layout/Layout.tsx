import { PropsWithChildren } from 'react'

import { FaHome, FaLayerGroup, FaUsers, FaSignOutAlt } from 'react-icons/fa'

import './Layout.scss'
import { Link } from 'react-router-dom'
import { RouterNames } from 'src/router'

const Layout = ({ children }: PropsWithChildren) => {
    return (
        <div className='layout'>
            <nav className='layout-nav'>
                <div className='layout-nav-logo'>
                    <img
                        className='image'
                        src='https://fantastic-english.md/wp-content/uploads/2021/06/Logo-White-Homepage-desktop-e1607166771985_result.webp'
                        alt='logo'
                    />
                </div>
                <ul className='layout-nav-routes'>
                    <Link to={RouterNames.HOME} className='layout-nav-routes-item'>
                        <div className='layout-nav-routes-item-icon'>
                            <FaHome className='image' />
                        </div>
                        <span>Dashboard</span>
                    </Link>
                    <Link to={RouterNames.COURSES} className='layout-nav-routes-item'>
                        <div className='layout-nav-routes-item-icon'>
                            <FaLayerGroup className='image' />
                        </div>
                        <span>Courses</span>
                    </Link>
                    <Link to={RouterNames.WORKERS} className='layout-nav-routes-item'>
                        <div className='layout-nav-routes-item-icon'>
                            <FaUsers className='image' />
                        </div>
                        <span>Workers</span>
                    </Link>
                </ul>
                <Link to={'/auth'} className='layout-nav-logout'>
                    <div className='layout-nav-logout-icon'>
                        <FaSignOutAlt className='image' />
                    </div>
                    <span>Log Out</span>
                </Link>
            </nav>
            <div className='layout-main'>{children}</div>
        </div>
    )
}

export default Layout

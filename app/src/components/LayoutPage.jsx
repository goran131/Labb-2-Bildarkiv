import { Link, useLocation } from 'react-router-dom'
import { useContext } from 'react'
import { ImagegroupsContext } from './Context'

const LayoutPage = () => {
    const value = useContext(ImagegroupsContext)

    const groupPageUrl = '/components/ImageGroupPage/'

    return (
        <>
            <Link to="/" state={value.imagegroups}>
                <h1 className="header">Bildarkiv</h1>
            </Link>

            <div>
                <ul>
                    {value.imagegroups.map((group) => (
                        <li key={group.id}>
                            <Link
                                to={groupPageUrl + group.id}
                                state={value.imagegroups}
                            >
                                {group.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>

            <Link className="link-color" to="/components/NewGroupPage">
                <button>Skapa ny bildgrupp</button>
            </Link>
        </>
    )
}

export default LayoutPage

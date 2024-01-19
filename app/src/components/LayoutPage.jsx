import { Link, useLocation } from 'react-router-dom'

const LayoutPage = () => {
    const location = useLocation()
    const imagegroups = location.state
    const groupPageUrl = '/components/ImageGroupPage/'

    return (
        <>
            <Link to="/" state={imagegroups}>
                <h1 className="header">Bildarkiv</h1>
            </Link>

            <div>
                <ul>
                    {imagegroups.map((group) => (
                        <li key={group.id}>
                            <Link
                                to={groupPageUrl + group.id}
                                state={imagegroups}
                            >
                                {group.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>

            <button>
                <Link
                    className="link-color"
                    to="/components/NewGroupPage"
                    state={imagegroups}
                >
                    Skapa ny bildgrupp
                </Link>
            </button>
        </>
    )
}

export default LayoutPage

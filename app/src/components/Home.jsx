import { Link, useLocation } from 'react-router-dom'
import PropTypes from 'prop-types'

function Home(props) {
    const location = useLocation()
    const groupsState = location.state
    let imagegroups = []

    if (groupsState != null && props.imagegroups.length != groupsState.length) {
        imagegroups = groupsState
    } else {
        imagegroups = props.imagegroups
    }

    return (
        <>
            <div>
                <Link to="/" state={imagegroups}>
                    <h1 className="header">Bildarkiv</h1>
                </Link>

                <div>
                    <p>Här kan du lägga upp dina bilder grupperade i grupper</p>
                    <br />
                    <button>
                        <Link
                            className="link-color"
                            to="/components/LayoutPage"
                            state={imagegroups}
                        >
                            Visa bildarkiv
                        </Link>
                    </button>
                </div>
            </div>
        </>
    )
}

Home.propTypes = { imagegroups: PropTypes.array }

export default Home

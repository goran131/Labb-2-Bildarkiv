import { useContext } from 'react'
import { Link } from 'react-router-dom'
import BackgroundColor from './BackgroundColor.jsx'

function Home() {
    return (
        <>
            <Link to="/">
                <h1 className="header">Bildarkiv</h1>
            </Link>

            <div>
                <p>Här kan du lägga upp dina bilder grupperade i grupper</p>
                <br />

                <Link className="link-color" to="/components/LayoutPage">
                    <button>Visa bildarkiv</button>
                </Link>

                <BackgroundColor />
            </div>
        </>
    )
}

export default Home

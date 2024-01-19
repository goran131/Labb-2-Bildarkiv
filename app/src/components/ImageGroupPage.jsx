/** import { useState, useEffect } from 'react' */
import ImagePopup from './ImagePopup'
import { useParams, useLocation, Link } from 'react-router-dom'
import 'reactjs-popup/dist/index.css'

function ImageGroupPage() {
    const { id } = useParams()
    const location = useLocation()
    const imagegroups = location.state

    let currentGroupArray = imagegroups.filter((group) => group.id == id)
    let currentGroup = currentGroupArray[0]

    return (
        <>
            <Link to="/" state={imagegroups}>
                <h1 className="header">Bildarkiv</h1>
            </Link>

            <div>
                <Link to="/components/LayoutPage" state={imagegroups}>
                    Tillbaka
                </Link>
            </div>
            <h2>{currentGroup.name}</h2>
            <p>{currentGroup.description}</p>
            <br />
            <div className="outer-image-box">
                {currentGroup.images.map((image) => (
                    <div key={image.id} className="image-box">
                        <ImagePopup image={image} />
                        <p>{image.imageDescription}</p>
                    </div>
                ))}
            </div>
        </>
    )
}

export default ImageGroupPage

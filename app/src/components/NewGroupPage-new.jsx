import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'
import css from './newgrouppage.module.css'

const NewGroupPage = () => {
    const location = useLocation()
    const groups = location.state

    let [imagegroups, setImagegroups] = useState(groups)

    const CreateNewGroup = (event) => {
        event.preventDefault()
        let groupID = imagegroups.length
        let groupName = event.target.groupName.value
        let groupDescription = event.target.description.value
        let images = [
            {
                id: 0,
                imageUrl: URL.createObjectURL(event.target.imageFile.files[0]),
                imageDescription: event.target.imageDescription.value
            }
        ]

        let newImagegroup = {
            id: groupID,
            name: groupName,
            description: groupDescription,
            images: images
        }

        let newImagegroups = [...imagegroups, newImagegroup]

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newImagegroup)
        }

        fetch('http://localhost:5030/groups', requestOptions).then(
            (response) => {
                if (response.ok) {
                    alert('Ny grupp sparad')
                    setImagegroups(newImagegroups)
                } else {
                    console.error('Något gick fel vid spara grupp')
                }
            }
        )
    }

    return (
        <>
            <Link to="/" state={imagegroups}>
                <h1 className="header">Bildarkiv</h1>
            </Link>
            <h2>Ny bildgrupp</h2>

            <div>
                <form onSubmit={CreateNewGroup}>
                    <div>
                        <label>Gruppnamn</label>
                        <input
                            type="text"
                            name="groupName"
                            className={css.textInput}
                        ></input>
                    </div>
                    <div>
                        <label>Beskrivning </label>
                        <input
                            type="text"
                            name="description"
                            className={css.textInput}
                        ></input>
                    </div>
                    <h4>Ladda upp bild</h4>
                    <div>
                        <label>Beskrivning:</label>
                        <input
                            type="text"
                            name="imageDescription"
                            className={css.textInput}
                        ></input>
                        <div></div>
                        <input type="file" name="imageFile"></input>
                    </div>
                    <br />
                    <br />
                    <button type="submit">Spara bildgrupp</button>
                </form>
            </div>
            <br />
            <div>
                <Link to="/components/LayoutPage" state={imagegroups}>
                    Tillbaka
                </Link>
            </div>
        </>
    )
}

export default NewGroupPage

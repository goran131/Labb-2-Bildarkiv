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
        let newImagegroup = {
            id: groupID,
            name: groupName,
            description: groupDescription,
            images: []
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

        document.querySelector('#uploadForm').classList.remove('notVisible')
        document.querySelector('#uploadForm').classList.add('visible')
    }

    const saveImage = (event) => {
        event.preventDefault()
        let groupID = imagegroups.length - 1
        let imageUrl = URL.createObjectURL(event.target.imageFile.files[0])
        let imageDescription = event.target.imageDescription.value

        let imagegroup = imagegroups.slice(groupID)
        imagegroup = imagegroup[0]
        imagegroup.images = {
            id: 0,
            imageUrl: imageUrl,
            imageDescription: imageDescription
        }

        let newImagegroups = imagegroups
        newImagegroups.splice(groupID, 1, imagegroup)

        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(imagegroup)
        }

        fetch(
            'http://localhost:5030/groups?id=' + groupID,
            requestOptions
        ).then((response) => {
            if (response.ok) {
                alert('Ny bild sparad')
                setImagegroups(newImagegroups)
            } else {
                console.error('Något gick fel vid spara bild')
            }
        })

        /**
        const deleteOptions = { method: 'DELETE' }

        fetch('http://localhost:5030/groups?id=' + groupID, deleteOptions).
            then(() => {
                const requestOptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(newImagegroups)
                }

                fetch('http://localhost:5030/groups', requestOptions).then(
                    (response) => {
                        if (response.ok) {
                            alert('Ny bild sparad')
                            setImagegroups(newImagegroups)
                        } else {
                            console.error('Något gick fel vid spara bild')
                        }
                    }
                )
            })
        */
    }

    return (
        <>
            <Link to="/" state={imagegroups}>
                <h1 className="header">Bildarkiv</h1>
            </Link>
            <h3>Ny bildgrupp</h3>

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
                    <br />
                    <button type="submit">Spara bildgrupp</button>
                </form>

                <form
                    id="uploadForm"
                    onSubmit={saveImage}
                    className="notVisible"
                >
                    <br />
                    <br />
                    <h3>Ladda upp bilder</h3>
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
                    <button type="submit">Spara bild</button>
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

import { Link } from 'react-router-dom'
import { useContext, useRef } from 'react'
import css from './newgrouppage.module.css'
import { ImagegroupsContext } from './Context'

const NewGroupPage = () => {
    const contextValue = useContext(ImagegroupsContext)
    const imagegroups = contextValue.imagegroups
    let images = []

    const submitButton = useRef(null)
    const resetButton = useRef(null)
    const groupName = useRef(null)
    const groupDescription = useRef(null)
    const imageDescription = useRef(null)
    const imageFile = useRef(null)
    const uploadedImagesDiv = useRef(null)
    const resetImageUploadButton = useRef(null)

    const CreateNewGroup = (event) => {
        event.preventDefault()
        let groupID = imagegroups.length
        let groupName = event.target.groupName.value
        let groupDescription = event.target.description.value

        let imagegroup = {
            id: groupID,
            name: groupName,
            description: groupDescription,
            images: images
        }

        let newImagegroups = [...imagegroups, imagegroup]

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(imagegroup)
        }

        fetch('http://localhost:5030/groups', requestOptions).then(
            (response) => {
                if (response.ok) {
                    alert('Ny grupp sparad')
                    contextValue.setImagegroups(newImagegroups)
                    resetButton.current.style.display = 'inline'
                    submitButton.current.disabled = true
                } else {
                    console.error('Något gick fel vid spara grupp')
                }
            }
        )
    }

    const handleUpload = () => {
        let imageID = images.length
        let image = [
            {
                id: imageID,
                imageUrl: URL.createObjectURL(imageFile.current.files[imageID]),
                filename: imageFile.current.files[imageID].name,
                imageDescription: imageDescription.current.value
            }
        ]

        images = [...images, image]

        for (let i = 0; i < i++; images.length) {
            uploadedImagesDiv.current.innerHtml =
                uploadedImagesDiv.current.innerHtml +
                '<p>Beskrivning: ' +
                images[i].imageDescription +
                '</p><p>Filnamn: ' +
                images[i].filename +
                '</p><br/>'
        }

        // uploadImage() fungerar inte. Vilket innebär att bilden bara finns kvar i denna sessionen
        // uploadImage(imageFile.files[0])

        setTimeout(() => {
            resetImageUploadButton.current.style.display = 'inline'
        }, 800)
    }

    const resetImageUpload = () => {
        imageDescription.current.value = ''
        imageFile.current.value = ''
        resetImageUploadButton.current.style.display = 'none'
    }

    const resetPage = () => {
        // location.reload() går inte att använda eftersom bilden från förra gruppen försvinner
        // Nollställer elementen manuellt istället
        groupName.current.value = ''
        groupDescription.current.value = ''
        imageDescription.current.value = ''
        imageFile.current.value = ''
        resetButton.current.style.display = 'none'
        submitButton.current.disabled = false
    }

    /**
    const uploadImage = async (imageFile) => {
        const formData = new FormData()
        formData.append('file', imageFile)

        try {
            const result = await fetch('../public/images', {
                method: 'POST',
                body: formData
            })

            await result.json()
        } catch (error) {
            console.error(error)
        }
    }
    */

    return (
        <>
            <Link to="/">
                <h1 className="header">Bildarkiv</h1>
            </Link>

            <form onSubmit={CreateNewGroup}>
                <div className={css.groupSectionBox}>
                    <h2>Ny bildgrupp</h2>
                    <div>
                        <label>Gruppnamn</label>
                        <input
                            ref={groupName}
                            type="text"
                            name="groupName"
                            className={css.textInput}
                        ></input>
                    </div>
                    <div>
                        <label>Beskrivning </label>
                        <input
                            ref={groupDescription}
                            type="text"
                            name="description"
                            className={css.textInput}
                        ></input>
                    </div>
                </div>

                <div className={css.imageSectionBox}>
                    <h4>Ladda upp bild</h4>

                    <div>
                        <label>Beskrivning:</label>
                        <input
                            ref={imageDescription}
                            type="text"
                            name="imageDescription"
                            className={css.textInput}
                        ></input>
                    </div>
                    <div>
                        <input
                            ref={imageFile}
                            type="file"
                            name="imageFile"
                            onClick={handleUpload}
                        ></input>
                    </div>
                    <div ref={uploadedImagesDiv}></div>
                    <br />
                    <br />
                    <div>
                        <button
                            ref={resetImageUploadButton}
                            type="button"
                            onClick={resetImageUpload}
                            className="notVisible"
                        >
                            Ladda upp fler bilder
                        </button>
                    </div>
                </div>
                <div>
                    <button type="submit" ref={submitButton}>
                        Spara bildgrupp
                    </button>
                    <br />
                    <br />
                    <button
                        ref={resetButton}
                        type="button"
                        onClick={resetPage}
                        className="notVisible"
                    >
                        Skapa fler bildgrupper
                    </button>
                </div>
            </form>

            <br />
            <div>
                <Link to="/components/LayoutPage">Tillbaka</Link>
            </div>
        </>
    )
}

export default NewGroupPage

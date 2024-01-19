import { useLocation } from 'react-router-dom'

const AddImagePage = () => {
    const location = useLocation()
    const imagegroups = location.state

    const createNewGroup = (e) => {
        e.preventDefault()
        alert('Hejsan')
    }

    const handleFileChange = (e) => {
        e.preventDefault()
        alert('Hejsan')
    }

    return (
        <>
            <div>Lägg till bild</div>
            <div>
                <form onSubmit={createNewGroup}>
                    <div>
                        <label>Beskrivning</label>
                        <input type="text"></input>
                    </div>
                    <div>
                        <label>Ladda upp bild</label>
                        <input
                            id="file"
                            type="file"
                            onChange={handleFileChange}
                        />
                    </div>
                    <button type="submit">Spara bildgrupp</button>
                </form>
            </div>
        </>
    )
}

export default AddImagePage

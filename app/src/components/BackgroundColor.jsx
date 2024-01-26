function BackgroundColor() {
    const SelectBgColor = (event) => {
        let selectedColor = {
            bgColor: event.target.bgColorSelector.selectedOptions[0].value
        }

        // Använder PoST eftersom jag inte fått PUT att fungera. Nackdelen är att det
        // läggs till en ny post i JSON-filen varje gång man ändrar bakgrundsfärg.
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(selectedColor)
        }

        fetch('http://localhost:5030/backgroundColor', requestOptions).then(
            (response) => {
                if (response.ok) {
                    document.querySelector('body').style.backgroundColor =
                        selectedColor.bgColor
                } else {
                    console.error('Något gick fel vid byte av bakgrundsfärg')
                }
            }
        )
    }

    return (
        <form onSubmit={SelectBgColor}>
            <div className="bgColorContainer">
                <p>Byt bakgrundsfärg</p>
                <select name="bgColorSelector">
                    <option value="white">Vit (default)</option>
                    <option value="#ffff90">Ljusgul</option>
                    <option value="#F4C3B8">Rosa</option>
                </select>
                <button type="submit">Spara</button>
            </div>
        </form>
    )
}

export default BackgroundColor

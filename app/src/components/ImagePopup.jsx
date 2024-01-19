import Popup from 'reactjs-popup'

const ImagePopup = ({ image }) => {
    return (
        <Popup trigger={<img src={image.imageUrl} className="image" />} modal>
            {(close) => (
                <div className="image-popup">
                    <button className="close-popup" onClick={close}>
                        &times;
                    </button>
                    <img src={image.imageUrl} className="big-image" />
                </div>
            )}
        </Popup>
    )
}

export default ImagePopup

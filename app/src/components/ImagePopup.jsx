import Popup from 'reactjs-popup'
import PropTypes from 'prop-types'
import style from 'styled-jsx'

const ImagePopup = ({ image }) => {
    return (
        <>
            <style jsx>
                {`
                    .image {
                        width: 100%;
                        height: auto;
                        cursor: pointer;
                    }

                    .big-image {
                        width: 100%;
                    }

                    .image-popup .close-popup {
                        cursor: pointer;
                        position: absolute;
                        display: block;
                        padding: 4px 8px 8px;
                        line-height: 20px;
                        right: -14px;
                        top: -14px;
                        font-size: 26px;
                        background: #ffffff;
                        border-radius: 18px;
                        border: 1px solid #cfcece;
                    }

                    .popup-content {
                        padding-bottom: 0 !important;
                        max-width: 650px;
                    }

                    @media screen and (max-width: 1300px) {
                        .popup-content {
                            width: 60% !important;
                        }
                    }

                    @media screen and (max-width: 900px) {
                        .image-box {
                            padding: 10px 0;
                        }

                        .popup-content {
                            width: 75% !important;
                        }
                    }

                    @media screen and (max-width: 710px) {
                        .popup-content {
                            margin: auto 15px !important;
                            width: 100% !important;
                        }
                    }
                `}
            </style>
            <Popup
                trigger={<img src={image.imageUrl} className="image" />}
                modal
            >
                {(close) => (
                    <div className="image-popup">
                        <button className="close-popup" onClick={close}>
                            &times;
                        </button>
                        <img src={image.imageUrl} className="big-image" />
                    </div>
                )}
            </Popup>
        </>
    )
}

ImagePopup.propTypes = { image: PropTypes.object }

export default ImagePopup

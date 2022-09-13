import React from 'react';
import './style.css';
const Popup = (props) =>  {

        return (

            <div className='popup'>
                <div className='popup_open'>
                    <button className="popup-close-button" onClick={props.closePopup}>X</button>

                    {props.films.length > 0 ?
                        props.films.map((item)=> {
                                return (
                                    <h2 className="popup-info" key={item.url}>{item.title}</h2>
                                )
                            }):
                        <div>Loading...</div>}
                </div>
            </div>
        );

}
export default Popup;


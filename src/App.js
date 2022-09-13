import './App.css';
import {useEffect, useState} from "react";
import Popup from "./components/Popup";

function App() {
    const [data, setData] = useState([]);
    const [popUp, setPopup] = useState(false);
    const [films, setFilms] = useState([]);
    const [page, setPage] = useState(1)



    useEffect(() => {
        fetch(`https://swapi.dev/api/people/?page=${page}`)
            .then(response => response.json())
            .then(data => setData(data.results))
    },[page])

    const showFilms = async (movies) => {
        setPopup(true)
        let res =  await Promise.all(movies.map((item)=> {
        return  fetch(item).then(res=> res.json().then(data=> data))
        }))

     setFilms(res)

    }

const getNextPage = () => {
        setPage(page+1)
}
    const getPrevPage = () => {
        setPage(page-1)
    }
    const closePopUp = () => {
        setPopup(false)
    }
    if (data) {

        return <div className="container">
            {data.map((item)=> {
                return (
                    <div key={item.name} className="card">
                        <div className="title">
                            <h1>{item.name}</h1>
                            <div className="content">
                                <div className="content-overlay"></div>
                                <div className="content-details fadeIn-top">
                                    <button className="movies-button" onClick={()=>showFilms(item.films)}>Films</button>
                                    <h3>height: {item.height}</h3>
                                    <h3>gender: {item.gender}</h3>
                                    <h3>eye color: {item.eye_color}</h3>
                                </div>
                            </div>
                        </div>
                        <div className="content">
                            <div className="social">
                                <i className="fas fa-globe-europe"></i>
                            </div>
                        </div>
                        <div className="circle"></div>
                    </div>
                )
            })}


            {popUp ?
                <Popup
                    films={films}
                    closePopup={closePopUp}
                />
                : null
            }
     <div style={{textAlign : "center"}}>
    <button  className="change-page-button" onClick={getPrevPage} disabled={page === 1}>{"<<"}</button>
    <span style={{margin : "10px", fontSize : "20px"}}>{page}</span>
    <button  className="change-page-button" onClick={getNextPage}>{">>"}</button>
     </div>


        </div>

    } else {
        return null;
    }


}

export default App;

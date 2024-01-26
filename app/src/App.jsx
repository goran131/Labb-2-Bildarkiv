import './App.css'
import { Routes, Route } from 'react-router-dom'
import { useState, useEffect, useReducer } from 'react'
import Home from './components/Home'
import LayoutPage from './components/LayoutPage'
import ImageGroupPage from './components/ImageGroupPage'
import NewGroupPage from './components/NewGroupPage'
import { ImagegroupsContext } from './components/Context'

function App() {
    const [imagegroups, setImagegroups] = useState([])

    useEffect(() => {
        fetch('http://localhost:5030/groups')
            .then((response) => response.json())
            .then((imagegroups) => setImagegroups(imagegroups))
    }, [])

    const reducer = (bgColor, action) => {
        switch (action.type) {
            case 'backgroundColor':
                return action.bgColorValue
            default:
                return action
        }
    }

    // Jag är medveten om att användandet av useReducer på detta sättet är helt meningslöst,
    // useState funkar lika bra. Det finns ju bara ett altenativ i switch satsen. Men jag
    //  kunde inte komma på något lämpligt scenario för useReducer
    const [bgColor, dispatch] = useReducer(reducer, 'white')

    useEffect(() => {
        fetch('http://localhost:5030/backgroundColor')
            .then((response) => response.json())
            .then((bgColorArray) => SetBgColor(bgColorArray))
    }, [])

    const SetBgColor = (bgColorArray) => {
        const index = bgColorArray.length - 1 // Nödlösning eftersom det läggs till en ny post i json-filen varje gång man ändrar bakgrundsfärg.

        dispatch({
            type: 'backgroundColor',
            bgColorValue: bgColorArray[index].bgColor
        })

        document.querySelector('body').style.backgroundColor =
            bgColorArray[index].bgColor
    }

    return (
        <>
            <ImagegroupsContext.Provider
                value={{ imagegroups, setImagegroups }}
            >
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route
                        path="/components/LayoutPage"
                        element={<LayoutPage />}
                    />
                    <Route
                        path="/components/ImageGroupPage/:id"
                        element={<ImageGroupPage />}
                    />
                    <Route
                        path="/components/NewGroupPage"
                        element={<NewGroupPage />}
                    />
                </Routes>
            </ImagegroupsContext.Provider>
        </>
    )
}

export default App

import './App.css'
import Home from './components/Home'
import LayoutPage from './components/LayoutPage'
import ImageGroupPage from './components/ImageGroupPage'
import NewGroupPage from './components/NewGroupPage'
import { Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'

function App() {
    // Jag har inte fått detta att fungera, därför har jag hårdkodat imagegroups nedanför.

    const [imagegroups, setImagegroups] = useState([])

    useEffect(() => {
        fetch('http://localhost:5030/groups')
            .then((response) => response.json())
            .then((imagegroups) => setImagegroups(imagegroups))
    }, [])

    return (
        <>
            <Routes>
                <Route path="/" element={<Home imagegroups={imagegroups} />} />
                <Route path="/components/LayoutPage" element={<LayoutPage />} />
                <Route
                    path="/components/ImageGroupPage/:id"
                    element={<ImageGroupPage />}
                />
                <Route
                    path="/components/NewGroupPage"
                    element={<NewGroupPage />}
                />
            </Routes>
        </>
    )
}

export default App

/**
    const groups = [
        {
            id: 0,
            name: 'Familj',
            description: 'Mina familjemedlemmar',
            images: [
                {
                    id: 0,
                    imageUrl: '/images/kalle.jpg',
                    imageDescription: 'Jag Kalle'
                },
                {
                    id: 1,
                    imageUrl: '/images/father.jpg',
                    imageDescription: 'Min far'
                },
                {
                    id: 2,
                    imageUrl: '/images/mother.jpg',
                    imageDescription: 'Min mor'
                },
                {
                    id: 3,
                    imageUrl: '/images/brother.jpg',
                    imageDescription: 'Min bror'
                },
                {
                    id: 4,
                    imageUrl: '/images/sister.jpg',
                    imageDescription: 'Min syster'
                },
                {
                    id: 5,
                    imageUrl: '/images/sister-daughter.jpg',
                    imageDescription: 'Min systerdotter'
                }
            ]
        },
        {
            id: 1,
            name: 'Mina bilar',
            description: 'Mina bilar',
            images: [
                {
                    id: 0,
                    imageUrl: '/images/austin-mini-cooper-970s.webp',
                    imageDescription:
                        'Min första bil var en Austin Mini Cooper 970S från 1965.'
                },
                {
                    id: 1,
                    imageUrl: '/images/ferrari-308-gts.webp',
                    imageDescription:
                        'Min andra bil var en Ferrari 308 GTS QV från 1984. Gissa vem som har kört den innan.'
                },
                {
                    id: 2,
                    imageUrl: '/images/mercedes-amg-gt.jpg',
                    imageDescription:
                        'Min tredje bil en Mercedes-AMG GT Coupé från 2023.'
                }
            ]
        },
        {
            id: 2,
            name: 'Paris 2016',
            description: 'Semesterresa till Paris år 2016',
            images: [
                {
                    id: 0,
                    imageUrl: '/images/eiffeltornet-2.jpg',
                    imageDescription: 'Jag framför Eiffeltornet'
                },
                {
                    id: 1,
                    imageUrl: '/images/triumfbågen-paris.jpg',
                    imageDescription: 'Jag framför Triumfbågen'
                },
                {
                    id: 2,
                    imageUrl: '/images/versailles.jpg',
                    imageDescription: 'Pappa och jag framför Versailles'
                }
            ]
        }
    ]

    useEffect(() => {
        setImagegroups(groups)
    }, [])
     */

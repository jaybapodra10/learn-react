import List from "../components/List"
import AddUser from "../components/AddUser"
import ViewUser from "../components/ViewUser"
import EditUser from "../components/EditUser"

import {BrowserRouter, Routes, Route} from 'react-router-dom'

function Home() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<List />} />
                <Route path="/add-user" element={<AddUser />} />
                <Route path="/view-user/:id" element={<ViewUser />} />
                <Route path="/edit-user/:id" element={<EditUser />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Home
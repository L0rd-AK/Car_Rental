import { createBrowserRouter } from "react-router-dom";
import Root from "../layout/Root";
import Home from "../pages/home/Home";

const Route = createBrowserRouter([
    {
path:"/",
element:<Root/>,
errorElement:<h1>Something went wrong!</h1>,
children:[
    {
        path:"/",
        element:<Home/>
    }
]
    }
])

export default Route;
import { createBrowserRouter } from "react-router-dom";
import Root from "../layout/Root";

const Route = createBrowserRouter([
    {
path:"/",
element:<Root/>,
errorElement:<h1>Something went wrong!</h1>,
children:[
    {
        path:"/",
        // element:<Home/>
    }
]
    }
])

export default Route;
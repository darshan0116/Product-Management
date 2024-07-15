import { RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import './styles/app.scss';
import router from "./Router";


function App() {
  return (
    <>
    <RouterProvider router={router} />

    <Toaster
        position="top-right"
        containerStyle={
          {
            marginTop: "34px"
          }
        }
        toastOptions={{
          success: {
            style: {
              background: 'green',
              color: 'white',
            },
          },
          error: {
            style: {
              background: 'red',
              color: 'white'
            },
          },
        }}
      />
    </>
  );
}

export default App;

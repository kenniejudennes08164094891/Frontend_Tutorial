import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { platformTypeDropdown } from "../utils/stores";
import { RecentTable } from "./dasboard";
import { setRecord } from "../services/transmitters";
import { referenceVariableEnums } from "../utils/stores";

// LifeCycle Hooks in React: 
// useState: Helps store the dataType of a variable

// The Independent method
// function Login() {
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [plaformType, setPlatformType] = useState("");
//     const [isLoggedIn, setIsLoggedIn] = useState(false);

//     const platFormSelect = platformTypeDropdown;


//     const handleSubmit = (e) => {
//         e.preventDefault();
//         const result = {
//             email:email,
//             password:password,
//             plaformType:plaformType,
//             isLoggedIn: isLoggedIn
//         };

//         console.log("result>>",result);
//     }

//     return (
//         <>
//             <div className="min-h-screen flex items-center justify-center bg-blue-700 px-4">
//                 <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-lg">
//                     <h2 className="text-2xl font-bold text-center mb-6">Login to Your Account</h2>
//                     <form className="space-y-6">
//                         <div>
//                             <label for="email" className="block text-sm font-medium text-gray-700">Email</label>
//                             <input
//                                 id="email"
//                                 name="email"
//                                 type="email"
//                                 value={email}
//                                 onChange={(event) => setEmail(event.target.value)}
//                                 required
//                                 className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                             />
//                         </div>

//                         <div>
//                             <label for="password" className="block text-sm font-medium text-gray-700">Password</label>
//                             <input
//                                 id="password"
//                                 name="password"
//                                 type="password"
//                                 value={password}
//                                 onChange={(event) => setPassword(event.target.value)}
//                                 required
//                                 className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                             />
//                         </div>

//                         <div>

//                             <form className="max-w-sm mx-auto">
//                                 <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900">Select an option</label>
//                                 <select id="countries" value={plaformType}  onChange={(event) => setPlatformType(event.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
//                                     <option selected>Select PlaformType</option>
//                                     {
//                                         platFormSelect.map((item) => (
//                                             <>
//                                                 <option value={item.value}>{item.description}</option>
//                                             </>
//                                         ))
//                                     }
//                                 </select>
//                             </form>

//                         </div>

//                         <div className="flex items-center">
//                             <input
//                                 id="remember_me"
//                                 name="remember_me"
//                                 type="checkbox"
//                                 value={isLoggedIn}
//                                  onChange={(event) => setIsLoggedIn(event.target.checked)}
//                                 className="h-4 w-4 text-blue-600 border-gray-300 rounded"
//                             />
//                             <label for="remember_me" className="ml-2 block text-sm text-gray-700">
//                                 Keep me logged in
//                             </label>
//                         </div>

//                         <div>
//                             <button
//                                 type="submit" onClick={handleSubmit}
//                                 className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-xl transition duration-200"
//                             >
//                                 Sign In
//                             </button>
//                         </div>
//                     </form>
//                 </div>
//             </div>

//         </>
//     )
// }


// The Object-destructuring method
function Login() {

    const navigate = useNavigate()  // useNavigate is used for routing from page to page

    const [loginText, setLoginText] = useState("sign in");
    let [loginProps, setLoginProps] = useState({
        email: "",
        password: "",
        plaformType: "",
        isLoggedIn: false
    })

    // destructure the state
    const { email, password, plaformType, isLoggedIn } = loginProps;

    const platFormSelect = platformTypeDropdown;

    const handleChange = (event) => {
        setLoginProps({
            ...loginProps,
            [event.target.name?.trim()]: event.target.name === 'isLoggedIn' ? event.target.checked : event.target.value,
        });
    }

    // loginIsFilled helps check if the entire form is filled.
    async function loginIsFilled(loginProps) {
        let isFormFilled = true;
        for (const key in loginProps) {
            if (typeof (loginProps[key]) === "string" && loginProps[key] === "") {
                isFormFilled = false;
            } else if (typeof (loginProps[key]) === "boolean" && loginProps[key] === false) {
                isFormFilled = false;
            } else {
                isFormFilled = true;
            }
        }

        return isFormFilled;
    }

    // Methods in React used to transfer data from one page to another page
    //Local Storage...is the browser storage found in the Application tab after page inspect. It stores data without dependence on whether the browser is active or not.
    //Session Storage...is the browser storage found in the Application tab after page inspect. It stores data temporarily while the broser tab is active.
    //Index DB
    //Props...is a special way of inheritance such that components can be declared in other components using specific variables common between the two components.
    //React Context: useNavigate, useLocation, useContext
    //State Manenagement: Rxjs, Redux etc
    //APIs (Application Programming Interface)

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoginText("loading...")
        const isFormFilled = await loginIsFilled(loginProps);
        // console.log("form is fully inputted>>", isFormFilled);
        const currentTime = new Date();
        const payload = {
            ...loginProps,
            dateLoggedIn: `${currentTime?.toDateString()}-${currentTime.getHours()}:${currentTime.getMinutes()}:${currentTime.getSeconds()}`
        }
        setLoginProps(payload);
        //  console.log("payload>>", payload);
        if (isFormFilled === true) {
            // localStorage.setItem("user", JSON.stringify(payload));
            setRecord(referenceVariableEnums.localStorage, "user", payload);
            //  sessionStorage.setItem("user", JSON.stringify(payload));
            navigate("/dashboard")
            // await navigate("/dashboard",{state: payload});
        }
    }

    return (
        <>
            <div className="min-h-screen flex items-center justify-center bg-blue-700 px-4">
                <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-lg">
                    <h2 className="text-2xl font-bold text-center mb-6">Login to Your Account</h2>
                    <form className="space-y-6">
                        <div>
                            <label for="email" className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                value={email}
                                onChange={(event) => handleChange(event)}
                                required
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div>
                            <label for="password" className="block text-sm font-medium text-gray-700">Password</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                value={password}
                                onChange={(event) => handleChange(event)}
                                required
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div>

                            <form className="max-w-sm mx-auto">
                                <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900">Select an option</label>
                                <select id="countries"
                                    name="plaformType"
                                    value={plaformType}
                                    onChange={(event) => handleChange(event)}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                                    <option selected>Select PlaformType</option>
                                    {
                                        platFormSelect.map((item) => (
                                            <>
                                                <option value={item.value}>{item.description}</option>
                                            </>
                                        ))
                                    }
                                </select>
                            </form>

                        </div>

                        <div className="flex items-center">
                            <input
                                id="remember_me"
                                name="isLoggedIn"
                                type="checkbox"
                                className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                                value={isLoggedIn}
                                onChange={(event) => handleChange(event)}
                            />
                            <label for="remember_me" className="ml-2 block text-sm text-gray-700">
                                Keep me logged in
                            </label>
                        </div>

                        <div>
                            <button
                                type="submit" onClick={handleSubmit}
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-xl transition duration-200"
                            >
                                {loginText}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
              <RecentTable loginDetails={loginProps}/>
                {/* Props */}
        </>
    )
}

export default Login;
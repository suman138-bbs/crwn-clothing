

// export const UserContext = createContext({
//     currentUser: null,
//     setCurrentUser: () => null,
// });


// const userReducer = (state,action) => {
//     const { type, payload } = action;

//     switch (type) {
//         case USER_ACTION_TYPES.SET_CURRENT_USER:
//             return {
//                 ...state,
//                 currentUser:payload
//             }
//         default:
//             throw new Error(`unhandled type ${type} in userReducer`)
//     }
// }


// const INITIAL_STATE = {
//     currentUser:null
// }

// export const UserProvider = ({ children}) => {
//     // const [currentUser, setCurrentUser] = useState(null)
//     const [{ currentUser }, dispatch] = useReducer(userReducer, INITIAL_STATE)
    
   
    
//     const value = { currentUser, setCurrentUser };
    
//     // signOutUser();

   

//     return <UserContext.Provider value={value}>{children }</UserContext.Provider>
// }

// // value holds the actual contextual value
# Context API
- The React Context API allows us to create global variables that can be passed across different components without having to pass props manually at every level. 
- It is commonly used to share data such as user information, theme, or global state across the component tree without prop drilling.

## Here's how it works:

1. Create a Context: You set up a context where the data is stored.
2. Provide the Context: You wrap your component tree in a provider and pass the data to it.
3. Consume the Context: Components within the provider can access the shared data.

#### Note: There is two way to that, one is discussed here and other one is in second part `09-theme-switcher`

## Here’s a simple example of how to use the Context API:

### 1. Creating the Context
```
import React from 'react'
const UserContext = React.createContext();
export default UserContext



import React, { useState } from 'react'
import UserContext from './userContext'
export default function UserContextProvider({children}) {
    const [user, setUser] = useState();
    return (
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    )
}

```
### 2. Providing the Context
Wrap the components that need access to the context inside the UserProvider.
```
function App() {

  return (
    <UserContextProvider>
      Hi hello , Welcome to context API
      <Login />
      <Profile />
    </UserContextProvider>
  )
}
```
### 3. Consuming the Context
Now, any child component can access the user state without passing props.
```
import React, { useContext } from 'react'
import UserContext from '../contexts/userContext'

export default function Profile() {
    const { user } = useContext(UserContext);

    if (!user) return <div>Please login first</div>

    return ( 
        <div>Welcome Mr. {user.username}</div>
    )
}
```

## Key Points:
- Global State: The Context API is useful for sharing data like global variables between components.
State Management: For complex state management, combining Context API with useReducer is a common practice.
- Prop Drilling: Context API helps eliminate the need to pass props down multiple levels.

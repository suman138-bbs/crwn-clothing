import { useState } from "react";
import FormInput from "../form-input/form-input.component";
import { createAuthUserWithEmailAndPassword,signInAuthUserWithEmailAndPassword} from "../../utils/firebase/firebase.utils";
import './sign-in-form.styles.scss';
import Button from "../button/button.component";
import { auth, signInWithGooglePopup, signInWithGoogleRedirect, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils';

 



const defaultFormFields = {
 
    email: '',
    password: '',
    
}

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;
    
    const resetFormFields = () => {
        setFormFields(defaultFormFields)
    }

    const signInWithGoogle = async () => {
        const {user} = await signInWithGooglePopup();
        await createUserDocumentFromAuth(user);
        
    }
    //  const logGoogleUser = async () => {
    //     const {user} = await signInWithGooglePopup();
    //     await createUserDocumentFromAuth(user);
        
    // }

    const handleSubmit = async (event) => {
        event.preventDefault();
       
            
        
        try {
            const response = await signInAuthUserWithEmailAndPassword(email, password);
            console.log(response);
            console.log("Hello")
            resetFormFields()
        } catch (error) {
            // 'auth/wrong-password'
            switch(error.code)
            {
                case 'auth/wrong-password':
                    alert("Incorrect Passoword")
                    break
                case 'auth/user-not-found':
                    alert("User Not Found")
                    break
                    
                default:
                    console.log(error)
            }
           
         
        }
     
    }
   

    const handleChange = (event) => {
    const { name, value } = event.target;
       setFormFields({...formFields,[name]:value})
    } 
    
    return (
        <div className="sign-in-container">
            <h2>I already have an account</h2>
            <span>Sign In with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label="Email" type = 'email' required onChange = {handleChange} name = 'email' value = {email}/>
                <FormInput label="PassWord" type = 'password' required onChange = {handleChange} name = 'password' value = {password}/>
                <div className="buttons-container">
                     <Button  type="submit">Sign-In</Button>
                    <Button type = 'button' buttonType='google' onClick={signInWithGoogle} >Google sign in</Button>
                 </div>
            </form>
            
        </div>
    )
}

export default SignInForm;
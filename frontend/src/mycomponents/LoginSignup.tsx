import React, { useState } from 'react';
import {MDBContainer,MDBTabs,MDBTabsItem,MDBTabsLink,MDBTabsContent,MDBTabsPane,MDBBtn,MDBIcon,MDBInput, MDBCheckbox}from 'mdb-react-ui-kit';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { register ,login} from './lib'
function LoginSignup() {

    const [justifyActive, setJustifyActive] = useState('tab1');;
    const [obj, setobj] = useState({
        username: "",
        password: "",
        email:"",
        cpassword:""
      })
      const onchange = (e:React.ChangeEvent<HTMLInputElement>) => {
    
        setobj({ ...obj, [e.target.name]: e.target.value })
      }
      async function  handlelogin(){
        if(obj.email===""){
          toast.warn("email is required !!!")
          return
        }
        
        if(obj.password===""){
          toast.warn("Password is required !!!")
          return
        }
        try {
         const res= await login(obj)
         console.log(res);
        } catch (error) {
          console.log("object");
        }
          
          
          }
      async function  handlesignup(){
        console.log(obj);
        if(obj.username===""){
          toast.warn("Username is required !!!")
          return
        }
        if(obj.password===""){
          toast.warn("Password is required !!!")
          return
        }
        if(obj.email===""){
          toast.warn("E-mail is required !!!")
          return
        }
        if(obj.cpassword!==obj.password){
          console.log(obj);
          toast.warn("Confirm password should match with Password !!!")
          return
        }

        await register(obj)
       }
    const handleJustifyClick = (value:any) => {
        if (value === justifyActive) {
            return;
        }

        setJustifyActive(value);
    };

    return (
        <MDBContainer className="p-3 my-5 d-flex flex-column w-50">

            <MDBTabs pills justify className='mb-3 d-flex flex-row justify-content-between'>
                <MDBTabsItem>
                    <MDBTabsLink onClick={() => handleJustifyClick('tab1')} active={justifyActive === 'tab1'}>
                        Login
                    </MDBTabsLink>
                </MDBTabsItem>
                <MDBTabsItem>
                    <MDBTabsLink onClick={() => handleJustifyClick('tab2')} active={justifyActive === 'tab2'}>
                        Register
                    </MDBTabsLink>
                </MDBTabsItem>
            </MDBTabs>

            <MDBTabsContent>

                <MDBTabsPane show={justifyActive === 'tab1'}>
                <ToastContainer />
                    <div className="text-center mb-3">
                        <p>Sign in with:</p>

                       

                        <p className="text-center mt-3">or:</p>
                    </div>

                    <MDBInput wrapperClass='mb-4' label='Email address' id='email' onChange={onchange} name="email" type='email' />
                    <MDBInput wrapperClass='mb-4' label='Password' id='password' onChange={onchange} name="password" type='password' />

                    

                    <MDBBtn className="mb-4 w-100"  onClick={(e:any) => { e.preventDefault();handlelogin()}}>Sign in</MDBBtn>
                    <p onClick={() => handleJustifyClick('tab2')}  className="text-center">Not a member? </p>

                </MDBTabsPane>

                <MDBTabsPane show={justifyActive === 'tab2'}>
                <ToastContainer />
                    <div className="text-center mb-3">
                        <p>Sign up with:</p>


                        <p className="text-center mt-3">or:</p>
                    </div>

                    
                    <MDBInput wrapperClass='mb-4' label='Username' id='username' name="username" onChange={onchange} type='text' />
                    <MDBInput wrapperClass='mb-4' label='Email' id='email' name="email" onChange={onchange} type='email' />
                    <MDBInput wrapperClass='mb-4' label='Password' id='password' name="password" onChange={onchange} type='password' />
                    <MDBInput wrapperClass='mb-4' label='Confirm Password' id='cpassword' name="cpassword" onChange={onchange} type='text' />
                   

                    <MDBBtn className="mb-4 w-100" onClick={(e:any)=>{e.preventDefault();handlesignup()}}>Sign up</MDBBtn>

                </MDBTabsPane>

            </MDBTabsContent>

        </MDBContainer>
    );
}

export default LoginSignup;
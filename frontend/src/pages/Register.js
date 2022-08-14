import React from 'react'

import { useRef, useState, useEffect } from 'react'
import {  faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import axios from '../api/axios';


const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = '/register';


const Container = styled.div`
max-width: 600px;
padding: 0 1rem;
margin: auto;

`


export default function Register() {

    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false)
    const [userFocus, setUserFocus] = useState(false)

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current?.focus();
    }, [])


    useEffect(() => {
        const result = USER_REGEX.test(user);
        console.log('user result', result);
        console.log('user', user);
        setValidName(USER_REGEX.test(user));
    }, [user])

    useEffect(() => {

        const result = PWD_REGEX.test(pwd);
        console.log('pwd result', result);
        console.log('pwd', pwd);

        setValidPwd(result);
        setValidMatch(pwd === matchPwd);

        // setValidPwd(PWD_REGEX.test(pwd));
        // 
    }, [pwd, matchPwd])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd, matchPwd])
    


    const isValidUserName = () => {
        if (validName) {
            return "form-control is-valid";
        }
        if (!validName && user) {
            return "form-control is-invalid";
        }
        return "form-control";
    }

    const isValidPwd = () => {
        if (validPwd) {
            return "form-control is-valid";
        }
        if (!validPwd && pwd) {
            return "form-control is-invalid";
        }
        return "form-control";
    }

    const isValidMatchPwd = () => {
        if (validMatch && matchPwd) {
            return "form-control is-valid";
        }
        if (!validMatch) {
            return "form-control is-invalid";
        }
        return "form-control";
    }

    const signUpHandler = async (e) =>{
        e.preventDefault();

        // if button enabled with JS hack
        const v1 = USER_REGEX.test(user);
        const v2 = PWD_REGEX.test(pwd);
        if(!v1 || !v2){
            setErrMsg("Invalid Entry");
            return;
        }
       
        try {
            const response = await axios.post(`${REGISTER_URL}`,JSON.stringify({user,pwd}))
            console.log(response?.data)
            console.log(response?.accessToken)
            console.log(JSON.stringify(response));
            setSuccess(true);

            setUser('');
            setPwd('');
            setMatchPwd('');
        } catch (error) {
            if(!error?.response){
                setErrMsg("No server response");
            }else if(error?.response?.status === 409){
                setErrMsg("Username Taken")
            }else{
                setErrMsg("Registration failed")
            }

            errRef.current?.focus();
        }
    }

    if(success){
        return (
            <Container>
                {
                    success && 
                    <section className='shadow-sm bg-white p-4'>
                    <h1>Success</h1>
                    <p className='mb-0'>User is registered on our database</p>
                    <Link to="/signin">Sign In</Link>
                    </section>
                }
            </Container>
        )
    }

    return (
        <Container>


            <section className='shadow-sm bg-white p-4'>
                
                {/* error alert */}
                <div className={errMsg ? "alert alert-danger alert-dismissible fade show" : "d-none"} role="alert" >
                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" />
                    <strong aria-live="assertive" ref={errRef}>{errMsg}</strong>
                </div>
         
           
                
                
          
                

                {/* username input alert */}
                <div className={userFocus && user && !validName ? "alert alert-danger alert-dismissible fade show" : "d-none"} role="alert" >
                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" />
                    <strong aria-live="assertive">
                        <FontAwesomeIcon icon={faInfoCircle} className='me-1' />
                        4 to 24 characters. <br />
                        Must begin with a letter. <br />
                        Letters, numbers, underscores, hypens, allowed.
                    </strong>
                </div>

                {/* password input alert */}
                <div className={pwdFocus && pwd && !validPwd ? "alert alert-danger alert-dismissible fade show" : "d-none"} role="alert" >
                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" />
                    <strong aria-live="assertive">
                        <FontAwesomeIcon icon={faInfoCircle} className='me-1' />
                        8 to 24 characters.<br />
                        Must include uppercase and lowercase letters, a number and a special character.<br />
                        Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span>
                    </strong>
                </div>

                 {/* match password input alert */}
                 <div className={matchFocus && matchPwd && !validMatch ? "alert alert-danger alert-dismissible fade show" : "d-none"} role="alert" >
                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" />
                    <strong aria-live="assertive">
                        <FontAwesomeIcon icon={faInfoCircle} className='me-1' />
                        Must match the first password input field.
                    </strong>
                </div>

                <h1 className='mb-4'>Register</h1>

                <form onSubmit={signUpHandler}>
                    {/* username */}
                    <div className='form-floating mb-3'>
                        <input type="text" className={isValidUserName()}
                            id='username'
                            ref={userRef}
                            onChange={(e) => setUser(e.target.value)}
                            autoComplete='off'
                            required
                          value={user}
                            onFocus={() => setUserFocus(true)}
                            onBlur={() => setUserFocus(false)}
                            placeholder="Username" />
                        <label htmlFor='username'>username </label>
                    </div>

                    {/* password */}
                    <div className='form-floating mb-3'>
                        <input type="text" className={isValidPwd()}
                            id='password'
                            value={pwd}
                            onChange={(e) => setPwd(e.target.value)}
                            autoComplete='off'
                            required
                            onFocus={() => setPwdFocus(true)}
                            onBlur={() => setPwdFocus(false)}
                            placeholder="Password" />
                        <label htmlFor='password'>Password </label>
                    </div>

                     {/* match password */}
                     <div className='form-floating mb-4'>
                        <input type="text" className={isValidMatchPwd()}
                            id='confirm_pwd'
                            value={matchPwd}
                            onChange={(e) => setMatchPwd(e.target.value)}
                            autoComplete='off'
                            required
                            onFocus={() => setMatchFocus(true)}
                            onBlur={() => setMatchFocus(false)}
                            placeholder="Match Password" />
                        <label htmlFor='confirm_pwd'>Match Password </label>
                    </div>

                    <button disabled={!validName || !validPwd || !validMatch ? true : false} className='btn btn-primary form-control'>Sign Up</button>
                </form>
                <div className='mt-3'>
                        <p className='mb-0'>Already registered?</p>
                        <Link to="/signin">Sign In</Link>
                    </div>
            </section>
        </Container>

    )
}

import React, {useState} from "react";
import styled from "styled-components";
import { FcGoogle } from "react-icons/fc";
import {FaEye, FaEyeSlash} from "react-icons/fa";

interface LoginFormProps {
    email: string;
    setEmail: (value: string) => void;
    password: string;
    setPassword: (value: string) => void;
    errors: { email?: string; password?: string };
    handleEmailLogin: () => void;
    handleGoogleLogin: () => void;
    loadingTxt: boolean;
    handleKeyPress: (event: React.KeyboardEvent) => void;
}

const SignIn_Form: React.FC<LoginFormProps> = ({
        email, setEmail, password, setPassword, errors,
        handleEmailLogin, handleGoogleLogin, loadingTxt, handleKeyPress
    }) => {
    const [showPassword, setShowPassword] = useState(false);
    return (
        <StyledWrapper>
            <form className="form" onSubmit={(e) => e.preventDefault()}>
                <div className="title">Sign In</div>

                {/* Email Input */}
                <input
                    type="email"
                    placeholder="Email"
                    className={`input ${errors.email ? "error" : ""}`}
                    value={email}
                    onKeyDown={handleKeyPress}
                    onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && <p className="error-text">{errors.email}</p>}

                {/* Password Input */}
                <div className="password-wrapper">
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        className={`input ${errors.password ? "error" : ""}`}
                        value={password}
                        onKeyDown={handleKeyPress}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <span className="eye-icon" onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <FaEyeSlash/> : <FaEye/>}
                    </span>
                </div>

                {errors.password && <p className="error-text">{errors.password}</p>}

                {/* Google Login */}
                <div className="login-with">
                    <button className="button-log" onClick={handleGoogleLogin}>
                        <FcGoogle className="icon"/>
                    </button>
                </div>

                <div className="link-to-signup">
                    <p className="p-confirm">Don&apos;t have Account? <a className="a-confirm" href="/auth/signup">SignUp</a> here</p>
                </div>

                {/* Login Button */}
                <button className="button-confirm" onClick={handleEmailLogin} disabled={loadingTxt}>
                    {loadingTxt ? "Signing in..." : "Let’s go →"}
                </button>


            </form>
        </StyledWrapper>
    );
};

const StyledWrapper = styled.div`
    .form {
        --input-focus: #2d8cf0;
        --font-color: #323232;
        --font-color-sub: #666;
        --bg-color: #fff;
        --main-color: #323232;
        padding: 80px;
        background: lightgrey;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
        gap: 20px;
        border-radius: 5px;
        border: 2px solid #FDE047;
        box-shadow: 4px 4px #F59E0B;
    }
    .title {
        color: var(--font-color);
        font-weight: 900;
        font-size: 50px;
        margin-bottom: 25px;
    }
    
    .input {
        width: 300px;
        height: 45px;
        border-radius: 5px;
        border: 2px solid #FDE047;
        background-color: var(--bg-color);
        box-shadow: 4px 4px #F59E0B;
        font-size: 15px;
        font-weight: 600;
        color: var(--font-color);
        padding: 5px 10px;
        outline: none;
    }

    .input::placeholder {
        color: var(--font-color-sub);
        opacity: 0.8;
    }

    .input:focus {
        border: 2px solid var(--main-color);
    }
    
    .login-with {
        display: flex;
        gap: 20px;
    }
    
    .password-wrapper {
        position: relative;
        display: flex;
        align-items: center;
    }
    .eye-icon {
        position: absolute;
        right: 10px;
        cursor: pointer;
        font-size: 18px;
        color: var(--font-color);
    }
    
    .button-log {
        cursor: pointer;
        width: 55px;
        height: 55px;
        border-radius: 100%;
        border: 2px solid #FDE047;
        background-color: var(--bg-color);
        box-shadow: 4px 4px #F59E0B;
        color: var(--font-color);
        font-size: 25px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .icon {
        width: 35px;
        height: 35px;
        fill: var(--main-color);
    }

    .button-log:active, .button-confirm:active {
        box-shadow: 0px 0px var(--main-color);
        transform: translate(3px, 3px);
    }

    .button-confirm {
        margin: 10px auto 0 auto;
        width: 150px;
        height: 55px;
        border-radius: 5px;
        border: 2px solid #FDE047;
        background-color: var(--bg-color);
        box-shadow: 4px 4px #F59E0B;
        font-size: 20px;
        font-weight: 700;
        color: var(--font-color);
        cursor: pointer;
    }
    .link-to-signup {
        justify-content: center;
        align-items: center;
        margin: 2px auto 0 auto;
    }
    .p-confirm {
        color: var(--font-color)
    }
    .a-confirm {
        color: #F59E0B;
        text-decoration: underline;

        &:hover {
            color: #FDE047;
        }
    }
`;
export default SignIn_Form;

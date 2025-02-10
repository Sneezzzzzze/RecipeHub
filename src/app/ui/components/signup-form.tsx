import React, {useState} from "react";
import styled from "styled-components";
import { FcGoogle } from "react-icons/fc";
import {FaEye, FaEyeSlash} from "react-icons/fa";

interface SignUpFormProps {
    name: string;
    setName: (value: string) => void;
    email: string;
    setEmail: (value: string) => void;
    password: string;
    setPassword: (value: string) => void;
    confirmPassword: string;
    setConfirmPassword: (value: string) => void;
    errors: { name?: string; email?: string; password?: string; confirmPassword?: string };
    handleSignUp: () => void;
    handleGoogleSignUp: () => void;
    loadingTxt: boolean;
}

const SignUp_Form: React.FC<SignUpFormProps> = (
    {
        name, setName, email, setEmail, password, setPassword, confirmPassword, setConfirmPassword, errors,
        handleSignUp, handleGoogleSignUp, loadingTxt
    }) => {
        const [showPassword, setShowPassword] = useState(false);
        const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    return (
        <StyledWrapper>
            <form className="form" onSubmit={(e) => e.preventDefault()}>
                <div className="title">Sign Up</div>

                {/* Name Input */}
                <input
                    type="text"
                    placeholder="Full Name"
                    className={`input ${errors.name ? "error" : ""}`}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                {errors.name && <p className="error-text">{errors.name}</p>}

                {/* Email Input */}
                <input
                    type="email"
                    placeholder="Email"
                    className={`input ${errors.email ? "error" : ""}`}
                    value={email}
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
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <span className="eye-icon" onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                </div>
                {errors.password && <p className="error-text">{errors.password}</p>}

                {/* Confirm Password Input */}
                <div className="password-wrapper">
                    <input
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm Password"
                        className={`input ${errors.confirmPassword ? "error" : ""}`}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <span className="eye-icon" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                        {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                </div>
                {errors.confirmPassword && <p className="error-text">{errors.confirmPassword}</p>}

                {/* Google Sign Up */}
                <div className="login-with">
                    <button className="button-log" onClick={handleGoogleSignUp}>
                        <FcGoogle className="icon"/>
                    </button>
                </div>

                {/* Sign Up Button */}
                <button className="button-confirm" onClick={handleSignUp} disabled={loadingTxt}>
                    {loadingTxt ? "Creating account..." : "Sign Up →"}
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
    }
    
    .button-confirm {
        margin: 30px auto 0 auto;
        width: 180px;
        height: 55px;
        border-radius: 5px;
        border: 2px solid #FDE047;
        background-color: white;
        box-shadow: 4px 4px #F59E0B;
        font-size: 20px;
        font-weight: 700;
        cursor: pointer;
        color: var(--font-color);
    }
`;

export default SignUp_Form;

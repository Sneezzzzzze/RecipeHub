import React from "react";
import styled from "styled-components";
import { FcGoogle } from "react-icons/fc";

interface LoginFormProps {
    email: string;
    setEmail: (value: string) => void;
    password: string;
    setPassword: (value: string) => void;
    errors: { email?: string; password?: string };
    handleEmailLogin: () => void;
    handleGoogleLogin: () => void;
    loadingTxt: boolean;
}

const Login_Form: React.FC<LoginFormProps> = ({
        email, setEmail, password, setPassword, errors,
        handleEmailLogin, handleGoogleLogin, loadingTxt
    }) => {
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
                    onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && <p className="error-text">{errors.email}</p>}

                {/* Password Input */}
                <input
                    type="password"
                    placeholder="Password"
                    className={`input ${errors.password ? "error" : ""}`}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {errors.password && <p className="error-text">{errors.password}</p>}

                {/* Google Login */}
                <div className="login-with">
                    <button className="button-log" onClick={handleGoogleLogin}>
                        <FcGoogle className="icon" />
                    </button>
                </div>

                <div>

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
        padding: 20px;
        background: lightgrey;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
        gap: 20px;
        border-radius: 5px;
        border: 2px solid var(--main-color);
        box-shadow: 4px 4px var(--main-color);
    }

    .title {
        color: var(--font-color);
        font-weight: 900;
        font-size: 40px;
        margin-bottom: 25px;
    }
    
    .input {
        width: 250px;
        height: 40px;
        border-radius: 5px;
        border: 2px solid var(--main-color);
        background-color: var(--bg-color);
        box-shadow: 4px 4px var(--main-color);
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
        border: 2px solid var(--input-focus);
    }

    .login-with {
        display: flex;
        gap: 20px;
    }

    .button-log {
        cursor: pointer;
        width: 40px;
        height: 40px;
        border-radius: 100%;
        border: 2px solid var(--main-color);
        background-color: var(--bg-color);
        box-shadow: 4px 4px var(--main-color);
        color: var(--font-color);
        font-size: 25px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .icon {
        width: 24px;
        height: 24px;
        fill: var(--main-color);
    }

    .button-log:active, .button-confirm:active {
        box-shadow: 0px 0px var(--main-color);
        transform: translate(3px, 3px);
    }

    .button-confirm {
        margin: 30px auto 0 auto;
        width: 120px;
        height: 40px;
        border-radius: 5px;
        border: 2px solid var(--main-color);
        background-color: var(--bg-color);
        box-shadow: 4px 4px var(--main-color);
        font-size: 17px;
        font-weight: 600;
        color: var(--font-color);
        cursor: pointer;
    }`;
export default Login_Form;

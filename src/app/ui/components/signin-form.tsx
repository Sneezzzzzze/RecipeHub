import React, { useState } from "react";
import styled from "styled-components";
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash } from "react-icons/fa";

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
  email,
  setEmail,
  password,
  setPassword,
  errors,
  handleEmailLogin,
  handleGoogleLogin,
  loadingTxt,
  handleKeyPress,
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
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        {errors.password && <p className="error-text">{errors.password}</p>}

        <div className="link-to-signup">
          <p className="p-confirm">
            Don&apos;t have an account? <a className="a-confirm" href="/auth/signup">Sign Up</a> here
          </p>
        </div>

        {/* Login Button */}
        <button className="button-confirm" onClick={handleEmailLogin} disabled={loadingTxt}>
          {loadingTxt ? "Signing in..." : "Let’s go →"}
        </button>

        {/* Divider */}
        <div className="divider">
          <span>Or continue with</span>
        </div>

        {/* Google Login */}
        <div className="login-with">
          <button className="button-log" onClick={handleGoogleLogin}>
            <FcGoogle className="icon" />
          </button>
        </div>
      </form>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;

  .form {
    --input-focus: #2d8cf0;
    --font-color: #323232;
    --font-color-sub: #666;
    --bg-color: #fff;
    --main-color: #323232;
    padding: 40px;
    background: rgba(255, 255, 255, 0.9);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;
    border-radius: 10px;
    border: 2px solid #fde047;
    box-shadow: 4px 4px #f59e0b;
    max-width: 400px;
    width: 100%;
  }

  .title {
    color: var(--font-color);
    font-weight: 900;
    font-size: 36px;
    margin-bottom: 25px;
  }

  .input {
    width: 100%;
    height: 45px;
    border-radius: 5px;
    border: 2px solid #fde047;
    background-color: var(--bg-color);
    box-shadow: 4px 4px #f59e0b;
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

  .password-wrapper {
    position: relative;
    width: 100%;
  }

  .eye-icon {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
    font-size: 18px;
    color: var(--font-color);
  }

  .button-log {
    cursor: pointer;
    width: 55px;
    height: 55px;
    border-radius: 100%;
    border: 2px solid #fde047;
    background-color: var(--bg-color);
    box-shadow: 4px 4px #f59e0b;
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

  .button-log:active,
  .button-confirm:active {
    box-shadow: 0px 0px var(--main-color);
    transform: translate(3px, 3px);
  }

  .button-confirm {
    margin: 10px auto 0 auto;
    width: 150px;
    height: 55px;
    border-radius: 5px;
    border: 2px solid #fde047;
    background-color: var(--bg-color);
    box-shadow: 4px 4px #f59e0b;
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
    color: var(--font-color);
  }

  .a-confirm {
    color: #f59e0b;
    text-decoration: underline;

    &:hover {
      color: #fde047;
    }
  }

  .divider {
    display: flex;
    align-items: center;
    width: 100%;
    margin: 20px 0;
  }

  .divider::before,
  .divider::after {
    content: "";
    flex: 1;
    height: 1px;
    background: #ccc;
  }

  .divider:not(:empty)::before {
    margin-right: 10px;
  }

  .divider:not(:empty)::after {
    margin-left: 10px;
  }

  .divider span {
    color: #666;
    font-size: 14px;
  }

  .error-text {
    color: red;
    font-size: 14px;
    margin-top: -10px;
  }
`;

export default SignIn_Form;
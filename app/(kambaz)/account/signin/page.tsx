import Link from "next/link";

export default function Signin() {
    return (
        <div>
            <h2>Sign In Page</h2>
            <div>
                <label htmlFor="wd-username">Username</label>
                <input
                    id="wd-username"
                    value="alice"
                    type="text"
                    title="Please type or enter your username" 
                    placeholder="e.g., johndoe"/>
            </div>
            <div>
                <label htmlFor="wd-password">Password</label>
                <input
                    id="wd-password"
                    type="password"
                    title="Please enter your password"
                    placeholder="your password" />
            </div>
            <Link href="/kambaz/account/profile" id="wd-signin-link">
                Sign in
            </Link>
            <br />
            <Link href="/kambaz/account/signup" id="wd-signup-link">
                Sign up
            </Link>
        </div>
    );
}
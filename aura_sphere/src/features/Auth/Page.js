import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

// PUBLIC_INTERFACE
/**
 * AuthPage: Modern, dark minimalist sign in/up page for AuraGram.
 * No code/templates reused. All custom, original, clean and responsive. Integrates with AuthContext.
 */
function AuthPage() {
  const [mode, setMode] = useState("login"); // 'login' or 'signup'
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const { login, signup, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    // If already authenticated, route to /feed immediately
    if (isAuthenticated) navigate("/feed", { replace: true });
    // eslint-disable-next-line
  }, [isAuthenticated]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErr("");
    if (!email || !password) {
      setErr("Please enter both email and password.");
      setLoading(false);
      return;
    }
    let res;
    if (mode === "login") {
      res = await login(email.trim(), password);
    } else {
      res = await signup(email.trim(), password);
    }
    setLoading(false);
    if (res && res.ok) {
      navigate("/feed", { replace: true });
    } else {
      setErr(
        (res && res.error) || "Unknown error, please try again."
      );
    }
  };

  // Key handlers for better UX
  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSubmit(e);
  };

  return (
    <div className="aura-auth-bg" style={{
      minHeight: "100vh",
      background: "linear-gradient(120deg, #1a1424 70%, #232235 100%)",
      display: "flex", alignItems: "center", justifyContent: "center",
      fontFamily: "'Times New Roman', Times, serif",
      position: "relative",
    }}>
      {/* Centered Auth Card */}
      <div className="aura-auth-card" style={{
        minWidth: 340, maxWidth: 400,
        margin: "0 auto",
        background: "rgba(19,19,31, 0.96)",
        borderRadius: 16,
        boxShadow: "0 7px 38px #452f7435, 0 1.5px 8px #f2e8ff27",
        padding: "38px 28px 32px 28px",
        display: "flex", flexDirection: "column", alignItems: "center",
        position: "relative"
      }}>
        {/* Brand */}
        <div className="aura-auth-logo"
          style={{
            fontWeight: 900,
            fontSize: "2.1rem",
            letterSpacing: "3px",
            marginBottom: 6,
            color: "#e087fb",
            textShadow: "0 1.5px 20px #2199ff38"
          }}>
          AURAGRAM
        </div>
        <div className="aura-auth-sub"
          style={{
            fontSize: "1.08rem",
            color: "#fff",
            fontWeight: 450,
            marginBottom: 24,
            letterSpacing: "0.01em",
            textAlign: "center",
            opacity: 0.83
          }}>
          Welcome to your digital aura space.<br />
          <span style={{ fontSize: "1.035rem" }}>
            Sign {mode === "login" ? "in" : "up"} to join the flow.
          </span>
        </div>
        {/* Toggle bar: login / signup */}
        <div className="aura-auth-togglebar" style={{
          borderRadius: 9,
          marginBottom: 22,
          background: "rgba(60,28,77, .21)",
          display: "flex", flexDirection: "row",
          overflow: "hidden",
          border: "1.5px solid #36284e44"
        }}>
          <button
            onClick={() => { setMode("login"); setErr(""); }}
            style={{
              flex: 1,
              padding: "8px 0",
              fontWeight: 800,
              letterSpacing: ".04em",
              fontSize: "1.07rem",
              color: mode === "login" ? "#fff" : "#d1b2fc",
              background: mode === "login" ? "linear-gradient(98deg, #5528b8 0%, #df83fe 80%)" : "transparent",
              border: "none",
              outline: "none",
              cursor: "pointer"
            }}
            aria-pressed={mode === "login"}
            tabIndex={0}
          >Sign In</button>
          <button
            onClick={() => { setMode("signup"); setErr(""); }}
            style={{
              flex: 1,
              padding: "8px 0",
              fontWeight: 800,
              letterSpacing: ".04em",
              fontSize: "1.07rem",
              color: mode === "signup" ? "#fff" : "#d1b2fc",
              background: mode === "signup" ? "linear-gradient(94deg, #e087fb 10%, #5b46a5 100%)" : "transparent",
              border: "none",
              outline: "none",
              cursor: "pointer"
            }}
            aria-pressed={mode === "signup"}
            tabIndex={0}
          >Sign Up</button>
        </div>
        {/* Error/message */}
        {err && (
          <div style={{
            marginBottom: 10,
            color: "#ffc8c8",
            background: "#95234c9d",
            borderRadius: 6,
            padding: "8px 10px",
            fontSize: "1.01rem",
            fontWeight: 600,
            boxShadow: "0 1.5px 12px #fa21bb14"
          }}>
            {err}
          </div>
        )}
        {/* Auth form */}
        <form
          className="aura-auth-form"
          autoComplete="on"
          spellCheck={false}
          style={{
            width: "100%", display: "flex", flexDirection: "column", gap: 16,
            marginBottom: 8
          }}
          onSubmit={handleSubmit}
          onKeyDown={handleKeyDown}
        >
          <div>
            <input
              className="aura-auth-input"
              autoFocus
              type="email"
              placeholder="Email Address"
              autoComplete="username"
              value={email}
              onChange={e => setEmail(e.target.value)}
              style={{
                width: "100%",
                padding: "13px 14px",
                borderRadius: 8,
                fontSize: "1.12rem",
                marginBottom: 7,
                background: "#2e263d",
                color: "#fff",
                border: "1.5px solid #0f023f44",
                transition: "border 0.15s,box-shadow 0.18s",
                outline: "none",
                fontWeight: 500
              }}
              required
              disabled={loading}
            />
          </div>
          <div>
            <input
              className="aura-auth-input"
              type="password"
              placeholder="Password"
              autoComplete={mode === "login" ? "current-password" : "new-password"}
              value={password}
              onChange={e => setPassword(e.target.value)}
              style={{
                width: "100%",
                padding: "13px 14px",
                borderRadius: 8,
                fontSize: "1.17rem",
                background: "#29213c",
                color: "#fff",
                border: "1.5px solid #0f023f44",
                fontWeight: 500
              }}
              minLength={4}
              required
              disabled={loading}
            />
          </div>
          <button
            className="aura-auth-submit"
            type="submit"
            style={{
              background: loading
                ? "linear-gradient(90deg,#a477c7 65%,#6e5e94 100%)"
                : "linear-gradient(90deg,#ae3bc1 6%, #4735e7 95%)",
              color: "#fff",
              fontWeight: 700,
              letterSpacing: ".03em",
              fontSize: "1.27rem",
              padding: "12px 0",
              borderRadius: 7,
              border: "none",
              boxShadow: "0 1.7px 18px #5718bb11",
              marginTop: 10,
              opacity: loading ? 0.7 : 1,
              pointerEvents: loading ? "none" : undefined,
              cursor: loading ? "progress" : "pointer",
              transition: "all 0.18s",
            }}
            disabled={loading}
          >
            {loading
              ? (mode === "login" ? "Signing In..." : "Signing Up...")
              : (mode === "login" ? "Sign In" : "Create Account")}
          </button>
        </form>
        {/* Hint links */}
        <div className="aura-auth-hint text-white" style={{
          fontSize: "1rem",
          opacity: 0.75,
          marginTop: 12,
          marginBottom: -5,
          textAlign: "center"
        }}>
          {mode === "login" ? (
            <span>
              Don&#39;t have an account?{" "}
              <button
                onClick={() => { setMode("signup"); setErr(""); }}
                aria-label="Switch to Sign Up"
                style={{
                  textDecoration: "underline",
                  color: "#e087fb",
                  cursor: "pointer",
                  background: "none",
                  border: "none",
                  fontWeight: 700,
                  fontSize: "1rem"
                }}
                // Remove all onHover etc. completely, no hover effect
              >Sign up</button>
            </span>
          ) : (
            <span>
              Already joined?{" "}
              <button
                onClick={() => { setMode("login"); setErr(""); }}
                aria-label="Switch to Sign In"
                style={{
                  textDecoration: "underline",
                  color: "#d5b3fc",
                  cursor: "pointer",
                  background: "none",
                  border: "none",
                  fontWeight: 700,
                  fontSize: "1rem"
                }}
              >Sign in</button>
            </span>
          )}
        </div>
      </div>
      {/* Subtle animated background blobs */}
      <div
        aria-hidden
        style={{
          position: "fixed", inset: 0, zIndex: 0,
          pointerEvents: "none", overflow: "hidden",
          filter: "blur(62px)", opacity: 0.29
        }}>
        <div style={{
          position: "absolute", top: "-8%", left: "34%",
          width: "44vw", height: "39vw",
          borderRadius: "50%",
          background: "radial-gradient(ellipse at 60% 40%, #f7e7ff 0%, #a371d9 97%)",
          animation: "auraBlobPulse 13s infinite alternate cubic-bezier(.45,0,.55,1)"
        }} />
        <div style={{
          position: "absolute", bottom: "-13%", right: "19%",
          width: "31vw", height: "25vw",
          borderRadius: "52%",
          background: "linear-gradient(120deg, #e087fb 1%, #45277e 99%)",
          opacity: 0.54,
          animation: "auraBlobPulse2 19s infinite alternate cubic-bezier(.41,0,.59,1)"
        }} />
      </div>
      <style>{`
        @keyframes auraBlobPulse {
          0% {transform: scale(1) translateY(0);}
          53% {transform: scale(1.11) translateY(16px);}
          100% {transform: scale(1) translateY(0);}
        }
        @keyframes auraBlobPulse2 {
          0% {transform: scale(1) translateY(0);}
          54% {transform: scale(0.93) translateY(26px);}
          100% {transform: scale(1) translateY(0);}
        }
        .aura-auth-input:focus {
          border: 1.5px solid #e087fb !important;
          box-shadow: 0 2.7px 10px #e087fb32;
          background: #36264a;
          transition: border 0.18s, box-shadow 0.21s;
        }
        .aura-auth-input::-webkit-input-placeholder { color: #d6bcf7c9; }
        .aura-auth-input:-moz-placeholder { color: #d6bcf7c9; }
        .aura-auth-input::-moz-placeholder { color: #d6bcf7c9; }
        .aura-auth-input:-ms-input-placeholder { color: #d6bcf7c9; }
        .aura-auth-input::placeholder { color: #d6bcf7c9; }
        /* Remove hover/focus/active for auth toggles: togglebar buttons */
        .aura-auth-togglebar button,
        .aura-auth-togglebar button:focus,
        .aura-auth-togglebar button:active,
        .aura-auth-togglebar button:hover {
          background: inherit !important;
          filter: none !important;
          outline: none !important;
          box-shadow: none !important;
          transition: none !important;
        }
        /* Override for the selected toggle to preserve visible state */
        .aura-auth-togglebar button[aria-pressed="true"] {
          filter: none !important;
          outline: none !important;
        }
        /* Remove hover effect for hint link buttons (Sign up, Sign in) */
        .aura-auth-hint button,
        .aura-auth-hint button:hover,
        .aura-auth-hint button:focus,
        .aura-auth-hint button:active {
          text-decoration: underline;
          background: none !important;
          color: inherit;
          filter: none !important;
          outline: none !important;
          box-shadow: none !important;
          transition: none !important;
        }
        @media (max-width: 600px) {
          .aura-auth-card { min-width: 96vw !important; max-width: 96vw !important; padding: 27px 7vw 22px 7vw;}
        }
      `}</style>
    </div>
  );
}

export default AuthPage;

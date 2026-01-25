"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, Lock } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    router.push("/darta-chalani/dashboard");
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center vh-100"
      style={{ backgroundColor: "#f8f9fa" }}
    >
      <div
        className="card p-5 shadow-sm border-0"
        style={{
          width: 360,
          borderRadius: "1rem",
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
        }}
      >
        <h3 className="text-center mb-4 fw-bold text-dark">Login</h3>
        <form onSubmit={handleLogin}>
          {/* Email Input */}
          <div className="mb-4 position-relative">
            <label className="form-label fw-semibold">Email</label>
            <div className="input-group">
              <span className="input-group-text bg-white border-end-0">
                <Mail size={18} />
              </span>
              <input
                type="email"
                className="form-control border-start-0"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{
                  transition: "all 0.3s ease",
                }}
                onFocus={(e) => (e.target.style.boxShadow = "0 0 8px #2575fc")}
                onBlur={(e) => (e.target.style.boxShadow = "none")}
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="mb-4 position-relative">
            <label className="form-label fw-semibold">Password</label>
            <div className="input-group">
              <span className="input-group-text bg-white border-end-0">
                <Lock size={18} />
              </span>
              <input
                type="password"
                className="form-control border-start-0"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{
                  transition: "all 0.3s ease",
                }}
                onFocus={(e) => (e.target.style.boxShadow = "0 0 8px #2575fc")}
                onBlur={(e) => (e.target.style.boxShadow = "none")}
              />
            </div>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="btn btn-primary w-100 fw-bold"
            style={{
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) =>
              (e.target.style.transform = "scale(1.05)")
            }
            onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
          >
            Login
          </button>
        </form>

        {/* Footer Links */}
        <p className="text-center mt-3 text-muted">
          Forgot your password?{" "}
          <a href="#" className="text-primary fw-semibold">
            Reset
          </a>
        </p>
      </div>
    </div>
  );
}

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link, useNavigate } from "react-router-dom"
import API from "@/lib/axios"

type Props = {
  type: "login" | "signup"
}

export default function AuthForm({ type }: Props) {
  const isLogin = type === "login"
  const navigate = useNavigate()

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const payload = isLogin
        ? { email, password }
        : { name, email, password }

      const endpoint = isLogin ? "/auth/login" : "/auth/signup"

      const res = await API.post(endpoint, payload)

      console.log("Response:", res.data)

      navigate("/dashboard") 
    } catch (err: any) {
      console.error(err)
      setError(err.response?.data?.message || "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-sm mx-auto mt-24 space-y-6">
      <h1 className="text-2xl font-semibold text-center">
        {isLogin ? "Welcome back" : "Create an account"}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {!isLogin && (
          <div>
            <Label htmlFor="name" className="pb-2">Full Name</Label>
            <Input
              id="name"
              type="text"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
        )}

        <div>
          <Label htmlFor="email" className="pb-2">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <Label htmlFor="password" className="pb-2">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {error && <p className="text-sm text-red-500">{error}</p>}

        <Button
          className="w-full"
          type="submit"
          style={{ backgroundColor: "#0a5210" }}
          disabled={loading}
        >
          {loading ? "Please wait..." : isLogin ? "Login" : "Sign Up"}
        </Button>
      </form>

      <div className="text-sm text-center text-muted-foreground">
        {isLogin ? (
          <>
            Don't have an account? <Link className="underline" to="/signup">Sign up</Link>
          </>
        ) : (
          <>
            Already have an account? <Link className="underline" to="/login">Login</Link>
          </>
        )}
      </div>
    </div>
  )
}

import { redirect } from "next/navigation"

export default function page() {
  redirect('/blogs')
  return (
    <div>Redirecting...</div>
  )
}
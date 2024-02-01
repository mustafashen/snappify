import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export default function page() {
  const accessToken = cookies().get('accessToken')?.value
  
  if (accessToken) {
    redirect(`/dashboard/${accessToken}`)
  } else {
    redirect(`/access`)
  }

  return (
    <div>Redirecting...</div>
  )
}
